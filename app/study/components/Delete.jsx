"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { Popup } from "../../../components";

function DeleteCard({ course, isDelete, setIsDelete }) {
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const handleDelete = async (id) => {
    setIsProcessing(true);
    setProcessingMsg("Processing...");
    fetch(`${process.env.BACKEND_URL}study/delete`, {
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
        router.refresh();
      })
      .catch((error) => {
        setProcessingMsg("删除失败");
        console.error(error);
      });
  };

  return (
    <>
      {isDelete && (
        <Popup
          before={{
            title: `确认删除 '${course.title}'`,
            cancelFun: () => setIsDelete(false),
            confirmFun: () => handleDelete(course.id),
          }}
          after={{
            isProcessing: isProcessing,
            message: processingMsg,
            confirmFun: () => {
              setIsProcessing(false);
              setIsDelete(false);
            },
          }}
        />
      )}
    </>
  );
}

export default function Delete({ course }) {
  const { data: session } = useSession();
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <button onClick={() => (session ? setIsDelete(true) : signIn())} className='text-gray-600 hover:text-gray-800'>
        <MdDelete size={17} />
      </button>
      {isDelete && <DeleteCard course={course} isDelete={isDelete} setIsDelete={setIsDelete} />}
    </>
  );
}