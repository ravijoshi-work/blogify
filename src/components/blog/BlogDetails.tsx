import { IGetBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import demoImage from "@/public/img/demo_image.jpg";
import { formateDateToTime } from "@/utils/helper";

type PropsType = {
  blogDetails?: IGetBlog;
};

function splitParagraph(paragraph: string) {
  const MIN_LENGTH = 280;
  const sentences = paragraph.split(". ");

  let currentParagraph = "";
  const paragraphs = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const isLastSentence = i === sentences.length - 1;

    if (isLastSentence) {
      currentParagraph += sentence + " "; // No dot after the last sentence
    } else if (currentParagraph.length + sentence.length + 2 <= MIN_LENGTH) {
      currentParagraph += sentence + ". ";
    } else {
      paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
      currentParagraph = sentence + ". ";
    }
  }

  if (currentParagraph) {
    paragraphs.push(<p key={paragraphs.length}>{currentParagraph.trim()}</p>);
  }

  return paragraphs;
}

const BlogDetails = ({ blogDetails }: PropsType) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={`/user/${blogDetails?.authorId?._id?.toString()}`}>
        <div className="flex flex-col justify-center items-center py-10">
          <Image
            src={
              blogDetails?.authorId?.avatar?.url
                ? blogDetails?.authorId?.avatar?.url
                : demoImage
            }
            alt="avatar image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-20 h-20 rounded-full"
          />

          <div className="text-center">
            <p className="text-whiteColor">{blogDetails?.authorId?.name}</p>
            <p>{blogDetails?.authorId?.designation}</p>
          </div>
        </div>
      </Link>

      <div className="text-center space-y-3">
        <h2>{blogDetails?.title}</h2>

        <p>{blogDetails?.excerpt}...</p>

        <p className="flex items-center justify-center gap-3">
          <span className="text-primaryColor">{blogDetails?.category}</span>

          <span className="flex items-center gap-1">
            <AiTwotoneCalendar />
            {formateDateToTime(blogDetails?.createdAt)}
          </span>
        </p>

        <div>
          <Image
            src={blogDetails?.image ? blogDetails?.image?.url : demoImage}
            alt="blog details image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[800px] md:h-[500px] h-[300px] object-cover rounded-lg my-10"
          />
        </div>

        <div className="text-start">
          <div className="space-y-5">
            {blogDetails?.description &&
              splitParagraph(blogDetails?.description).map(
                (paragraph, pIndex) => (
                  <div key={pIndex}>
                    {pIndex ===
                      Math.floor(
                        splitParagraph(blogDetails?.description).length / 2
                      ) && (
                      <blockquote className="border-l-4 border-primaryColor border-spacing-6 italic mb-5">
                        <p className="ml-5">{blogDetails?.quote}</p>
                      </blockquote>
                    )}

                    {paragraph}
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
