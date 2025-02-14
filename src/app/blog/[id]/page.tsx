"use server";
import BlogEditDelete from "@/components/blog/BlogEditDelete";
import BlogLikeComment from "@/components/blog/BlogLikeComment";
import BlogDetails from "@/components/blog/BlogDetails";
import { IGetBlog } from "@/types/blog";
import BlogCommentSection from "@/components/blog/BlogCommentSection";
import { getBlogById } from "@/actions/blog";
import { BlogProvider } from "@/context/blog.context";
import { getServerAuthSession } from "@/utils/authOptions";

const Page = async ({ params }: { params: { id: string } }) => {
  let blogDetails = {} as IGetBlog;

  const response = await getBlogById(params.id);
  if (response && response.status) {
    blogDetails = response.data as IGetBlog;
  }

  const session = await getServerAuthSession();

  return (
    <section className="container max-w-3xl">
      <BlogProvider initialBlog={blogDetails}>
        {session?.user?._id.toString() ===
          blogDetails?.authorId?._id.toString() && (
          <BlogEditDelete blogDetails={blogDetails} />
        )}
        <BlogDetails blogDetails={blogDetails} />
        <BlogLikeComment userId={session?.user?._id ?? ""} />
        <BlogCommentSection userId={session?.user?._id ?? ""} />
      </BlogProvider>
    </section>
  );
};

export default Page;
