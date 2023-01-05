"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { BsFillPlusCircleFill } from "react-icons/bs";

import Upload from "./Upload";

export default function Head() {
  const { data: session } = useSession();

  const [isUpload, setIsUpload] = useState(false);

  return (
    <div className='w-fit flex flex-row items-center justify-start gap-1 group cursor-pointer'>
      <h1 className='title text-2xl'>所有日程</h1>
      <button
        onClick={() => setIsUpload(true)}
        className='duration-300 hidden group-hover:block group-hover:text-slate-800/50'
      >
        <BsFillPlusCircleFill />
      </button>
      {isUpload && <Upload setIsUpload={setIsUpload} />}
    </div>
  );
}
