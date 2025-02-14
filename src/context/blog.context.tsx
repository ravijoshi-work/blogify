"use client";
import { IGetBlog } from "@/types/blog";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface BlogContextProps {
  blog: IGetBlog;
  setBlog: (blog: IGetBlog) => void;
  updateBlog: (partialBlog: Partial<IGetBlog>) => void;
}

const BlogContext = createContext<BlogContextProps | undefined>(undefined);

export const BlogProvider: React.FC<{
  children: ReactNode;
  initialBlog: IGetBlog;
}> = ({ children, initialBlog }) => {
  const [blog, setBlogState] = useState<IGetBlog>(initialBlog);

  const setBlog = (newBlog: IGetBlog) => {
    setBlogState(newBlog);
  };
  const updateBlog = (partialBlog: Partial<IGetBlog>) => {
    setBlogState((prevBlog) => ({ ...prevBlog, ...partialBlog }));
  };

  return (
    <BlogContext.Provider value={{ blog, setBlog, updateBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextProps => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
