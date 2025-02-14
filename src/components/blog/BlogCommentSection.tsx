"use client";
import CommentForm from "../forms/Comment";
import CommentCard from "./CommentCard";
import { useBlog } from "@/context/blog.context";

type PropsType = {
  userId: string;
};

const BlogCommentSection = ({ userId }: PropsType) => {
  const { blog: blogDetails } = useBlog();
  return (
    <div>
      {!userId ? (
        <h3 className="text-red-500">Kindly login to leave a comment.</h3>
      ) : (
        <CommentForm blogId={blogDetails?._id} />
      )}

      {blogDetails?.comments && blogDetails?.comments.length === 0 && (
        <p>No comments</p>
      )}

      {blogDetails?.comments && blogDetails?.comments.length > 0 && (
        <>
          {blogDetails.comments.map((comment) => (
            <CommentCard
              blogId={blogDetails?._id}
              comment={comment}
              key={comment?._id}
              userId={userId}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default BlogCommentSection;
