"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import demoImage from "@/public/img/demo_image.jpg";
import { useModal } from "@/context/modal.context";
import UserProfileForm from "../forms/UserProfile";
import { formateDateToTime } from "@/utils/helper";
import { useUser } from "@/context/user.context";

type PropsType = {
  currentUserId: string;
};

const ProfileDetails = ({ currentUserId }: PropsType) => {
  const { user } = useUser();
  const { openModal } = useModal();

  const formattedTime = useMemo(
    () => formateDateToTime(user?.createdAt),
    [user]
  );

  const onEditClick = () => {
    openModal({
      view: <UserProfileForm />,
    });
  };

  return (
    <div className="p-3 my-5 container">
      <div className="text-center text-primaryColor pb-20">
        <h2>Profile</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex-1 space-y-3">
          <h1 className="text-xl">About Me</h1>
          <p>{user?.about}</p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <Image
            src={user?.avatar?.url || demoImage}
            alt="avatar"
            width={0}
            height={0}
            sizes="100vw"
            className="w-40 h-40 rounded-full border-2 border-black"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h4 className="text-xl">Details</h4>

          <div className="space-y-1">
            <p>Email:</p>
            <p>{user?.email}</p>
          </div>

          <div className="space-y-1">
            <p>Name:</p>
            <p>{user?.name}</p>
          </div>

          <div className="space-y-1">
            <p>Age:</p>
            <p>{user?.age}</p>
          </div>

          <div className="space-y-1">
            <p>Location:</p>
            <p>{user?.location}</p>
          </div>

          <div className="space-y-1">
            <p>Joined:</p>
            <p>{formattedTime}</p>
          </div>
        </div>
      </div>

      <div className="pt-5">
        {user?._id === currentUserId && (
          <button className="text-primaryColor mr-3" onClick={onEditClick}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
