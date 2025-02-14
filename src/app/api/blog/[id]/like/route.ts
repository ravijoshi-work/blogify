// http://localhost:3000/api/blog/blogid/like

import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import errorHandler from "@/utils/error-handler";

export async function PUT(
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
        { error: "Blog not found.", status: false },
        { status: 404 }
      );
    }

    let message;

    if (blog.likes.includes(tokenUser._id)) {
      blog.likes = blog.likes.filter(
        (id: string) => id.toString() !== tokenUser._id.toString()
      );
      message = "Removed like successfully.";
    } else {
      blog.likes.push(tokenUser._id);
      message = "Like added successfully.";
    }

    await blog.save();

    return NextResponse.json(
      { data: blog, message, status: true },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
