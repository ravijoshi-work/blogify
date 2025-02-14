"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import avatar from "@/public/img/user.png";
import { signOut, useSession } from "next-auth/react";
import { getUserById } from "@/actions/user";
import { IGetUser } from "@/types/user";

const Navbar = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState<IGetUser | undefined>();
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  async function fetchUser() {
    const response = await getUserById(session?.user?._id??'');
    if (response && response.status) {
      setUserData(response.data as IGetUser);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [session?.user?._id]);

  const handleShowDropdown = () => {
    setShowDropdown((pre) => !pre);
  };

  const handleHideDropdown = () => {
    setShowDropdown(false);
  };

  const onLogoutClick = () => {
    signOut();
    handleHideDropdown();
  };

  return (
    <div className="container py-2 h-16 flex items-center justify-between">
      <Link href="/">
        <h2>
          Blogify<span className="special-word">.io</span>
        </h2>
      </Link>

      <ul className="flex items-center gap-3">
        <li>
          <Link
            href="/blog"
            className={
              pathname === "/blog" ? "text-primaryColor font-bold" : ""
            }
          >
            Blog
          </Link>
        </li>

        {session?.user ? (
          <>
            <li>
              <Link
                href="/create-blog"
                className={
                  pathname === "/create-blog"
                    ? "text-primaryColor font-bold"
                    : ""
                }
              >
                Create
              </Link>
            </li>
            <li>
              <div className="relative">
                <Image
                  onClick={handleShowDropdown}
                  src={userData?.avatar?.url ? userData?.avatar?.url : avatar}
                  alt="avatar"
                  placeholder="blur"
                  width={0}
                  priority
                  height={0}
                  sizes="100vw"
                  className="w-10 h-10 rounded-full cursor-pointer border border-primaryColor"
                />

                {showDropdown && (
                  <div className="absolute rounded top-0 right-0 bg-primaryColorLight">
                    <div className="relative p-5 pt-6">
                      <AiOutlineClose
                        onClick={handleHideDropdown}
                        className="cursor-pointer absolute top-2 right-2"
                      />
                      <button onClick={onLogoutClick}>Logout</button>
                      <Link
                        onClick={handleHideDropdown}
                        href={`/user/${session?.user?._id}`}
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className={
                  pathname === "/login" ? "text-primaryColor font-bold" : ""
                }
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className={
                  pathname === "/signup" ? "text-primaryColor font-bold" : ""
                }
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
