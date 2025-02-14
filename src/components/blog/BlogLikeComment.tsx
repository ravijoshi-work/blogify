"use client";
import { likeUnlikeBlog } from "@/actions/blog";
import { useBlog } from "@/context/blog.context";
import { IGetBlog } from "@/types/blog";
import React, { useMemo } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";

type PropsType = {
  userId: string;
};

const BlogLikeComment = ({ userId }: PropsType) => {
  const { blog: blogDetails, updateBlog } = useBlog();

  const isLiked = useMemo(
    () => blogDetails?.likes?.includes(userId),
    [blogDetails]
  );

  const blogLikes = useMemo(() => blogDetails?.likes?.length, [blogDetails]);
  const blogComments = useMemo(
    () => blogDetails?.comments?.length,
    [blogDetails]
  );

  const handleLike = async () => {
    if (!userId) {
      toast.error("Please login before liking.");
      return;
    }

    const response = await likeUnlikeBlog(blogDetails?._id);

    if (response.status) {
      toast.success(response?.message || "Successful");
      updateBlog({ likes: (response?.data as IGetBlog)?.likes });
    } else {
      toast.error(response?.error || "Failed");
    }
  };

  return (
    <div className="py-12">
      <div className="flex gap-10 items-center text-xl justify-center">
        <div className="flex items-center gap-1">
          <p>{blogLikes}</p>

          {isLiked ? (
            <AiFillHeart
              onClick={handleLike}
              size={20}
              color="#ed5784"
              cursor="pointer"
            />
          ) : (
            <AiOutlineHeart onClick={handleLike} size={20} cursor="pointer" />
          )}
        </div>

        <div className="flex items-center gap-1">
          <p>{blogComments}</p>

          <AiOutlineComment size={20} />
        </div>
      </div>
    </div>
  );
};

export default BlogLikeComment;
