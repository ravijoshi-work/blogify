import mongoose from "mongoose";
import { NextResponse } from "next/server";

const errorHandler = (error: unknown) => {
  if (error instanceof mongoose.Error.ValidationError) {
    // Handle validation errors
    const messages = Object.values(error.errors).map((err) => err.message);
    return NextResponse.json(
      { status: false, error: messages.join(", ") },
      { status: 400 }
    );
  } else if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: number }).code === 11000
  ) {
    const field = Object.keys(
      (error as unknown as { keyPattern: Record<string, unknown> })
        .keyPattern || {}
    )[0];
    // Handle duplicate key error
    let message = "Duplicate key error";
    switch (field) {
      case "email":
        message = "Email already exists";
        break;
      case "phone":
        message = "Phone number already exists";
        break;
      default:
        message = "Resource already exists";
    }

    return NextResponse.json(
      { status: false, error: message },
      { status: 400 }
    );
  } else if (error instanceof mongoose.Error.CastError) {
    NextResponse.json(
      { status: false, error: "Invalid ObjectId" },
      { status: 400 }
    );
  } else if (error instanceof TypeError) {
    return NextResponse.json(
      { status: false, error: error.message, data: null },
      { status: 400 }
    );
  }

  const errorMessage = (error as Error).message ?? "Internal Server Error";
  const errorCode = 500;
  return NextResponse.json(
    { status: false, error: errorMessage },
    { status: errorCode }
  );
};

export default errorHandler;
