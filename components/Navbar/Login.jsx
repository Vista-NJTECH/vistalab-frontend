"use client";

import { useSession, signIn, signOut } from "next-auth/react";

function Button({ title, callback }) {
  return (
    <button type='button' onClick={() => callback()} className='btn px-2 py-1'>
      <span>{title}</span>
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
