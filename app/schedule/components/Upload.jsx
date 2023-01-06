"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { taskImportance } from "../config";

export default function Upload({ setIsUpload }) {
  const router = useRouter();

  const [isSubmit, setIsSubmit] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("Processing...");

  const [form, setForm] = useState({ title: "", date: "", level: "", group: "", host: "", persons: "", detail: "" });
  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setSubmitMsg("Processing...");
    for (const item of Object.keys(form)) {
      if (form[item] === "") {
        setSubmitMsg("添加失败");
        console.error("表单中有未填项");
        return;
      }
    }
    fetch(`${process.env.BACKEND_URL}schedule/add`, {
      method: "POST",
      body: new URLSearchParams(form),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setSubmitMsg("添加成功");
        } else {
          setSubmitMsg("添加失败");
          console.error(data.message);
        }
        router.refresh();
      })
      .catch((error) => {
        setSubmitMsg("添加失败");
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
                setIsUpload(false);
              }}
              className='btn px-2 py-1'
            >
              确认
            </button>
          )}
        </div>
      ) : (
        <div className='w-full max-w-xs bg-white p-5 rounded-md flex flex-col items-center gap-2'>
          <h1 className='title text-2xl w-fit'>添加日程</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-1 w-full'>
            <div className='flex flex-col w-full'>
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

            <div className='flex flex-col w-full'>
              <label htmlFor='host' className='title'>
                负责人
              </label>
              <input
                required
                type='text'
                maxLength={50}
                name='host'
                value={form.host}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='persons' className='title'>
                参与人员
              </label>
              <input
                required
                type='text'
                maxLength={50}
                name='persons'
                value={form.persons}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='date' className='title'>
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
              <label htmlFor='level' className='title'>
                紧急程度
              </label>
              <select
                required
                name='level'
                defaultValue
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              >
                <option disabled value>
                  -- select an option --
                </option>
                {Object.keys(taskImportance).map((item, index) => (
                  <option value={item} key={index}>
                    {taskImportance[item].title}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='group' className='title'>
                访问权限
              </label>
              <select
                required
                name='group'
                defaultValue
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              >
                <option disabled value>
                  -- select an option --
                </option>
                <option value='all'>所有人</option>
                <option value='admin'>管理员</option>
              </select>
            </div>

            <div className='flex flex-col w-full'>
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
              <button type='button' onClick={() => setIsUpload(false)} className='w-full btn py-2 px-2'>
                取消
              </button>
              <button type='submit' className='w-full btn py-2 px-2'>
                上传
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
