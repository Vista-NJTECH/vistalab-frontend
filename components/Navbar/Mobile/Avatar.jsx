"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className='md:hidden w-full flex flex-col gap-1 items-center'>
        <Image
          width={30}
          height={30}
          src={session.user.avatar}
          alt='avatar'
          className='object-cover object-center rounded-full cursor-pointer'
        />
        <h1 className='text-gray-700'>Hello, {session.user.nickname}</h1>
        <button type='button' onClick={() => signOut()} className='btn w-full py-1'>
          退出
        </button>
      </div>
    );
  }

  return (
    <button
      type='button'
      onClick={() => signIn()}
      className='btn w-full p-3 text-xl lg:text-base lg:px-3 lg:py-1 lg:w-fit'
    >
      登录
    </button>
  );
}
