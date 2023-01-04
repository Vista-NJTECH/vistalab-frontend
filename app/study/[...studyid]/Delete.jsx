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
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");
  const handleDelete = async (id) => {
    setIsProcessing(true);
    setProcessingMsg("Processing...");
    fetch("http://124.223.196.177:8181/study/delete", {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("删除成功");
        } else {
          setProcessingMsg("删除失败");
          console.error(data.message);
        }
      })
      .catch((error) => {
        setProcessingMsg("删除失败");
        console.error(error);
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
        <Popup
          before={{
            title: "确认删除",
            cancelFun: () => setIsPopup(false),
            confirmFun: () => handleDelete(item.id),
          }}
          after={{
            isProcessing: isProcessing,
            message: processingMsg,
            confirmFun: () => {
              setIsProcessing(false);
              setIsPopup(false);
              router.refresh();
            },
          }}
        />
      )}
    </div>
  );
}
