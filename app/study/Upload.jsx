"use client";

import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useSession, signIn } from "next-auth/react";

import UploadCard from "./UploadCard";

export default function Upload() {
  const { data: session } = useSession();
  const [isAddNew, setIsAddNew] = useState(false);

  return (
    <div className='flex flex-row items-center justify-start gap-1 group'>
      <h1 className='title text-2xl'>所有课程</h1>
      <button
        onClick={() => (session ? setIsAddNew(true) : signIn())}
        className='hidden group-hover:block group-hover:text-slate-800/50'
      >
        <BsFillPlusCircleFill />
      </button>
      {isAddNew && <UploadCard setIsAddNew={setIsAddNew} />}
    </div>
  );
}
