import { NextResponse } from "next/server";
import twilio from 'twilio';
export const POST = async (request) => {
    try {
    const {name, bankContact, address, quantity, urgent, bloodType } = await request.json();
        console.log(name,"  ", address )

         // Initialize Twilio client with your account SID and auth token
         const accountSid = process.env.ACCOUNTSID;
         const authToken = process.env.AUTHTOKEN;
         const client = twilio(accountSid, authToken);

         await client.messages.create({
            from: '+16592742455', // Your Twilio phone number
            to: `+91${bankContact}`, // Recipient's phone number
            body: `I am from ${address}, I need ${bloodType} blood`, // Customize the message here
        });
      return new NextResponse(JSON.stringify({
        success: true,
        message: "OTP sent successfully"
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      return new NextResponse(JSON.stringify({
        success: false,
        message: err.message
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }; 