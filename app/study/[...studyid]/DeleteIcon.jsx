"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";

import Popup from "./PopUp";

function handleDelete(id) {
  console.log(id);
  setIsPopup((prevSate) => (prevSate = !prevSate));
}

export default function DeleteIcon({ item }) {
  const [isPopup, setIsPopup] = useState(false);
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
