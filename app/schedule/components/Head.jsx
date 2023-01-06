"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { BsFillPlusCircleFill } from "react-icons/bs";

import Upload from "./Upload";

export default function Head() {
  const { data: session } = useSession();

  const [isUpload, setIsUpload] = useState(false);

  return (
    <div className='w-full flex flex-row items-center justify-between'>
      <h1 className='title text-2xl'>有效日程</h1>
      <button
        onClick={() => (session ? setIsUpload(true) : signIn())}
        className='flex flex-row items-center gap-1 text-gray-600 font-bold hover:text-gray-800'
      >
        <h1>添加</h1>
        <BsFillPlusCircleFill />
      </button>
      {isUpload && <Upload setIsUpload={setIsUpload} />}
    </div>
  );
}
