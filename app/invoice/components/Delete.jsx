"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Popup } from "../../../components";

function DeleteCard({ record, isDelete, setIsDelete }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const handleDelete = async (id) => {
    setIsProcessing(true);
    setProcessingMsg("Processing...");
    fetch(`${process.env.BACKEND_URL}invoice/delete`, {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("删除成功");
          router.refresh();
        } else {
          setProcessingMsg(data.message);
          console.error(data.message);
        }
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
            title: `确认删除 '${record.title}'`,
            cancelFun: () => setIsDelete(false),
            confirmFun: () => handleDelete(record.id),
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

export default function Delete({ record }) {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <button onClick={() => setIsDelete(true)} className='text-gray-600 hover:text-gray-800'>
        <MdDelete size={20} />
      </button>
      {isDelete && <DeleteCard record={record} isDelete={isDelete} setIsDelete={setIsDelete} />}
    </>
  );
}
