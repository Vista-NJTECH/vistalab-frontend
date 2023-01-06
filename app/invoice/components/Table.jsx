"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

  return (
    <>
      {!session ? (
        <Error title='登录后才能查看' button={{ title: "Login", onClick: () => signIn() }} />
      ) : invoice.data.length === 0 ? (
        <Error title='暂无数据' button={{ title: "Reload", onClick: () => router.refresh() }} />
      ) : (
        <InvoiceTable />
      )}
    </>
  );
}
