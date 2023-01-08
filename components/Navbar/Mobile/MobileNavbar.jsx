"use client";

import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

import Avatar from "./Avatar";
import { navbarData } from "../config";

export default function MobileNavbar() {
  const [isExpand, setIsExpand] = useState(false);

  function Navbarcard({ item }) {
    return (
      <Link
        href={item.href}
        onClick={() => setIsExpand(false)}
        className='w-full font-semibold text-xl text-slate-700 flex flex-row gap-2 items-center justify-start border-b-2 hover:text-theme p-2 rounded-md duration-300'
      >
        <span>{item.icon}</span>
        <span>{item.title}</span>
      </Link>
    );
  }

  return (
    <div className='lg:hidden'>
      <button
        type='button'
        onClick={() => setIsExpand((prevState) => !prevState)}
        className='text-xl absolute top-0 bottom-0 right-5 my-auto'
      >
        {isExpand ? <RxCross1 /> : <AiOutlineMenu />}
      </button>
      <div
        className={`w-full flex flex-col items-start gap-4 px-5 py-5 absolute left-0 top-16 bg-white shadow-md duration-500 ${
          isExpand ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        {navbarData.map((item, index) => (
          <Navbarcard key={index} item={item} />
        ))}
        <Avatar />
      </div>
    </div>
  );
}
