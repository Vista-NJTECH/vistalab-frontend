"use client";

import { useSession, signIn, signOut } from "next-auth/react";

function Button({ title, callback }) {
  return (
    <button
      type='button'
      onClick={() => callback()}
      className='btn w-full p-3 text-xl lg:text-base lg:px-3 lg:py-1 lg:w-fit'
    >
      {title}
    </button>
  );
}

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    return <Button title='退出' callback={signOut} />;
  } else {
    return <Button title='登录' callback={signIn} />;
  }
}
