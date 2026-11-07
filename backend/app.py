from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import os
import tempfile
from PyPDF2 import PdfReader
from dotenv import load_dotenv

# Load .env from project root if present
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(project_root, ".env"))

try:
    from langchain.text_splitter import RecursiveCharacterTextSplitter
except ImportError:
    from langchain_text_splitters import RecursiveCharacterTextSplitter

from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI

try:
    from langchain.prompts import PromptTemplate
except ImportError:
    from langchain_core.prompts import PromptTemplate

try:
    from langchain.vectorstores import FAISS
except ImportError:
    from langchain_community.vectorstores import FAISS

try:
    from langchain.chains.question_answering import load_qa_chain
except ImportError:
    from langchain_classic.chains.question_answering import load_qa_chain

app = Flask(__name__)
CORS(app)

if not os.environ.get("GOOGLE_API_KEY"):
    os.environ["GOOGLE_API_KEY"] = os.environ.get("GEMINI_API_KEY", "")

def get_pdf_text(pdf_path):
    text = ""
    with open(pdf_path, "rb") as f:
        pdf_reader = PdfReader(f)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    return chunks

def get_vector_store(text_chunks):
    faiss_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "faiss_index")
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=os.environ.get("GOOGLE_API_KEY"))
    vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
    vector_store.save_local(faiss_dir)

def get_conversational_chain():
    prompt_template = """
        You are a doctor reviewing a medical report for a patient.
        Provide answers to patient's questions and suggest diet plans based on the report.
        Mention possible diseases if a healthy diet is not followed, based on the report's parameters.

        Context: {context}
        Question: {question}

        Answer:
    """

    model_name = "gemini-1.5-flash"
    try:
        model = ChatGoogleGenerativeAI(model=model_name, temperature=0.3, google_api_key=os.environ.get("GOOGLE_API_KEY"))
    except Exception:
        model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3, google_api_key=os.environ.get("GOOGLE_API_KEY"))
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain

def process_and_respond(pdf_path):
    # Process PDF text
    raw_text = get_pdf_text(pdf_path)
    text_chunks = get_text_chunks(raw_text)
    get_vector_store(text_chunks)

    # Initiate conversation without requiring a question
    context = raw_text  # Provide entire PDF text as context
    question = ""  # No initial question required
    chain = get_conversational_chain()
    response = chain({"input_documents": [], "context": context, "question": question})

    return response["output_text"]


@app.route('/analyzeReports', methods=['POST'])
def upload_file():
    try:
        temp_directory = os.path.join(tempfile.gettempdir(), "bloodcare_uploads")
        if not os.path.exists(temp_directory):
            os.makedirs(temp_directory, exist_ok=True)

        if 'file' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files['file']
        temp_pdf_path = os.path.join(temp_directory, file.filename or "uploaded_file.pdf")
        file.save(temp_pdf_path)

        # Process and respond to the uploaded file
        response = process_and_respond(temp_pdf_path)
        sections = response.split("**Question:**")
        structured_json = {}
        for section in sections[1:]:
            if "**Answer:**" in section:
                question, answer = section.split("**Answer:**", 1)
                structured_json[question.strip()] = answer.strip()
            else:
                structured_json[f"Section {len(structured_json) + 1}"] = section.strip()
        if not structured_json and response:
            structured_json["Report Summary"] = response.strip()
        return jsonify(structured_json), 200, {'Content-Type': 'application/json'}
    except Exception as err:
        err_msg = str(err)
        if "PERMISSION_DENIED" in err_msg or "API_KEY_INVALID" in err_msg or "CONSUMER_SUSPENDED" in err_msg:
            return jsonify({
                "error": "Google Gemini API key is suspended or invalid. Please add a valid GOOGLE_API_KEY in .env file.",
                "details": err_msg
            }), 403
        return jsonify({"error": err_msg}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)