"use client";
import { deleteBlog } from "@/actions/blog";
import { deletePhoto } from "@/actions/cloudinary";
import { IGetBlog } from "@/types/blog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { BsFillPencilFill, BsTrash } from "react-icons/bs";

type PropsType = {
  blogDetails: IGetBlog;
};

const BlogEditDelete = ({ blogDetails }: PropsType) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const router = useRouter();

  const handleBlogDelete = async (imageId: string) => {
    const confirmModal = window.confirm(  
      "Are you sure you want to delete your blog?"
    );

    if (confirmModal) {
      setIsDeleting(true);
      const response = await deleteBlog(blogDetails?._id);

      if (response?.status) {
        setIsDeleting(false);
        toast.success(response.message || "Successful");
        await deletePhoto(imageId);
        router.refresh();
        router.push("/blog");
      } else {
        setIsDeleting(false);
        toast.error(response.error || "Failed!");
      }
    }
  };

  return (
    <div className="flex items-center justify-end gap-5">
      <Link
        href={`/blog/edit/${blogDetails?._id}`}
        className="flex items-center gap-1 text-primaryColor"
      >
        <BsFillPencilFill />
        Edit
      </Link>

      <button
        onClick={() => handleBlogDelete(blogDetails?.image?.id ?? "")}
        className="flex items-center gap-1 text-red-500"
      >
        <BsTrash />
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default BlogEditDelete;
