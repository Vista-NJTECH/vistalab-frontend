"use client";

import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Popup } from "../../../components";

function DeleteCard({ schedule, isDelete, setIsDelete }) {
  const router = useRouter();

  const notify = (msg, type) =>
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: "items-center",
      type: type,
      autoClose: 1 * 1000,
    });

  const handleDelete = async (id) => {
    fetch(`${process.env.BACKEND_URL}schedule/delete`, {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          notify("删除成功", "success");
          router.refresh();
        } else {
          notify(data.message, "error");
          console.error(data.message);
        }
        setIsDelete(false);
      })
      .catch((error) => {
        notify("删除失败", "error");
        console.error(error);
        setIsDelete(false);
      });
  };

  return (
    <>
      {isDelete && (
        <Popup
          title={`确认删除 '${schedule.title}'`}
          cancelFun={() => setIsDelete(false)}
          confirmFun={() => handleDelete(schedule.id)}
        />
      )}
    </>
  );
}

export default function Delete({ schedule }) {
  const { data: session } = useSession();
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <ToastContainer />
      {session && (
        <button onClick={() => setIsDelete(true)}>
          <MdDelete size={18} />
        </button>
      )}
      {isDelete && <DeleteCard schedule={schedule} isDelete={isDelete} setIsDelete={setIsDelete} />}
    </>
  );
}
