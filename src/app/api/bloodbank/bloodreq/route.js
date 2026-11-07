// Assuming the path to connectDB is correct based on your project structure
import { connectDB } from "@/helper/db"; 
import { NextResponse } from "next/server";
import BloodRequest from '@/models/bloodrequests';

export const POST = async (req) => {
    await connectDB(); // Ensure DB connection

    console.log("in the blood")
    try {
        // Assuming req.body contains the JSON payload
        const { bloodType, quantity, address, urgent, hospitalName, reason, userId, bankId } = await req.json();

        // Create a new BloodRequest document
        const newBloodRequest = new BloodRequest({
            bloodType,
            quantity,
            address,
            urgent,
            hospitalName,
            reason,
            userId,
            bankId
        });

        // Save the new BloodRequest document
        await newBloodRequest.save();

        // Return success response
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Blood request created successfully",
            bloodRequest: newBloodRequest
        }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error creating blood request:', error);
        // Return error response
        return new NextResponse(JSON.stringify({
            success: false,
            message: `Error creating blood request: ${error.message}`
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
