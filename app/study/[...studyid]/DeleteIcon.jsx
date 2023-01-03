"use client";

import { MdDelete } from "react-icons/md";

function handleDelete(id) {
  console.log(id);
}

export default function DeleteIcon({ item }) {
  return (
    <div className='title text-xl font-bold group flex flex-row items-center w-full'>
      <h1>{item.title}</h1>
      <div
        onClick={() => handleDelete(item.title)}
        className='group-hover:block hidden duration-300 group-hover:text-slate-800/50 cursor-pointer'
      >
        <MdDelete />
      </div>
    </div>
  );
}
