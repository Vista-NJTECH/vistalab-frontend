"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function CredentialsLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const loginError = searchParams.get("error");

  const [form, setForm] = useState({ username: "", password: "" });
  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmitForm = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      username: form.username,
      password: form.password,
      callbackUrl: callbackUrl,
      isFaceLogin: false,
    })
      .then((res) => {
        if (!res.ok) console.error(res.error);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='frame flex flex-col items-center justify-center gap-3 w-full'>
      <form onSubmit={onSubmitForm} className='flex flex-col w-full md:max-w-xs gap-5'>
        <div className='flex flex-col gap-2'>
          {loginError && (
            <h1 className='font-semibold text-center bg-[#EB455F80] border-2 border-[#EB455F] p-1 rounded-md'>
              登录失败
            </h1>
          )}
          <h1 className='title text-3xl text-center'>登录</h1>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='username' className='pl-2 flex flex-row items-center gap-2 text-gray-500 font-semibold'>
              <FaUserAlt />
              <span>用户名</span>
            </label>
            <input
              required
              type='text'
              name='username'
              placeholder='用户名'
              value={form.username}
              onChange={onUpdateInput}
              className='p-4 bg-gray-100 rounded-md outline-none'
            />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='password' className='pl-2 flex flex-row items-center gap-2 text-gray-500 font-semibold'>
              <FaLock />
              <span>密码</span>
            </label>
            <input
              required
              type='password'
              name='password'
              placeholder='密码'
              value={form.password}
              onChange={onUpdateInput}
              className='p-4 bg-gray-100 rounded-md outline-none'
            />
          </div>
        </div>
        <button type='submit' className='btn w-full py-3 rounded-md'>
          登录
        </button>
      </form>
      <div className='text-sm flex flex-row gap-3'>
        <span>
          没有账号？
          <Link href='/register' className='text-blue-600 hover:underline'>
            去注册
          </Link>
        </span>
        |
        <span>
          试试新技术？
          <Link href='/login/face' className='text-sm text-theme hover:underline'>
            人脸识别登录
          </Link>
        </span>
      </div>
    </div>
  );
}
