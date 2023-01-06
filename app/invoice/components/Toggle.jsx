"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Popup } from "../../../components";
import { useInvoiceStateContext } from "./InvoiceContextProvider";

export default function Toggle({ record, isToggle, setIsToggle }) {
  const { data: session } = useSession();
  const { fetchInvoice } = useInvoiceStateContext();

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
        } else {
          setProcessingMsg("更新失败");
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
              fetchInvoice();
            },
          }}
        />
      )}
    </>
  );
}
