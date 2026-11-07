import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/users";
export const POST = async (request) => {
  await connectDB();
  try {
  const { name, email, phone, address, bloodGroup, isDoner, password, isDoctor, degree, specialization } = await request.json();

console.log(name, email, phone, address, bloodGroup, isDoner, password);
  const hashedPassword = await bcrypt.hash(password, 5);
console.log(hashedPassword);
  const newUser = new User({
    name,
    email,
    phone,
    address,
    bloodGroup,
    isDoner,
    password: hashedPassword,
    isDoctor,
    degree,
    specialization
  });
   
    console.log(newUser);
    await newUser.save();
    return new NextResponse(JSON.stringify({
      success: true,
      message: "User successfully registered",
      user: newUser
    }), {
      status: 201,
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


export const GET = async () => {
    try {
        await connectDB(); // Assuming connectDB establishes the database connection
        // Fetch all users from the database
        const users = await User.find({isDoctor:true});

        // Log fetched users
        console.log("Fetched users:", users);

        // Return response with users
        return new NextResponse(JSON.stringify({
            success: true,
            message: "Users fetched successfully",
            users
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching users:', error);
        // Rethrow the error to be handled by the caller
        throw error;
    }
};

