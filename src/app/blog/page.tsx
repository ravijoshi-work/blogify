"use server";
import React from "react";
import FirstBlog from "@/components/FirstBlog";
import OtherBlogs from "@/components/OtherBlogs";
import { getBlogs } from "@/actions/blog";
import { IGetBlog } from "@/types/blog";

const Page = async () => {
  const response = await getBlogs();

  let blogs = [] as IGetBlog[];

  if (response && response.status) {
    blogs = response.data as IGetBlog[];
  }

  const firstBlog = blogs && blogs[0];
  let otherBlogs = [] as IGetBlog[];

  if (blogs?.length > 0) {
    otherBlogs = blogs.slice(1);
  }

  return (
    <div>
      {blogs?.length > 0 ? (
        <>
          <div className="container">
            <h2 className="text-center my-10">
              <span className="text-primaryColor">Trending</span> Blog
            </h2>
            <FirstBlog firstBlog={firstBlog} />
            <h2 className="text-center my-10">
              <span className="text-primaryColor">Other</span> Blogs
            </h2>
            <OtherBlogs otherBlogs={otherBlogs} />
          </div>
        </>
      ) : (
        <h3>No Blogs...</h3>
      )}
    </div>
  );
};

export default Page;
