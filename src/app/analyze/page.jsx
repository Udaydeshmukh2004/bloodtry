"use client";
import React, { useState } from "react";
import IndexNavbar from "@/components/Navbars/IndexNavbar";
import { toast } from "react-toastify";
import Image from 'next/image';

export default function Disease() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [analysisResult, setanalyzedData] = useState(null);
  const [fileName, setfileName] = useState(null);
  const handleFileChange = (e) => {
    if (analysisResult) {
      setanalyzedData(null);
    }
    const selectedFile = e.target.files[0];
    const fileNames = selectedFile.name;
    setfileName(fileNames);
    setFile(selectedFile);
    toast.success("YOUR FILE SUCCCSESSFULLY UPLOADED", {
      position: "top-center",
    });
    // Display the selected image preview (optional)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:5000/analyzeReports", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Analysis Result:", data);
        setanalyzedData(data);
        const targetDiv = document.getElementById("scroll-div");
        if (targetDiv) {
          targetDiv.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to analyze report", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error occurred during analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    if (analysisResult) {
      setanalyzedData(null);
    }
  };
  return (
    <>
      <IndexNavbar fixed />
      <section className="relative py-20">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden "
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4 mt-0">
          <div className="items-center flex flex-wrap bg-white">
            <div className="w-full md:w-5/12 ml-auto mt-0 mr-auto px-2">
            <Image
          alt="..."
          className="max-w-full rounded-lg shadow-lg"
          src="https://cdn.dribbble.com/userupload/11743109/file/original-a3fe110e0b3037c286b80b033b476102.gif"
          width={500}
          height={300}
          layout="responsive"
        />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-blueGray-500">
                  <i className="fas fa-rocket text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold text-blueGray-500">
                  AI-Enhanced Report Analysis
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  The preorts are analyzed in a clear format, highlighting
                  normal findings and flagging abnormal levels. This facilitates
                  prompt decision-making and guides appropriate actions for
                  improved outcomes.
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                          <i className="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          1. Upload Your Report
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                          <i className="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          2. Uncover Hidden Patterns
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                          <i className="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500 mb-3">
                          3. Get clear, actionable recommendations
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto text-center px-4 mt-0">
          {/* Your existing UI code */}
          {/* ... */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex max-w-lg items-center justify-center flex-col mx-auto py-5"
          >
            <div className="flex w-full items-center justify-center bg-gray-200 rounded-lg p-6">
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-700 rounded-lg shadow-lg tracking-wide uppercase border border-blue-700 cursor-pointer hover:bg-blue-700 hover:text-white">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h2V5zm4 5h2v3h4v-3h2l-5-5-5 5z"
                  />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  {file ? (
                    <span>{file.name}</span>
                  ) : (
                    <span>Select a file</span>
                  )}
                </span>
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded"
              disabled={!file || loading}
            >
              {loading ? "Analyzing..." : "Analyze Report"}
            </button>
          </form>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-6 rounded"
            onClick={clear}
          >
            Clear
          </button>
        </div>
        {/* Display analysis result if available */}
        {analysisResult && (
          <div className="container mx-auto px-4 mt-8 scroll-div">
            <h3 className="text-2xl font-semibold mb-4">Analysis Result:</h3>
            <div className="bg-gray-200 p-4 rounded-lg">
              {Object.keys(analysisResult).map((question, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">{question}</h4>
                  <p className="text-base">{analysisResult[question]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
