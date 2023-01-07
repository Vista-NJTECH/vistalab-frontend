"use client";

import Image from "next/image";
import { IoTriangleSharp } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

function UserDetail() {
  const { data: session } = useSession();
  return (
    <div className='hidden group-hover:flex absolute right-0 top-[30px] w-32 flex-col items-center'>
      <div className='w-full flex flex-row items-end justify-end mr-2 text-white'>
        <IoTriangleSharp />
      </div>
      <div className='w-full bg-white shadow-md p-2 rounded-md flex flex-col items-center gap-2'>
        <h1 className='text-gray-700'>Hello, {session.user.nickname}</h1>
        <button type='button' onClick={() => signOut()} className='btn w-full py-1'>
          退出
        </button>
      </div>
    </div>
  );
}

export default function Avatar() {
  const { data: session } = useSession();

  return (
    <div className='flex flex-row gap-1 items-center relative group'>
      <Image
        width={30}
        height={30}
        src={session.user.avatar}
        alt='avatar'
        className='w-full h-full object-cover object-center rounded-full cursor-pointer'
      />
      <UserDetail />
    </div>
  );
}
