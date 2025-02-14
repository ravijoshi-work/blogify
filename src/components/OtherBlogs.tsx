import React from "react";
import Image from "next/image";
import demoImage from "@/public/img/demo_image.jpg";
import Link from "next/link";
import { AiTwotoneCalendar } from "react-icons/ai";
import { IGetBlog } from "@/types/blog";
import { formateDateToTime } from "@/utils/helper";

type Propstype = {
  otherBlogs: IGetBlog[];
};

const OtherBlogs = ({ otherBlogs }: Propstype) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {otherBlogs?.length > 0 &&
          otherBlogs?.map((item: IGetBlog, index: number) => (
            <div
              key={index}
              className="p-2 rounded-lg border border-gray-500 hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <Link href={`/blog/${item?._id}`}>
                <div>
                  <Image
                    src={item?.image ? item.image?.url : demoImage}
                    alt="blog image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[400px] h-[200px] rounded-lg mb-2 object-cover"
                  />

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs">
                      <p className="text-primaryColor">{item?.category}</p>

                      <p className="flex items-center gap-1 text-paragraphColor">
                        <AiTwotoneCalendar />
                        {formateDateToTime(item?.createdAt)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h2 className="truncate">{item?.title}</h2>
                      <p className="line-clamp-2 text-sm text-paragraphColor">
                        {item?.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          item?.authorId?.avatar?.url
                            ? item?.authorId?.avatar?.url
                            : demoImage
                        }
                        alt="picture of the author"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-10 h-10 rounded-full"
                      />

                      <div className="text-xs">
                        <h6>{item?.authorId?.name}</h6>
                        <p className="text-paragraphColor">
                          {item?.authorId?.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default OtherBlogs;
