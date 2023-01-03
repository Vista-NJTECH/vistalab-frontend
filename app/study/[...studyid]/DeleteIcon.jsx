"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { Popup } from "../../../components";

export default function DeleteIcon({ item }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPopup, setIsPopup] = useState(false);
  const handleDelete = async (id) => {
    const res = await fetch("http://124.223.196.177:8181/study/delete", {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    setIsPopup(false);
    router.refresh();
  };

  return (
    <div className='title text-xl font-bold group flex flex-row items-center w-full'>
      <h1>{item.title}</h1>
      <button
        onClick={() => (session ? setIsPopup(true) : signIn())}
        className='group-hover:block hidden duration-300 group-hover:text-slate-800/50'
      >
        <MdDelete />
      </button>
      {isPopup && (
        <Popup title='确认删除' cancelFun={() => setIsPopup(false)} confirmFun={() => handleDelete(item.id)} />
      )}
    </div>
  );
}
