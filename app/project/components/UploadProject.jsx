"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BsFillPlusCircleFill } from "react-icons/bs";

function UploadCard({ setIsUpload }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isSubmit, setIsSubmit] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const [form, setForm] = useState({ title: "", details: "", cycleLength: "", date: "" });
  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setProcessingMsg("Processing...");
    for (const item of Object.keys(form)) {
      if (form[item] === "") {
        setProcessingMsg("表单中有未填项");
        console.error("表单中有未填项");
        return;
      }
    }
    fetch(`${process.env.BACKEND_URL}project/add`, {
      method: "POST",
      body: new URLSearchParams(form),
      headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("添加成功");
        } else {
          setProcessingMsg(data.message);
          console.error(data.message);
        }
      })
      .catch((error) => {
        setProcessingMsg("添加失败");
        console.error(error);
      });
  };

  return (
    <div className='frame fixed top-0 left-0 w-screen h-screen bg-black/20 flex items-center justify-center'>
      {isSubmit ? (
        <div className='flex flex-col items-center justify-center gap-4 bg-white p-5 rounded-md'>
          <h1 className='title text-3xl'>{processingMsg}</h1>
          {processingMsg !== "Processing..." && (
            <button
              onClick={() => {
                setIsSubmit(false);
                setIsUpload(false);
                router.refresh();
              }}
              className='btn px-2 py-1'
            >
              确认
            </button>
          )}
        </div>
      ) : (
        <div className='w-full max-w-xs bg-white p-5 rounded-md flex flex-col items-center gap-2'>
          <h1 className='title text-2xl w-fit'>添加项目</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col w-full'>
              <label htmlFor='title' className='text-slate-800'>
                项目名称
              </label>
              <input
                required
                type='text'
                name='title'
                value={form.title}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='cycleLength' className='text-slate-800'>
                单个周期长度
              </label>
              <input
                required
                type='number'
                name='cycleLength'
                value={form.cycleLength}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='date' className='text-slate-800'>
                截止日期
              </label>
              <input
                required
                type='date'
                name='date'
                value={form.date}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='details' className='text-slate-800'>
                项目简介
              </label>
              <textarea
                required
                type='text'
                name='details'
                value={form.details}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='w-full gap-2 flex flex-row items-center justify-between'>
              <button type='button' onClick={() => setIsUpload(false)} className='w-full btn py-2 px-2'>
                取消
              </button>
              <button type='submit' className='w-full btn py-2 px-2'>
                添加
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function UploadProject() {
  const { data: session } = useSession();
  const [isUpload, setIsUpload] = useState(false);

  return (
    <>
      {session && (
        <button
          onClick={() => setIsUpload(true)}
          className='flex flex-row items-center gap-1 text-gray-600 font-bold hover:text-gray-800'
        >
          <h1>添加</h1>
          <BsFillPlusCircleFill />
        </button>
      )}
      {isUpload && <UploadCard setIsUpload={setIsUpload} />}
    </>
  );
}
