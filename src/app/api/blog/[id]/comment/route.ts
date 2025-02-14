// http://localhost:3000/api/blog/blogid/comment

import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import User from "@/models/User";
import errorHandler from "@/utils/error-handler";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const { id } = params;

  try {
    const tokenUser = req["user"];
    const body = await req.json();
    const blog = await Blog.findById(id)
      .populate({
        path: "authorId",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    const user = await User.findById(tokenUser._id);

    const newComment = {
      text: body.text,
      user,
    };

    blog.comments.unshift(newComment);

    await blog.save();

    return NextResponse.json(
      { data: blog, message: "Comment added successfully.", status: true },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
