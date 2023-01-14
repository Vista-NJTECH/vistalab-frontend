"use client";

import Image from "next/image";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { useStateContext } from "../../components";
import "react-toastify/dist/ReactToastify.css";

export default function Avatar() {
  const hiddenFileInput = useRef();

  const { avatarUrl, setAvatarUrl } = useStateContext();
  const { data: session } = useSession();

  function notify(msg, type) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: "items-center",
      type: type,
      autoClose: 1 * 1000,
    });
  }

  async function handleUpload(e) {
    if (!e.target.files[0]) return;
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    await fetch(`${process.env.BACKEND_URL}my/updateavatar`, {
      method: "POST",
      body: formData,
      headers: { Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          notify("头像更新成功", "success");
          setAvatarUrl(data.url);
        } else {
          notify("头像更新失败", "error");
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        notify("头像更新失败", "error");
      });
  }

  return (
    <div className='group relative w-fit'>
      <ToastContainer />
      <Image
        width={240}
        height={240}
        src={avatarUrl}
        alt='avatar'
        className='w-40 h-40 object-cover object-center rounded-full cursor-pointer'
      />
      <input type='file' name='avatar' ref={hiddenFileInput} style={{ display: "none" }} onChange={handleUpload} />
      <button
        type='button'
        onClick={() => hiddenFileInput.current.click()}
        className='scale-0 group-hover:scale-100 group-hover:translate-x-3 group-hover:-translate-y-3 duration-200 absolute right-3 top-3 p-2 bg-black/80 hover:bg-black/60 text-white rounded-full'
      >
        <AiOutlineCloudUpload size={20} />
      </button>
    </div>
  );
}
