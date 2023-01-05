"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";

import EditCard from "./EditCard";

export default function Edit({ item }) {
  const { data: session } = useSession();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='w-full'>
      <div className='group flex flex-row items-center w-full gap-1 title text-xl font-bold'>
        <h1>{item.title}</h1>
        <button
          onClick={() => (session ? setIsEdit(true) : signIn())}
          className='group-hover:block hidden duration-300 group-hover:text-slate-800/50'
        >
          <FaEdit size={17} />
        </button>
      </div>
      {isEdit && <EditCard item={item} setIsEdit={setIsEdit} />}
    </div>
  );
}
