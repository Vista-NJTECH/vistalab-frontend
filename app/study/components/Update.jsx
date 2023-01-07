"use client";

import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";

import EditCard from "./EditCard";

function UpdateCard({ course }) {
  const { data: session } = useSession();
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='w-full flex flex-col items-start justify-between gap-2'>
      <div className='group flex flex-row items-center w-full gap-1 title text-xl'>
        <h1>{course.title}</h1>
        <button
          onClick={() => (session ? setIsEdit(true) : signIn())}
          className='group-hover:block hidden duration-300 group-hover:text-slate-800/50'
        >
          <FaEdit size={17} />
        </button>
      </div>
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='flex flex-row gap-2'>
          <Link
            href={`/study/${course.classification}`}
            className='bg-purple-500 hover:bg-purple-700 duration-500 text-white text-xs font-semibold p-1 rounded-md'
          >
            {course.classification}
          </Link>
          <Link
            href={`/study/${course.classification}/${course.coursename}`}
            className='bg-indigo-500 hover:bg-indigo-700 duration-500 text-white text-xs font-semibold p-1 rounded-md'
          >
            {course.coursename}
          </Link>
        </div>
        {course.tags && (
          <div className='flex flex-row gap-1'>
            {course.tags.split(",").map((item, index) => (
              <div key={index} className='flex flex-row items-center'>
                <h1 className='text-theme font-bold'>#</h1>
                <h1>{item}</h1>
              </div>
            ))}
          </div>
        )}
      </div>
      {isEdit && <EditCard course={course} setIsEdit={setIsEdit} />}
    </div>
  );
}

export default function Update({ course }) {
  const { data: session } = useSession();
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <>
      <button onClick={() => (session ? setIsUpdate(true) : signIn())} className='text-gray-600 hover:text-gray-800'>
        <FaEdit size={17} />
      </button>
      {isUpdate && <UpdateCard course={course} setIsUpdate={setIsUpdate} />}
    </>
  );
}
