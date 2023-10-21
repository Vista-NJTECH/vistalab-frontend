"use client";

import Link from "next/link";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";

import Avatar from "./Avatar";
import { navbarData } from "../config";

function NavbarCard({ item, setIsExpand, setIsOpenSubMenu }) {
  if (item.subMenu) {
    return (
      <div
        onClick={() => setIsOpenSubMenu((pre) => (pre = !pre))}
        className='cursor-pointer w-full font-semibold text-xl text-slate-700 border-b-2 hover:text-theme p-2 rounded-md duration-300 flex flex-row gap-2 items-center justify-between'
      >
        <div className='flex flex-row gap-2 items-center justify-start'>
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </div>
        <AiFillCaretDown />
      </div>
    );
  }
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

export default function MobileNavbar() {
  const [isExpand, setIsExpand] = useState(false);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);

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
        className={`w-full flex flex-col items-start gap-3 px-5 py-5 absolute left-0 top-16 bg-white shadow-md duration-500 ${
          isExpand ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        {navbarData.map((item1, index1) => (
          <div key={index1} className='w-full'>
            <NavbarCard item={item1} setIsExpand={setIsExpand} setIsOpenSubMenu={setIsOpenSubMenu} />
            {item1.subMenu && isOpenSubMenu && (
              <div className='flex flex-col items-start gap-1 ml-3'>
                {item1.subMenu.map((item2, index2) => (
                  <NavbarCard key={index2} item={item2} />
                ))}
              </div>
            )}
          </div>
        ))}
        <Avatar />
      </div>
    </div>
  );
}
