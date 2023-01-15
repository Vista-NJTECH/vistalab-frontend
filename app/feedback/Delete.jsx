"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Popup } from "../../components";

function DeleteCard({ feedback, isDelete, setIsDelete }) {
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const handleDelete = async (id) => {
    setIsProcessing(true);
    setProcessingMsg("Processing...");
    fetch(`${process.env.BACKEND_URL}feedback/delete`, {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("删除成功");
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
            title: `确认删除 '${feedback.feedback}'`,
            cancelFun: () => setIsDelete(false),
            confirmFun: () => handleDelete(feedback.id),
          }}
          after={{
            isProcessing: isProcessing,
            message: processingMsg,
            confirmFun: () => {
              setIsProcessing(false);
              setIsDelete(false);
              router.refresh();
            },
          }}
        />
      )}
    </>
  );
}

export default function Delete({ feedback }) {
  const { data: session } = useSession();
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      {session && (
        <button onClick={() => setIsDelete(true)}>
          <MdDelete size={15} />
        </button>
      )}
      {isDelete && <DeleteCard feedback={feedback} isDelete={isDelete} setIsDelete={setIsDelete} />}
    </>
  );
}
