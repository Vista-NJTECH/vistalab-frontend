"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { Popup } from "../../../components";

function DeleteCard({ project, isDelete, setIsDelete }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const handleDelete = async (id) => {
    setIsProcessing(true);
    setProcessingMsg("Processing...");
    fetch(`${process.env.BACKEND_URL}project/delete`, {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: session.user.token },
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
            title: `确认删除 '${project.title}'`,
            cancelFun: () => setIsDelete(false),
            confirmFun: () => handleDelete(project.id),
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

export default function DeleteProject({ project }) {
  const { data: session } = useSession();
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <button onClick={() => (session ? setIsDelete(true) : signIn())} className='text-gray-600 hover:text-gray-900'>
        <MdDelete size={20} />
      </button>
      {isDelete && <DeleteCard project={project} isDelete={isDelete} setIsDelete={setIsDelete} />}
    </>
  );
}
