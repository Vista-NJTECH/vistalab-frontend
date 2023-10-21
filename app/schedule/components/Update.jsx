"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { taskImportance } from "../config";

function UpdateCard({ schedule, setIsUpdate }) {
  const router = useRouter();

  const [isSubmit, setIsSubmit] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const [form, setForm] = useState({
    id: schedule.id,
    title: schedule.title,
    date: new Date(schedule.date).toISOString().split("T")[0],
    level: schedule.level,
    group: schedule.group,
    host: schedule.host,
    persons: schedule.persons,
    detail: schedule.detail,
  });

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
    fetch(`${process.env.BACKEND_URL}schedule/update`, {
      method: "POST",
      body: new URLSearchParams(form),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("更新成功");
        } else {
          setProcessingMsg(data.message);
          console.error(data.message);
        }
      })
      .catch((error) => {
        setProcessingMsg("更新失败");
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
                setIsUpdate(false);
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
          <h1 className='title text-2xl w-fit'>更新日程</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-1 w-full'>
            <div className='flex flex-col w-full'>
              <label htmlFor='title' className='text-slate-800'>
                标题
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
              <label htmlFor='host' className='text-slate-800'>
                负责人
              </label>
              <input
                required
                type='text'
                name='host'
                value={form.host}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='persons' className='text-slate-800'>
                参与人员
              </label>
              <input
                required
                type='text'
                name='persons'
                value={form.persons}
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
              <label htmlFor='level' className='text-slate-800'>
                紧急程度
              </label>
              <select
                required
                name='level'
                value={form.level}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              >
                {Object.keys(taskImportance).map((item, index) => (
                  <option value={item} key={index}>
                    {taskImportance[item].title}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='group' className='text-slate-800'>
                访问权限
              </label>
              <select
                required
                name='group'
                value={form.group}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              >
                <option value='all'>所有人</option>
                <option value='admin'>管理员</option>
              </select>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='detail' className='text-slate-800'>
                详细内容
              </label>
              <textarea
                required
                type='text'
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

export default function Update({ schedule }) {
  const { data: session } = useSession();
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <>
      {session && (
        <button onClick={() => setIsUpdate(true)} className='text-gray-600 hover:text-gray-900'>
          <FaEdit size={17} />
        </button>
      )}
      {isUpdate && <UpdateCard schedule={schedule} setIsUpdate={setIsUpdate} />}
    </>
  );
}
