"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { signIn } from "next-auth/react";

export default function Page() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ username: "", password: "" });
  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const callbackUrl = searchParams.get("callbackUrl");
    await signIn("credentials", {
      username: form.username,
      password: form.password,
      callbackUrl: callbackUrl || "/",
    });
  };

  return (
    <div className='frame flex flex-col items-center justify-center w-full'>
      <form onSubmit={onSubmitForm} className='flex flex-col w-full md:w-[400px] gap-5'>
        <div className='title text-3xl text-center'>
          <h1>请先登录</h1>
        </div>
        <div className='flex flex-col w-full gap-1'>
          <label htmlFor='password' className='pl-2 flex flex-row items-center gap-2 text-slate-700'>
            <FaUserAlt />
            <span className='text-gray-500 font-semibold'>用户名</span>
          </label>
          <input
            required
            type='text'
            name='username'
            placeholder='用户名'
            maxLength={100}
            value={form.username}
            onChange={onUpdateInput}
            className='p-4 bg-slate-100 rounded-xl outline-none'
          />
        </div>
        <div className='flex flex-col w-full'>
          <label htmlFor='password' className='pl-2 flex flex-row items-center gap-2'>
            <FaLock />
            <span className='text-gray-500 font-semibold'>密码</span>
          </label>
          <input
            required
            type='password'
            name='password'
            placeholder='密码'
            maxLength={100}
            value={form.password}
            onChange={onUpdateInput}
            className='p-4 bg-slate-100 rounded-xl outline-none'
          />
        </div>
        <div className='w-full text-center pt-3'>
          <button className='btn w-full py-3 rounded-xl'>登录</button>
        </div>
      </form>
    </div>
  );
}
