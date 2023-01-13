"use client";

import Image from "next/image";
import { IoTriangleSharp } from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Avatar() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='flex flex-row gap-1 items-center relative group'>
        <Image
          width={30}
          height={30}
          src={session.user.avatar}
          alt='avatar'
          className='object-cover object-center rounded-full cursor-pointer'
        />
        <div className='hidden group-hover:flex absolute right-0 top-[30px] w-32 flex-col items-center'>
          <div className='w-full flex flex-row items-end justify-end mr-2 text-white'>
            <IoTriangleSharp />
          </div>
          <div className='w-full bg-white shadow-md p-3 rounded-md flex flex-col items-center gap-2'>
            <h1 className='text-gray-700'>Hello, {session.user.nickname}</h1>
            <div className='w-full h-[1.5px] bg-gray-200'></div>
            <Link href='/profile' className='text-gray-500 hover:text-gray-800'>
              用户中心
            </Link>
            <div className='w-full h-[1.5px] bg-gray-200'></div>
            <button type='button' onClick={() => signOut()} className='btn w-full py-1'>
              退出
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <button type='button' onClick={() => signIn()} className='btn text-base px-3 py-1 w-fit'>
      登录
    </button>
  );
}