"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { Popup } from "../../../components";

export default function Delete({ item }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPopup, setIsPopup] = useState(false);
  const handleDelete = async (id) => {
    fetch("http://124.223.196.177:8181/study/delete", {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setIsPopup(false);
          router.refresh();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
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
