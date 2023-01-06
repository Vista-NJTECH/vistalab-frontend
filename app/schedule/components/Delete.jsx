"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Popup } from "../../../components";

export default function Delete({ schedule, isDelete, setIsDelete }) {
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const handleDelete = async (id) => {
    setIsProcessing(true);
    setProcessingMsg("Processing...");
    fetch(`${process.env.BACKEND_URL}schedule/delete`, {
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
        router.refresh();
      });
  };

  return (
    <>
      {isDelete && (
        <Popup
          before={{
            title: `确认删除 '${schedule.title}'`,
            cancelFun: () => setIsDelete(false),
            confirmFun: () => handleDelete(schedule.id),
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
