// http://localhost:3000/api/blog/blogid/comment/commentId

import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import { IComment } from "@/types/blog";
import errorHandler from "@/utils/error-handler";
import { authMiddleware } from "@/middleware/auth";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string; commentId: string };
  }
) {
  await connect();
  authMiddleware(req);

  const { id, commentId } = params;

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

    const comment = blog.comments.find(
      (comment: IComment) => comment._id.toString() === commentId
    );

    if (!comment) {
      return NextResponse.json(
        { error: "Comment does not exist", status: false },
        { status: 404 }
      );
    }

    if (comment?.user?._id.toString() !== tokenUser?._id.toString()) {
      return NextResponse.json(
        { error: "Only author can delete his/her comment", status: false },
        { status: 403 }
      );
    }

    blog.comments = blog.comments.filter(
      (comment: IComment) => comment?._id != commentId
    );

    await blog.save();

    return NextResponse.json(
      { data: blog, message: "Successfully deleted comment", status: true },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
