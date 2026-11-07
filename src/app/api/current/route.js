import { NextResponse } from 'next/server';
import Jwt from "jsonwebtoken";
import User from '@/models/users';
import { connectDB } from '@/helper/db';

export const GET = async(request) => {
    try {
        await connectDB();
        const authToken = request.cookies.get('authToken')?.value;
        if (!authToken) {
            throw new Error("Auth token not found");
        }
        const userVerify = Jwt.verify(authToken, process.env.JWT_KEY || 'Aniket@54');
        const user = await User.findById(userVerify._id).select("-password");
        return new NextResponse(JSON.stringify({
            success: true,
            message: "GOT USER",
            user
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(JSON.stringify({
            success: false,
            message: "Error verifying token",
            error: error.message // Send the error message in the response
        }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
}
