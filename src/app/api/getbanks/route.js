import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import Bloodbank from '@/models/bloodbanks';

export const POST = async (req) => {
    await connectDB(); // Assuming connectDB establishes the database connection
    try {
        const { bloodType, quantity } = await req.json();
        console.log(quantity);
        const availableBloodbanks = await Bloodbank.find({ [bloodType]: { $gte: quantity } });

        if (availableBloodbanks.length > 0) {
            return new NextResponse(JSON.stringify({
                success: true,
                message: `${quantity} units of ${bloodType} blood are available.`,
                availableBloodbanks
            }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        } else {
            return new NextResponse(JSON.stringify({
                success: false,
                message: `${quantity} units of ${bloodType} blood are not available.`
            }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({
            success: false,
            message: 'An error occurred while checking blood availability.',
            error: error.message
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

export const GET = async () => {
    await connectDB(); // Assuming connectDB establishes the database connection
    console.log("hello adityA");

    const all_bloodbank = await Bloodbank.find();
    return new NextResponse(JSON.stringify({
        success: true,
        message: 'Suiiii',
        all_bloodbank
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
