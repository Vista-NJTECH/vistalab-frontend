"use client";

import Link from "next/link";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

import logo from "../../data/images/meta/logo.png";
import { navbarData } from "./config";

export default function Navbar() {
  const [isExpand, setIsExpand] = useState(false);

  const NavbarCard = ({ item }) => {
    return (
      <Link
        href={item.href}
        className='font-semibold text-md text-slate-700 border-b-2 duration-500 border-b-white hover:border-b-theme-dark flex flex-row gap-1 items-center justify-center'
      >
        <span>{item.icon}</span>
        <span>{item.title}</span>
      </Link>
    );
  };
  const handleClickExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  return (
    <div className='w-full flex flex-col gap-5 items-center justify-between px-10 md:px-48 py-3 shadow-md'>
      <div className='flex flex-row w-full items-center justify-between'>
        <div className='text-2xl font-bold text-slate-800 font-serif italic flex flex-row items-end justify-center gap-2'>
          <Image src={logo} width={40} alt='logo' className='w-auto' />
          <h1>Vistalab</h1>
        </div>
        <div className='hidden lg:flex flex-row items-center justify-center gap-4'>
          {navbarData.map((item, index) => (
            <NavbarCard key={index} item={item} />
          ))}
        </div>
        <button className='block lg:hidden text-xl' onClick={handleClickExpand}>
          <AiOutlineMenu />
        </button>
      </div>
      {isExpand && (
        <div className='lg:hidden w-full flex flex-col items-start gap-3'>
          {navbarData.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className='font-semibold text-xl text-slate-700 hover:border-b-theme-dark flex flex-row gap-2 items-center justify-center'
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
