"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { BsFillPlusCircleFill } from "react-icons/bs";

import Upload from "./Upload";
import InvoiceTable from "./InvoiceTable";
import { useInvoiceStateContext } from "./InvoiceContextProvider";

function Error({ title, button }) {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <h1 className='title text-2xl'>{title}</h1>
      <button type='button' className='btn py-2 px-4' onClick={button.onClick}>
        {button.title}
      </button>
    </div>
  );
}

export default function Table() {
  const router = useRouter();
  const { data: session } = useSession();
  const { invoice } = useInvoiceStateContext();
  const [isUpload, setIsUpload] = useState(false);

  return (
    <>
      {!session ? (
        <Error title='登录后才能查看' button={{ title: "Login", onClick: () => signIn() }} />
      ) : invoice.data.length === 0 ? (
        <Error title='暂无数据' button={{ title: "Reload", onClick: () => router.refresh() }} />
      ) : (
        <div className='w-full flex flex-col items-end gap-1'>
          <button
            onClick={() => setIsUpload(true)}
            className='flex flex-row items-center gap-1 text-gray-600 font-bold hover:text-gray-800'
          >
            <h1>添加</h1>
            <BsFillPlusCircleFill />
          </button>
          <InvoiceTable />
          {isUpload && <Upload setIsUpload={setIsUpload} />}
        </div>
      )}
    </>
  );
}
