import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Router, useRouter } from "next/router";

export default function Header(props: {
  canUback: boolean;
  routeBack?: string;
  tabTitle?: string;
}) {
  return (
    <div className="flex w-screen h-12 px-4 gap-x-6 items-center">
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
      <span className="font-normal text-lg text-gray-800">
        {props.tabTitle}
      </span>
    </div>
  );
}
