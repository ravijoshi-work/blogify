"use client";
import React from "react";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import { createBlogComment } from "@/actions/blog";
import { useBlog } from "@/context/blog.context";
import { IGetBlog } from "@/types/blog";

type PropsType = {
  blogId: string;
};

const CommentForm = ({ blogId }: PropsType) => {
  const [commentText, setCommentText] = React.useState("");
  const [isCommenting, setIsCommenting] = React.useState(false);
  const { setBlog } = useBlog();
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!commentText) {
      toast.error("comment text is required.");
      return;
    }

    setIsCommenting(true);

    const newComment = {
      text: commentText,
    };

    const response = await createBlogComment(blogId, newComment);
    if (response?.status) {
      setIsCommenting(false);
      toast.success(response.message || "Comment created successfully.");
      setCommentText("");
      setBlog(response?.data as IGetBlog);
    } else {
      setIsCommenting(false);
      toast.error(response.error || "Failed to create comment.");
    }
  };
  return (
    <form onSubmit={handleCommentSubmit} className="space-y-2">
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCommentText(e.target.value)
        }
        value={commentText}
        name="comment"
        type="text"
        placeholder="Type message..."
        label={""}
      />

      <button type="submit" className="btn">
        {isCommenting ? "Loading..." : "Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
