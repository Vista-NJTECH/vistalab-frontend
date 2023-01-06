"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

import InvoiceTable from "./InvoiceTable";

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
  const [invoice, setInvoice] = useState({ data: [] });
  const [reRetchData, setReFetchData] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    async function fetchInvoice(token) {
      fetch(`${process.env.BACKEND_URL}invoice/getall`, {
        headers: { Authorization: token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status) setInvoice(data);
          else console.error(data.message);
        })
        .catch((error) => console.error(error));
    }
    if (session) fetchInvoice(session.user.token);
  }, [reRetchData]);

  return (
    <>
      {!session ? (
        <Error title='登录后才能查看' button={{ title: "Login", onClick: () => signIn() }} />
      ) : invoice.data.length === 0 ? (
        <Error title='暂无数据' button={{ title: "Reload", onClick: () => setReFetchData(!reRetchData) }} />
      ) : (
        <InvoiceTable invoice={invoice} />
      )}
    </>
  );
}
