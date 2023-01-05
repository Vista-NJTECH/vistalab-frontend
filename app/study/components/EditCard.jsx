"use client";

import { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { Popup } from "../../../components";
import { sidebarData } from "../config";

export default function EditCard({ course, setIsEdit }) {
  const router = useRouter();
  const hiddenImageInput = useRef();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingMsg, setUpploadingMsg] = useState("Processing...");
  const [form, setForm] = useState({
    id: course.id,
    classification: course.classification,
    coursename: course.coursename,
    title: course.title,
    link: course.link,
    studyimg: null,
  });
  const [isDelete, setIsDelete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");

  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDelete = async (id) => {
    setIsProcessing(true);
    setProcessingMsg("Processing...");
    fetch("http://124.223.196.177:8181/study/delete", {
      method: "POST",
      body: new URLSearchParams({ id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("删除成功");
        } else {
          setProcessingMsg("删除失败");
          console.error(data.message);
        }
      })
      .catch((error) => {
        setProcessingMsg("删除失败");
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUpploadingMsg("Processing...");
    const formData = new FormData();
    for (const item of Object.keys(form)) {
      if (form[item] === "") {
        setUpploadingMsg("更新失败");
        console.error("表单中有未填项");
        return;
      }
      formData.append(item, form[item]);
    }
    fetch("http://124.223.196.177:8181/study/update", { method: "POST", body: formData })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setUpploadingMsg("更新成功");
        } else {
          setUpploadingMsg("更新失败");
          console.error(data.message);
        }
      })
      .catch((error) => {
        setUpploadingMsg("更新失败");
        console.error(error);
      });
  };

  return (
    <>
      {isDelete ? (
        <Popup
          before={{
            title: "确认删除",
            cancelFun: () => setIsDelete(false),
            confirmFun: () => handleDelete(course.id),
          }}
          after={{
            isProcessing: isProcessing,
            message: processingMsg,
            confirmFun: () => {
              setIsProcessing(false);
              setIsDelete(false);
              setIsEdit(false);
              router.refresh();
            },
          }}
        />
      ) : (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black/20 flex items-center justify-center'>
          {isUploading ? (
            <div className='flex flex-col items-center justify-center gap-4 bg-white p-5 rounded-md'>
              <h1 className='title text-3xl'>{uploadingMsg}</h1>
              {uploadingMsg !== "Processing..." && (
                <button
                  onClick={() => {
                    setIsEdit(false);
                    router.refresh();
                  }}
                  className='btn px-2 py-1'
                >
                  确认
                </button>
              )}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className='w-full max-w-xs flex flex-col items-center justify-center gap-4 bg-white p-4 rounded-md'
            >
              <div className='flex flex-row items-center'>
                <h1 className='title text-2xl'>更新课程</h1>
                <button onClick={() => setIsDelete(true)} className='text-red-500 hover:text-red-600'>
                  <MdDelete size={20} />
                </button>
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <div className='flex flex-col gap-1 w-full'>
                  <label htmlFor='classification' className='title'>
                    大类
                  </label>
                  <select
                    required
                    value={form.classification}
                    name='classification'
                    onChange={onUpdateInput}
                    className='bg-gray-100 rounded-md p-2 outline-none'
                  >
                    {sidebarData.map((item, index) => (
                      <option value={item.path} key={index}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col gap-1 w-full'>
                  <label htmlFor='coursename' className='title'>
                    小类
                  </label>
                  <input
                    required
                    type='text'
                    maxLength={50}
                    name='coursename'
                    value={form.coursename}
                    onChange={onUpdateInput}
                    className='bg-gray-100 rounded-md p-2 outline-none'
                  />
                </div>

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

                <div className='flex flex-col gap-1 w-full'>
                  <label htmlFor='link' className='title'>
                    链接
                  </label>
                  <input
                    required
                    type='text'
                    maxLength={100}
                    name='link'
                    value={form.link}
                    onChange={onUpdateInput}
                    className='bg-gray-100 rounded-md p-2 outline-none'
                  />
                </div>

                <div className='w-full'>
                  <input
                    type='file'
                    name='studyimg'
                    ref={hiddenImageInput}
                    style={{ display: "none" }}
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.files[0] })}
                  />
                  <button type='button' className='btn px-2 py-1 mb-2' onClick={() => hiddenImageInput.current.click()}>
                    上传预览图片
                  </button>
                  <div className='flex bg-gray-100 rounded-md flex-wrap h-[40px] overflow-y-auto'>
                    {form.studyimg && (
                      <div className='flex flex-row items-center h-fit m-1 py-1 px-2 bg-slate-400 rounded-md'>
                        <div>{form.studyimg.name}</div>
                        <button className='text-green-700' onClick={() => setForm({ ...form, studyimg: null })}>
                          <AiFillCloseCircle />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className='w-full gap-2 flex flex-row items-center justify-between'>
                  <button type='button' onClick={() => setIsEdit(false)} className='w-full btn py-2 px-2'>
                    取消
                  </button>
                  <button type='submit' className='w-full btn py-2 px-2'>
                    上传
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
