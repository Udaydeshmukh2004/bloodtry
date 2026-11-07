import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import Bloodbank from '@/models/bloodbanks';

export const POST = async (req, { params }) => {
    try {
        await connectDB();
        // Extract userId from the params
        const { userId } = params;

        // Fetch blood banks based on userId
        const bloodbanks = await Bloodbank.find({ userId });

        return new NextResponse(JSON.stringify({
            bloodbanks,
            success: true,
            message: `Blood banks fetched successfully`
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching blood banks:', error);

        return new NextResponse(JSON.stringify({
            success: false,
            message: `Error fetching blood banks: ${error.message}`
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
