"use client";

import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { AiFillCloseCircle } from "react-icons/ai";

import { useInvoiceStateContext } from "./InvoiceContextProvider";

export default function Upload({ setIsUpload }) {
  const hiddenFileInput = useRef();

  const { data: session } = useSession();
  const { fetchInvoice } = useInvoiceStateContext();

  const [isSubmit, setIsSubmit] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("Processing...");

  const [form, setForm] = useState({ title: "", category: "", pdfile: null, remark: "" });
  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setSubmitMsg("Processing...");
    const formData = new FormData();
    for (const item of Object.keys(form)) {
      if (form[item] === "" || form[item] === null) {
        setSubmitMsg("添加失败");
        console.error("表单中有未填项");
        return;
      }
      formData.append(item, form[item]);
    }
    fetch(`${process.env.BACKEND_URL}invoice/add`, {
      method: "POST",
      body: formData,
      headers: { Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setSubmitMsg("添加成功");
        } else {
          setSubmitMsg("添加失败");
          console.error(data.message);
        }
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
                fetchInvoice();
              }}
              className='btn px-2 py-1'
            >
              确认
            </button>
          )}
        </div>
      ) : (
        <div className='w-full max-w-xs bg-white p-5 rounded-md flex flex-col items-center gap-2'>
          <h1 className='title text-2xl w-fit'>添加发票</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full'>
            <div className='flex flex-col gap-1 w-full'>
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
              <label htmlFor='category' className='title'>
                类别
              </label>
              <select
                required
                name='category'
                defaultValue
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              >
                <option disabled value>
                  -- select an option --
                </option>
                <option value='固定设备'>固定设备</option>
                <option value='一般器材'>一般器材</option>
                <option value='损耗器材'>损耗器材</option>
              </select>
            </div>

            <div className='w-full'>
              <input
                type='file'
                name='pdfile'
                ref={hiddenFileInput}
                style={{ display: "none" }}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.files[0] })}
              />
              <button type='button' className='btn px-2 py-1 mb-1' onClick={() => hiddenFileInput.current.click()}>
                上传发票PDF文件
              </button>
              <div className='flex bg-gray-100 rounded-md flex-wrap min-h-[40px] max-h-[64px] overflow-y-auto'>
                {form.pdfile && form.pdfile.name.endsWith(".pdf") && (
                  <div className='flex flex-row items-center h-fit m-1 py-1 px-2 bg-slate-400 rounded-md'>
                    <div>{form.pdfile.name}</div>
                    <button className='text-green-700' onClick={() => setForm({ ...form, pdfile: null })}>
                      <AiFillCloseCircle />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='remark' className='title'>
                备注
              </label>
              <textarea
                required
                type='text'
                maxLength={50}
                name='remark'
                value={form.remark}
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
