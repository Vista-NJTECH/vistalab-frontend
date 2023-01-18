"use client";

import { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useSession, signIn } from "next-auth/react";

import { sidebarData } from "../config";
import { useStudyStateContext } from "./StudyContextProvider";

function UploadCard({ setIsUpload }) {
  const hiddenImageInput = useRef();
  const { data: session } = useSession();
  const { refreshData, setRefreshData } = useStudyStateContext();
  const [showSelect, toggleInput] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [processingMsg, setProcessingMsg] = useState("Processing...");
  const [form, setForm] = useState({ classification: "", coursename: "", title: "", link: "", studyimg: null });

  const onUpdateInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setProcessingMsg("Processing...");
    const formData = new FormData();
    if (form.studyimg === null) delete form.studyimg;
    for (const item of Object.keys(form)) {
      if (form[item] === "") {
        setProcessingMsg("表单中有未填项");
        console.error("表单中有未填项");
        return;
      }
      formData.append(item, form[item]);
    }
    fetch(`${process.env.BACKEND_URL}study/add`, {
      method: "POST",
      body: formData,
      headers: { Authorization: session.user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setProcessingMsg("上传成功");
        } else {
          setProcessingMsg(data.message);
          console.error(data.message);
        }
      })
      .catch((error) => {
        setProcessingMsg("上传失败");
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
                setRefreshData(!refreshData);
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
          <h1 className='title text-2xl'>添加新课程</h1>
          <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col gap-1 w-full'>
              <label htmlFor='classification' className='text-slate-800'>
                大类
              </label>
              <div className="flex">
                <select
                  required
                  defaultValue={sidebarData[0].path}
                  name='classification'
                  onChange={onUpdateInput}
                  className='bg-gray-100 rounded-md p-2 outline-none mr-2'
                  style={{display: showSelect ? "block" : "none"}}
                >
                  <option disabled value>
                    --请选择--
                  </option>
                  {sidebarData.map((item, index) => (
                    <option value={item.path} key={index}>
                      {item.title}
                    </option>
                  ))}
                </select>
                <button onClick={() => toggleInput(false)}>自定义</button>
              </div>
              <input
                type="text"
                placeholder="请输入大类"
                className="bg-gray-100 rounded-md p-2 outline-none"
                name='classification'
                onChange={onUpdateInput}
                style={{display: showSelect ? "none" : "block"}}
              />
            </div>

            <div className='flex flex-col gap-1 w-full'>
              <label htmlFor='coursename' className='text-slate-800'>
                小类
              </label>
              <input
                required
                type='text'
                name='coursename'
                value={form.coursename}
                onChange={onUpdateInput}
                className='bg-gray-100 rounded-md p-2 outline-none'
              />
            </div>

            <div className='flex flex-col gap-1 w-full'>
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

            <div className='flex flex-col gap-1 w-full'>
              <label htmlFor='link' className='text-slate-800'>
                链接
              </label>
              <input
                required
                type='text'
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
              <button type='button' onClick={() => setIsUpload(false)} className='w-full btn py-2 px-2'>
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
  );
}

export default function Upload() {
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
