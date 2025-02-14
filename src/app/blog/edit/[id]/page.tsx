import BlogForm from "@/components/forms/Blog";
import { IGetBlog } from "@/types/blog";
import { getBlogById } from "@/actions/blog";

const Page = async ({ params }: { params: { id: string } }) => {
  let blog = {} as IGetBlog;

  const response = await getBlogById(params?.id);

  if (response && response.status) {
    blog = response.data as IGetBlog;
  }

  return (
    <section className="container max-w-3xl">
      <h2 className="mb-5">
        <span className="special-word">Edit</span> Blog
      </h2>
      <BlogForm data={blog} />
    </section>
  );
};

export default Page;
