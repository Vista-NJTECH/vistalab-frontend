"use client";

import { useSession, signIn } from "next-auth/react";

import Avatar from "./Avatar";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return <Avatar />;
  } else {
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
}
