"use client";

import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function DeleteIcon({ item }) {
  const router = useRouter();
  const handleDelete = (id) => {
    fetch("http://124.223.196.177:8181/study/delete", {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).catch((err) => {
      console.log("Cannot delete card!");
    });
    router.refresh();
    console.log("Refreshed!");
  };

  return (
    <div className='title text-xl font-bold group flex flex-row items-center w-full'>
      <h1>{item.title}</h1>
      <div
        onClick={() => handleDelete(item.id)}
        className='group-hover:block hidden duration-300 group-hover:text-slate-800/50 cursor-pointer'
      >
        <MdDelete />
      </div>
    </div>
  );
}
