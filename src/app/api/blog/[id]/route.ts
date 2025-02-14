// http://localhost:3000/api/blog/someid

import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import errorHandler from "@/utils/error-handler";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  try {
    const tokenUser = req["user"];
    const body = await req.json();
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== tokenUser._id.toString()) {
      return NextResponse.json(
        { message: "Only author can update his/her blog", status: false },
        { status: 403 }
      );
    }

    const updateBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return NextResponse.json(
      { data: updateBlog, status: true },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();

  const { id } = params;

  try {
    const blog = await Blog.findById(id)
      .populate({
        path: "authorId",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (!blog) {
      return NextResponse.json(
        { error: "blog not found.", status: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: blog, message: "blog found.", status: true },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  await connect();

  const { id } = params;
  try {
    const tokenUser = req["user"];

    const blog = await Blog.findById(id).populate("authorId");

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found.", status: false },
        { status: 404 }
      );
    }

    if (blog?.authorId?._id.toString() !== tokenUser._id.toString()) {
      return NextResponse.json(
        { error: "Only author can delete his/her blog", status: false },
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Successfully deleted blog", status: true },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
