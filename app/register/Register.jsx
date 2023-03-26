"use client";

import Link from "next/link";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaUserAlt, FaLock } from "react-icons/fa";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", email: "", code: "", Invitation_code: "vistalab666" });
  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const notify = (msg, type) =>
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: "items-center",
      type: type,
      autoClose: 1 * 1000,
    });

  function sendEmail() {
    fetch(`${process.env.BACKEND_URL}api/ecode`, {
      method: "POST",
      body: new URLSearchParams({ username: form.username, email: form.email }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) notify("发送成功，有效期30分钟", "success");
        else notify("发送失败，请稍后再尝试", "error");
      });
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();

    fetch(`${process.env.BACKEND_URL}api/register`, {
      method: "POST",
      body: new URLSearchParams(form),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) notify("注册成功", "success");
        else notify(result.message, "error");
      });
  };

  return (
    <div className='frame flex flex-col items-center justify-center gap-3 w-full'>
      <ToastContainer />
      <form onSubmit={onSubmitForm} className='flex flex-col w-full md:max-w-xs gap-5 peer'>
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
              id='password'
              type='password'
              name='password'
              placeholder='密码'
              value={form.password}
              onChange={onUpdateInput}
              className='p-4 bg-gray-100 rounded-md outline-none'
            />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='email' className='pl-2 flex flex-row items-center gap-2 text-gray-500 font-semibold'>
              <MdEmail />
              <span>邮箱</span>
            </label>
            <input
              required
              type='email'
              id='email'
              name='email'
              placeholder='邮箱'
              value={form.email}
              onChange={onUpdateInput}
              className='p-4 bg-gray-100 rounded-md outline-none'
            />
          </div>

          <div className='flex flex-col w-full'>
            <label htmlFor='code' className='pl-2 flex flex-row items-center gap-2 text-gray-500 font-semibold'>
              <RiSendPlaneFill />
              <span>验证码</span>
            </label>
            <div className='flex flex-row gap-2'>
              <input
                required
                type='text'
                id='code'
                name='code'
                placeholder='验证码'
                value={form.code}
                onChange={onUpdateInput}
                className='w-full p-4 bg-gray-100 rounded-md outline-none'
              />
              <button
                type='button'
                onClick={sendEmail}
                disabled={form.email === ""}
                className='px-3 rounded-md bg-blue-600 text-white whitespace-nowrap disabled:cursor-not-allowed'
              >
                发送
              </button>
            </div>
          </div>
        </div>

        <button
          disabled={form.username === "" || form.password === "" || form.email === "" || form.code === ""}
          type='submit'
          className='btn w-full py-3 rounded-md peer-invalid:cursor-not-allowed disabled:cursor-not-allowed'
        >
          注册
        </button>
      </form>

      <span>
        已有账号？
        <Link href='/login' className='text-blue-600 hover:underline'>
          去登陆
        </Link>
      </span>
    </div>
  );
}
