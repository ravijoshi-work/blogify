import { SiteSettings } from "@/utils/constant";
import Link from "next/link";
import React from "react";
import { LiaGithub, LiaLinkedin, LiaUser } from "react-icons/lia";

const Footer = () => {
  return (
    <div className="py-10 items-center grid grid-cols-1 lg:flex lg:justify-between">
      <div className="text-center flex-1">
        Copyright © 2024 All rights reserved.
      </div>
      <ul className="flex-1 flex gap-5 items-center justify-center">
        <li>
          <Link
            href={""}
            className="flex items-center gap-1 hover:special-word"
          >
            <LiaUser />
            Ravi Joshi
          </Link>
        </li>
        <li>
          <Link
            href={SiteSettings.github}
            target="_blank"
            className="flex items-center gap-1 hover:special-word"
          >
            <LiaGithub />
            Github
          </Link>
        </li>
        <li className="">
          <Link
            target="_blank"
            href={SiteSettings.linkedin}
            className="flex items-center gap-1 hover:special-word"
          >
            <LiaLinkedin />
            Linkedin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
