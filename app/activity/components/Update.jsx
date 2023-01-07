"use client";

import { useState, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSession, signIn } from "next-auth/react";

function UpdateCard({ activity, setIsUpdate }) {
  const router = useRouter();
  const hiddenFileInput = useRef();

  const [isSubmit, setIsSubmit] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("Processing...");

  const [form, setForm] = useState({
    id: activity.id,
    title: activity.title,
    date: new Date(activity.date).toISOString().split("T")[0],
    img: null,
    detail: activity.detail,
  });

  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setSubmitMsg("Processing...");
    const formData = new FormData();
    for (const item of Object.keys(form)) {
      if (form[item] === "") {
        setSubmitMsg("更新失败");
        console.error("表单中有未填项");
        return;
      }
      formData.append(item, form[item]);
    }
    fetch(`${process.env.BACKEND_URL}activity/update`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setSubmitMsg("更新成功");
        } else {
          setSubmitMsg("更新失败");
          console.error(data.message);
        }
        router.refresh();
      })
      .catch((error) => {
        setSubmitMsg("更新失败");
        console.error(error);
      });
  };

  return (
    <div className='frame fixed top-0 left-0 w-screen h-screen bg-black/20 flex items-center justify-center'>
      {isSubmit ? (
        <div className='flex flex-col items-center justify-center gap-4 bg-white p-5 rounded-md'>
          <h1 className='title text-3xl'>{submitMsg}</h1>
          {submitMsg !== "Processing..." && (
            <button
              onClick={() => {
                setIsSubmit(false);
                setIsUpdate(false);
              }}
              className='btn px-2 py-1'
            >
              确认
            </button>
          )}
        </div>
      ) : (
        <div className='w-full max-w-xs bg-white p-5 rounded-md flex flex-col items-center gap-2'>
          <h1 className='title text-2xl w-fit'>添加动态</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-full'>
            <div className='flex flex-col w-full gap-1'>
              <label htmlFor='title' className='title'>
                标题
              </label>
              <input
                required
                type='text'
                maxLength={50}
                name='title'
                value={form.title}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full gap-1'>
              <label htmlFor='date' className='title'>
                活动时间
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

            <div className='w-full'>
              <input
                type='file'
                name='img'
                ref={hiddenFileInput}
                style={{ display: "none" }}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.files[0] })}
              />
              <button type='button' className='btn px-2 py-1 mb-1' onClick={() => hiddenFileInput.current.click()}>
                上传活动照片
              </button>
              <div className='flex bg-gray-100 rounded-md flex-wrap min-h-[40px] max-h-[64px] overflow-y-auto'>
                {form.img && (
                  <div className='flex flex-row items-center h-fit m-1 py-1 px-2 bg-slate-400 rounded-md'>
                    <div>{form.img.name}</div>
                    <button className='text-green-700' onClick={() => setForm({ ...form, img: null })}>
                      <AiFillCloseCircle />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col w-full gap-1'>
              <label htmlFor='detail' className='title'>
                详细内容
              </label>
              <textarea
                required
                type='text'
                maxLength={50}
                name='detail'
                value={form.detail}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='w-full gap-2 flex flex-row items-center justify-between'>
              <button type='button' onClick={() => setIsUpdate(false)} className='w-full btn py-2 px-2'>
                取消
              </button>
              <button type='submit' className='w-full btn py-2 px-2'>
                更新
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function Update({ activity }) {
  const { data: session } = useSession();
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <>
      <button onClick={() => (session ? setIsUpdate(true) : signIn())} className='text-gray-600 hover:text-gray-800'>
        <FaEdit size={17} />
      </button>
      {isUpdate && <UpdateCard activity={activity} setIsUpdate={setIsUpdate} />}
    </>
  );
}
