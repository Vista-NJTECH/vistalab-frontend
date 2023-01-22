"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function FeedbackForm() {
  const router = useRouter();
  const [feedback, setFeedback] = useState();

  const notify = (msg, type) =>
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: "items-center",
      type: type,
      autoClose: 1 * 1000,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.BACKEND_URL}feedback/submit`, {
      method: "POST",
      body: new URLSearchParams({ feedback }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedback("");
        notify(data.message, data.status ? "success" : "error");
        router.refresh();
      })
      .catch((error) => {
        setFeedback("");
        notify("提交失败", "error");
        console.error(error);
      });
  };

  return (
    <form className='flex flex-row' onSubmit={handleSubmit}>
      <ToastContainer />
      <input
        required
        type='text'
        id='feedback'
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder='输入sign开启新春活动, 一共四个flag哦 | 感谢您的反馈'
        className='border-none outline-none rounded-md rounded-r-none p-3 shadow-md flex-1 bg-gray-100'
      />
      <button type='submit' className='btn py-3 px-5 rounded-l-none'>
        发送
      </button>
    </form>
  );
}
