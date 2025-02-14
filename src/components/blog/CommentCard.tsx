"use client";
import { IComment, IGetBlog } from "@/types/blog";
import Image from "next/image";
import React from "react";
import demoImage from "@/public/img/demo_image.jpg";
import { BsTrash } from "react-icons/bs";
import { deleteBlogComment } from "@/actions/blog";
import toast from "react-hot-toast";
import { useBlog } from "@/context/blog.context";

type PropsType = {
  comment: IComment;
  blogId: string;
  userId: string;
};

const CommentCard = ({ comment, blogId, userId }: PropsType) => {
  const { updateBlog } = useBlog();

  const handleDeleteComment = async (commentId: string) => {
    const response = await deleteBlogComment(blogId, commentId);

    if (response?.status) {
      toast.success(response.message || "Comment deleted successfully.");
      updateBlog({ comments: (response?.data as IGetBlog)?.comments });
    } else {
      toast.error(response.error || "Failed to delete comment.");
    }
  };

  return (
    <div key={comment._id} className="flex gap-3 py-5 items-center">
      <Image
        src={
          comment?.user?.avatar?.url ? comment?.user?.avatar?.url : demoImage
        }
        alt="avatar image"
        width={0}
        height={0}
        sizes="100vw"
        className="w-10 h-10 rounded-full"
      />

      <div className="max-w-[80%]">
        <p className="text-whiteColor">{comment?.user?.name}</p>
        <p className="max-w-full break-words">{comment.text}</p>
      </div>
      {userId === comment?.user?._id && (
        <BsTrash
          onClick={() => handleDeleteComment(comment?._id)}
          cursor="pointer"
          className="text-red-500 ml-10"
        />
      )}
    </div>
  );
};

export default CommentCard;
