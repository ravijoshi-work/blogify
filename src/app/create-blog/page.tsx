"use server";
import BlogForm from "@/components/forms/Blog";
import React from "react";

const page = () => {
  return (
    <section className="container max-w-3xl">
      <h2 className="mb-5">
        <span className="special-word">Add</span> Blog
      </h2>
      <BlogForm />
    </section>
  );
};

export default page;
