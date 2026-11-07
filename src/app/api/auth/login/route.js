import { NextResponse } from "next/server";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/helper/db";


export const POST = async (req) => {
    await connectDB();
    const { email, password } = await req.json();

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse(JSON.stringify({
                success: false,
                message: "user not found",
            }), { status: 401, headers: { 'Content-Type': 'application/json' } })
        }

        const comparePass = bcrypt.compareSync(password, user.password);
        if (!comparePass) {
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Password is wrong",
            }), { status: 400, headers: { 'Content-Type': 'application/json' } })
        }

        const token = jwt.sign({
            _id: user._id,
            name: user.name
        }, process.env.JWT_KEY);

        console.log(token);

        // const response = new NextResponse({
        //     success: true,
        //     message: "User logged in successfully", // Corrected message
        //     user,
        // });

        const response = new NextResponse(JSON.stringify({
            success: true,
            message: `logged in successfully `,
            user
        }), { status: 200, headers: { 'Content-Type': 'application/json' } })

        // Set authToken cookie
        response.cookies.set("authToken", token, {
            expires: new Date(Date.now() + 86400 * 1000), // 1 day expiry
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        });

        return response;

    } catch (error) {
        return new NextResponse(JSON.stringify({
            success: false,
            message: error.message,
        }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
};
