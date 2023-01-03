"use client";

import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Popup } from "../../../components";

export default function DeleteIcon({ item }) {
  const router = useRouter();
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
      <div
        onClick={() => setIsPopup(true)}
        className='group-hover:block hidden duration-300 group-hover:text-slate-800/50 cursor-pointer'
      >
        <MdDelete />
      </div>
      {isPopup && (
        <Popup title='确认删除' cancelFun={() => setIsPopup(false)} confirmFun={() => handleDelete(item.id)} />
      )}
    </div>
  );
}
