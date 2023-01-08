"use client";

import { useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='frame w-full flex flex-col items-center justify-center gap-3'>
      <button className='text-theme shadow-md hover:shadow-xl rounded-full'>
        <IoMdRefresh size={40} />
      </button>
      <p className='title text-xl'>Something went wrong!</p>
    </div>
  );
}
