import User from "@/models/User";
import bcrypt from "bcrypt";
import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/utils/error-handler";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { name, email, password } = await req.json();

    // Check if user already exists
    const isExisting = await User.findOne({ email });
    if (isExisting) {
      return NextResponse.json(
        { error: "User already exists with the same email.", status: false },
        { status: 400 } // Bad Request
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { data: newUser, status: true, message: "User created successfully." },
      { status: 201 }
    ); // Created
  } catch (error) {
    return errorHandler(error);
  }
}
