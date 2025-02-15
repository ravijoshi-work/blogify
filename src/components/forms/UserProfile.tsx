"use client";
import { deletePhoto } from "@/actions/cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Input from "../ui/Input";
import { useModal } from "@/context/modal.context";
import { updateUser } from "@/actions/user";
import { useUser } from "@/context/user.context";
import { IGetUser } from "@/types/user";

const UserProfileForm = () => {
  const { user: profile, setUser } = useUser();
  const CLOUD_NAME = "dq3sduyht";
  const UPLOAD_PRESET = "nextjs_blog_images";
  const [profileToEdit, setProfileToEdit] = useState<IGetUser>(profile);
  const [avatarToEdit, setAvatarToEdit] = useState<Blob | File | null>(null);
  const { closeModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const uploadImage = async () => {
    if (!avatarToEdit) return;

    const formdata = new FormData();

    formdata.append("file", avatarToEdit);
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

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const { name, about, designation, age, location } = profileToEdit;

    if (!name) {
      setError("Name is required.");
      return;
    }

    if (avatarToEdit) {
      const maxSize = 2 * 1024 * 1024; // 2MB in bytes
      if (avatarToEdit.size > maxSize) {
        setError("File size is too large. Please select a file under 2MB.");
        return;
      }
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      let profileImg;

      if (avatarToEdit) {
        profileImg = await uploadImage();

        if (profile?.avatar?.id) {
          await deletePhoto(profile?.avatar?.id);
        }
      } else {
        profileImg = profile?.avatar;
      }

      const paylod = {
        name,
        about,
        designation,
        age,
        location,
        avatar: profileImg,
      };

      const response = await updateUser(profile._id, paylod);
      if (response?.status) {
        setIsLoading(false);
        setSuccess(response?.message || "User updated successfully.");
        setUser(response.data as IGetUser);
        closeModal();
      } else {
        setError(response.error || "Error occurred while updating user.");
        setIsLoading(false);
      }
    } catch (error) {
      setError(
        (error as Error)?.message || "Error occurred while updating user."
      );
      setIsLoading(false);
    }
  };

  const handleCancelUploadImage = () => {
    setAvatarToEdit(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setAvatarToEdit((files && files[0]) || null);
    } else {
      setProfileToEdit((preState) => ({ ...preState, [name]: value }));
    }
  };

  return (
    <form className="w-full space-y-3 text-center" onSubmit={handleEditSubmit}>
      <h2 className="text-2xl text-primaryColor pb-3">Profile</h2>

      {avatarToEdit ? (
        <div className="flex justify-center items-start">
          <Image
            src={avatarToEdit ? URL.createObjectURL(avatarToEdit) : ""}
            alt="avatar"
            width={0}
            height={0}
            sizes="100vw"
            className="w-20 h-20 rounded-full border-2 border-black"
          />

          <button className="text-red-500" onClick={handleCancelUploadImage}>
            <AiOutlineClose />
          </button>
        </div>
      ) : (
        <div className="flex justify-center">
          {profile?.avatar && profile?.avatar["url"] && (
            <div>
              <Image
                src={profile?.avatar?.url}
                alt="avatar"
                width={0}
                height={0}
                sizes="100vw"
                className="w-20 h-20 rounded-full border-2 border-black"
                priority
              />
            </div>
          )}
        </div>
      )}

      <div>
        <input
          onChange={handleChange}
          type="file"
          name="newImage"
          accept="image/*"
          className="block w-full border border-gray-300 rounded-lg"
        />
      </div>

      <Input
        name="name"
        type="text"
        placeholder="name"
        value={profileToEdit?.name || ""}
        onChange={handleChange}
        label={""}
      />

      <Input
        name="designation"
        type="text"
        placeholder="designation"
        value={profileToEdit?.designation || ""}
        onChange={handleChange}
        label={""}
      />

      <Input
        name="about"
        type="text"
        placeholder="about"
        value={profileToEdit?.about || ""}
        onChange={handleChange}
        label={""}
      />

      <Input
        name="age"
        type="text"
        placeholder="age"
        value={profileToEdit?.age || ""}
        onChange={handleChange}
        label={""}
      />

      <Input
        name="location"
        type="text"
        placeholder="location"
        value={profileToEdit?.location || ""}
        onChange={handleChange}
        label={""}
      />

      {error && <div className="text-red-700">{error}</div>}

      {success && <div className="text-green-700">{success}</div>}

      <div className="space-x-5">
        <button type="submit" className="btn">
          {isLoading ? "Loading..." : "Update"}
        </button>

        <button className="btn bg-red-700" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;
