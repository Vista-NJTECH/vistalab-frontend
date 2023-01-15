"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Popup } from "../../../components";

function ToggleCard({ record, isToggle, setIsToggle }) {
  const router = useRouter();
  const { data: session } = useSession();

  const notify = (msg, type) =>
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: "items-center",
      type: type,
      autoClose: 1 * 1000,
    });

  const handleToggle = async (id) => {
    fetch(`${process.env.BACKEND_URL}invoice/unstate`, {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          notify("更新成功", "success");
          router.refresh();
        } else {
          notify(data.message, "error");
          console.error(data.message);
        }
        setIsToggle(false);
      })
      .catch((error) => {
        notify("更新失败", "error");
        console.error(error);
        setIsToggle(false);
      });
  };

  return (
    <>
      {isToggle && (
        <Popup
          title={`确认更新 '${record.title}'`}
          cancelFun={() => setIsToggle(false)}
          confirmFun={() => handleToggle(record.id)}
        />
      )}
    </>
  );
}

export default function Toggle({ record }) {
  const { data: session } = useSession();
  const [isToggle, setIsToggle] = useState(false);

  return (
    <>
      <ToastContainer />
      {session && (
        <button onClick={() => setIsToggle(true)} className='text-gray-700 hover:text-gray-900 mx-1'>
          {record.state === 1 ? <FaToggleOn /> : <FaToggleOff />}
        </button>
      )}
      {isToggle && <ToggleCard record={record} isToggle={isToggle} setIsToggle={setIsToggle} />}
    </>
  );
}
