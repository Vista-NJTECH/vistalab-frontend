"use client";

import Webcam from "react-webcam";
import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

export default function FaceLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const videoConstraints = { width: 500, height: 400, facingMode: "user" };

  const [picture, setPicture] = useState(null);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(async () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  });

  const notify = (msg, type) =>
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: "items-center",
      type: type,
      autoClose: 1 * 1000,
    });

  const varify = React.useCallback(async (image) => {
    notify("登录中...", "loading");

    const binaryString = atob(image.split(",")[1]);
    const array = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      array[i] = binaryString.charCodeAt(i);
    }
    const file = new File([array.buffer], "face.jpg", { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${process.env.BACKEND_URL}api/facelogin`, { method: "POST", body: formData });
    const data = await res.json();

    if (data.status) {
      notify("登录成功", "success");
      signIn("credentials", {
        username: data.userinfo.username,
        nickname: data.userinfo.name,
        email: data.userinfo.email,
        level: data.userinfo.level,
        group: data.userinfo.p_group,
        created_time: data.userinfo.created_time,
        avatar: data.userinfo.avatar,
        token: data.token,

        password: "",
        isFaceLogin: true,
        callbackUrl: callbackUrl || "/",
      })
        .then((res) => {
          if (!res.ok) console.error(res.error);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      notify("登陆失败", "error");
    }
  });

  return (
    <div className='frame w-full flex flex-col items-center gap-3'>
      <ToastContainer />
      <h2 className='title text-2xl w-fit'>人脸识别登录，抓取人脸登录</h2>
      <>
        {picture === null ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
              className='rounded-md'
            />

            <button
              onClick={() => {
                capture();
              }}
              className='btn py-2 px-4 rounded-md'
            >
              抓取人脸
            </button>
          </>
        ) : (
          <>
            <Image
              src={picture}
              alt='profile-image'
              width={videoConstraints.width}
              height={videoConstraints.height}
              className='rounded-md'
            />
            <div className='flex flex-row gap-3'>
              <button
                onClick={() => {
                  setPicture(null);
                }}
                className='btn py-2 px-4 rounded-md'
              >
                重新抓取
              </button>
              <button
                onClick={() => {
                  varify(picture);
                }}
                className='btn py-2 px-4 rounded-md'
              >
                上传验证
              </button>
            </div>
          </>
        )}
      </>
      <Link href='/login' className='text-sm text-theme hover:underline'>
        密码登录
      </Link>
    </div>
  );
}
