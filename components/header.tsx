import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Router, useRouter } from "next/router";

export default function Header(props: {
  canUback: boolean;
  routeBack?: string;
  tabTitle?: string;
  userName?: string;
}) {
  return (
    <div className="flex w-screen h-14 px-4 gap-x-6 items-center border-b">
      {props.canUback && (
        <Link href={props.routeBack as string}>
          <a>
            <FontAwesomeIcon
              icon="arrow-left"
              size="1x"
              className="fill-current text-gray-700"
            />
          </a>
        </Link>
      )}
      {props.tabTitle === "De tu interés" && (
        <span className="flex h-10 w-10 rounded-full bg-blue-500 items-center justify-center text-white text-xl font-medium">
          {props.userName}
        </span>
        // <span className="flex h-10 w-10 rounded-full bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500"></span>
      )}
      <span className="font-medium text-lg text-gray-800">
        {props.tabTitle}
      </span>
    </div>
  );
}
