"use server";

import { callApiDelete, callApiGet, callApiPost, callApiPut } from "./call";

export async function getBlogById(id: string) {
  return await callApiGet(`/blog/${id}`);
}

export async function getBlogs() {
  return await callApiGet(`/blog`);
}

export async function createBlog(payload: unknown) {
  return await callApiPost(`/blog`, payload);
}

export async function updateBlog(id: string, payload: unknown) {
  return await callApiPut(`/blog/${id}`, payload);
}

export async function deleteBlog(id: string) {
  return await callApiDelete(`/blog/${id}`);
}

export async function createBlogComment(blogId: string, payload: unknown) {
  return await callApiPost(`/blog/${blogId}/comment`, payload);
}


export async function deleteBlogComment(blogId: string, commentId: string) {
  return await callApiDelete(`/blog/${blogId}/comment/${commentId}`);
}

export async function likeUnlikeBlog(blogId: string) {
  return await callApiPut(`/blog/${blogId}/like`, null);
}
