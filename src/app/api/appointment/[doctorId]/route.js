import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import AppointmentRequest from "@/models/appointment";

export const POST = async (req, { params }) => {
    try {
        await connectDB();
        // Extract userId from the params
        const { doctorId } = params;

        // Fetch blood banks based on userId
        const appointments = await AppointmentRequest.find({ doctorId });

        return new NextResponse(JSON.stringify({
            appointments,
            success: true,
            message: ` fetched successfully`
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching blood banks:', error);

        return new NextResponse(JSON.stringify({
            success: false,
            message: `Error fetching appointments: ${error.message}`
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
