import { connect } from "@/lib/db";
import User from "@/models/User";
import errorHandler from "@/utils/error-handler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  try {
    const user = await User.findById(params.id).select("-password -__v");

    if (!user) {
      return NextResponse.json(
        { error: "User not found.", status: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: user, message: "User found.", status: true },
      { status: 200 }
    );
  } catch (error: unknown) {
    return errorHandler(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  try {
    const tokenUser = req["user"];
    const body = await req.json();
    const user = await User.findById(id);

    if (user?._id.toString() !== tokenUser?._id.toString()) {
      return NextResponse.json(
        { error: "Only author can update his/her data", status: false },
        { status: 403 }
      );
    }

    const updateUser = await User.findByIdAndUpdate(user?._id, body, {
      new: true,
    }).select("-password -__v");

    return NextResponse.json(
      {
        data: updateUser,
        message: "Profile updated successfully.",
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
