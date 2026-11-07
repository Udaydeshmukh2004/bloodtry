import { NextResponse } from "next/server";

export const POST = async (req) => {
  // Extract the cookies object from the req parameter
  const response = new NextResponse(JSON.stringify({
    success: true,
    message: `logged out susscesfully`,
}), { status: 200, headers: { 'Content-Type': 'application/json' } })

  // Clear the authToken cookie by setting its value to an empty string and setting an expiry date in the past
  response.cookies.set("authToken", "", {
    expires: new Date(0), // Set expiry date to the past
  });

  // Return a NextResponse with a success message
  return response;
};
