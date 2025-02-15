"use client";
import { deletePhoto } from "@/actions/cloudinary";
import { IGetBlog } from "@/types/blog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../ui/Input";
import TextArea from "../ui/Textarea";
import Image from "next/image";
import { createBlog, updateBlog } from "@/actions/blog";
import toast from "react-hot-toast";

type PropsType = {
  data?: IGetBlog;
};

type initialStateType = {
  title: string;
  description: string;
  excerpt: string;
  quote: string;
  category: string;
  photo: {
    id?: string;
    url?: string;
  };
  blogId: string;
  newImage: Blob | File | string;
};

const initialState: initialStateType = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "Songbirds",
  photo: {},
  blogId: "",
  newImage: "",
};

const BlogForm = ({ data }: PropsType) => {
  const CLOUD_NAME = "dq3sduyht";
  const UPLOAD_PRESET = "nextjs_blog_images";

  const [state, setState] = useState<IGetBlog | initialStateType>(
    data ?? initialState
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const handleChange = (
    event:
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      | undefined
  ) => {
    setError("");
    const { name, value, type } = event?.target as HTMLInputElement;

    if (type === "file") {
      const { files } = event?.target as HTMLInputElement;
      if (files && files[0]) {
        setState({ ...state, [name]: files[0] });
      }
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { newImage, title, category, description, excerpt, quote } =
      state as initialStateType;

    if (!title || !description || !category || !excerpt || !quote) {
      setError("Please fill out all required fields.");
      return;
    }

    if (newImage) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if ((newImage as File).size > maxSize) {
        setError("File size is too large. Please select a file under 5MB.");
        return;
      }
    }

    if (title.length < 4) {
      setError("Title must be at least 4 characters long.");
      return;
    }

    if (description.length < 20) {
      setError("Description must be at least 20 characters long.");
      return;
    }

    if (excerpt.length < 10) {
      setError("Excerpt must be at least 10 characters long.");
      return;
    }

    if (quote.length < 6) {
      setError("Quote must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    let image;

    if ((state as initialStateType)?.newImage) {
      image = await uploadImage();

      if ((state as initialStateType)?.photo?.id) {
        await deletePhoto((state as initialStateType)?.photo.id as string);
      }
    } else {
      image = (state as initialStateType)?.photo;
    }

    const payload = {
      title,
      description,
      excerpt,
      quote,
      category,
      image,
      authorId: session?.user?._id,
    };

    if (data) {
      const response = await updateBlog(data?._id, payload);

      if (response?.status) {
        toast.success(response?.message || "Blog updated successfully.");
        router.refresh();
        router.push(`/blog/${data._id}`);
      } else {
        toast.error(response.error || "Error occurred while updating blog.");
        setError("Error occurred while updating blog.");
      }
    } else {
      const response = await createBlog(payload);

      if (response?.status) {
        toast.success(response?.message || "Blog created successfully.");
        router.push(`/blog/${(response?.data as IGetBlog)?._id}`);
      } else {
        toast.error(response.error || "Error occurred while creating blog.");
        setError("Error occurred while creating blog.");
      }
    }
  };

  const uploadImage = async () => {
    if (!(state as initialStateType).newImage) return;

    const formdata = new FormData();

    formdata.append("file", (state as initialStateType)?.newImage);
    formdata.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formdata,
        }
      );

      const data = await res.json();
      const image = {
        id: data["public_id"],
        url: data["secure_url"],
      };

      return image;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelUploadImg = () => {
    setState({ ...state, ["newImage"]: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title"
        type="text"
        name="title"
        placeholder="Write you title here..."
        onChange={handleChange}
        value={state.title}
      />

      <TextArea
        label="Description"
        rows={4}
        name="description"
        placeholder="Write you description here..."
        onChange={handleChange}
        value={state.description}
      />

      <TextArea
        label="Excerpt"
        rows={2}
        name="excerpt"
        placeholder="Write you excerpt here..."
        onChange={handleChange}
        value={state.excerpt}
      />

      <TextArea
        label="Quote"
        rows={2}
        name="quote"
        placeholder="Write you quote here..."
        onChange={handleChange}
        value={state.quote}
      />

      <div>
        <label className="block">Select an option</label>
        <select
          name="category"
          onChange={handleChange}
          value={state.category}
          className="block rounded-lg w-full p-3 bg-primaryColorLight"
        >
          <option value="Songbirds">Songbirds</option>
          <option value="Waterfowl">Waterfowl</option>
          <option value="Parrots">Parrots</option>
          <option value="Seabirds">Seabirds</option>
          <option value="Gamebirds">Gamebirds</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium">Upload Image</label>

        <input
          onChange={handleChange}
          type="file"
          name="newImage"
          accept="image/*"
        />

        {(state as initialStateType)?.newImage ? (
          <div>
            <Image
              src={URL.createObjectURL(
                (state as initialStateType)?.newImage as File
              )}
              priority
              alt="Sample image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-32 mt-5"
            />

            <button onClick={handleCancelUploadImg}>Cancel</button>
          </div>
        ) : (
          <div>
            {(state as initialStateType)?.photo &&
              (state as initialStateType)?.photo["url"] && (
                <div>
                  <Image
                    src={(state as initialStateType)?.photo?.url ?? ""}
                    priority
                    alt="Sample image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-32 mt-5"
                  />
                </div>
              )}
          </div>
        )}
      </div>

      {error && <div className="text-red-700">{error}</div>}

      {success && <div className="text-green-700">{success}</div>}

      <button type="submit" className="btn">
        {isLoading ? "Saving..." : data ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default BlogForm;
