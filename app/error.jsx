"use client";

export default function Error({ error, reset }) {
  return (
    <div className='frame flex flex-col items-center w-full'>
      <p className='title text-xl'>Something went wrong!</p>
    </div>
  );
}
