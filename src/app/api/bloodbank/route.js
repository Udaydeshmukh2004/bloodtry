import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import Bloodbank from '@/models/bloodbanks';

export const POST = async (req) => {
    try {
        await connectDB();
        // Extract data from the request body
        const { name, email, phone, address, apos, abpos, bpos, opos, aneg, abneg, bneg, oneg, userId } = await req.json();
        console.log("GIRR");
        console.log(name, email, phone, address, apos, abpos, bpos, opos, aneg, abneg, bneg, oneg, userId);
        // Create a new blood bank document
        const newBloodbank = new Bloodbank({
            name,
            email,
            address,
            phone,
            apos,
            bpos,
            abpos,
            opos,
            aneg,
            bneg,
            abneg,
            oneg,
            userId
        });

        // Save the new blood bank document
        await newBloodbank.save();

        return new NextResponse(JSON.stringify({
            success: true,
            message: "Blood bank created successfully",

            bloodbank: newBloodbank
        }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error creating blood bank:', error);

        return new NextResponse(JSON.stringify({
            success: false,
            message: `Error creating blood bank: ${error.message}`
        }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}

