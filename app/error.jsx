"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='frame w-full flex flex-col items-center justify-center gap-3'>
      <p className='title text-xl'>Something went wrong!</p>
      <button onClick={() => reset()} className='btn py-2 px-4'>
        Reload
      </button>
    </div>
  );
}
