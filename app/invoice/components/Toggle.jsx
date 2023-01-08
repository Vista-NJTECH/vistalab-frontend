"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

import { Popup } from "../../../components";

function ToggleCard({ record, isToggle, setIsToggle }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const handleDelete = async (id) => {
    setIsProcessing(true);
    setProcessingMsg("Processing...");
    fetch(`${process.env.BACKEND_URL}invoice/unstate`, {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("更新成功");
          router.refresh();
        } else {
          setProcessingMsg(data.message);
          console.error(data.message);
        }
      })
      .catch((error) => {
        setProcessingMsg("更新失败");
        console.error(error);
      });
  };

  return (
    <>
      {isToggle && (
        <Popup
          before={{
            title: `确认更新 '${record.title}'`,
            cancelFun: () => setIsToggle(false),
            confirmFun: () => handleDelete(record.id),
          }}
          after={{
            isProcessing: isProcessing,
            message: processingMsg,
            confirmFun: () => {
              setIsProcessing(false);
              setIsToggle(false);
            },
          }}
        />
      )}
    </>
  );
}

export default function Toggle({ record }) {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <>
      <button onClick={() => setIsToggle(true)} className='text-gray-700 hover:text-gray-900 mx-1'>
        {record.state === 1 ? <FaToggleOn /> : <FaToggleOff />}
      </button>
      {isToggle && <ToggleCard record={record} isToggle={isToggle} setIsToggle={setIsToggle} />}
    </>
  );
}
