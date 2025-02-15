// http://localhost:3000/api/blog

import { connect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import errorHandler from "@/utils/error-handler";
import { authMiddleware } from "@/middleware/auth";

export async function POST(req: NextRequest) {
  await connect();
  authMiddleware(req);

  try {
    const body = await req.json();
    const newblog = await Blog.create(body);

    return NextResponse.json(
      { data: newblog, message: "Blog created successfully.", status: true },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}

export async function GET() {
  await connect();

  try {
    const blogs = await Blog.find({})
      .populate({
        path: "authorId",
        select: "-password",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { data: blogs, message: "Blogs found.", status: true },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
}
