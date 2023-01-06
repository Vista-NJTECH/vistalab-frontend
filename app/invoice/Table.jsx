"use client";

import { BsDot } from "react-icons/bs";
import { useEffect, useState } from "react";

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

function InvoiceTable({ invoice }) {
  return (
    <table className='w-full text-left border-collapse rounded-md'>
      <thead>
        <tr className='whitespace-nowrap'>
          <th className='p-2 bg-green-600 text-white'>序号</th>
          <th className='p-2 bg-green-600 text-white'>名称</th>
          <th className='p-2 bg-green-600 text-white'>申请人</th>
          <th className='p-2 bg-green-600 text-white'>类别</th>
          <th className='p-2 bg-green-600 text-white'>时间</th>
          <th className='p-2 bg-green-600 text-white'>价格</th>
          <th className='p-2 bg-green-600 text-white'>备注</th>
          <th className='p-2 bg-green-600 text-white'>状态</th>
        </tr>
      </thead>
      <tbody>
        {invoice.map((item, index) => (
          <tr key={index} className={index % 2 === 1 ? "bg-gray-100" : ""}>
            <td className='p-2'>{index}</td>
            <td className='p-2'>{item.invoicename}</td>
            <td className='p-2'>{item.applicant}</td>
            <td className='p-2'>{item.category}</td>
            <td className='p-2'>{new Date(item.time).toISOString().split("T")[0]}</td>
            <td className='p-2'>￥{item.amount}</td>
            <td className='p-2'>{item.remark}</td>
            <td className={`${item.state === 1 ? "text-green-700" : "text-red-600"}`}>{<BsDot size={40} />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Table() {
  const [invoice, setInvoice] = useState([]);
  const [reRetchData, setReFetchData] = useState(false);

  useEffect(() => {
    async function fetchInvoice() {
      fetch(`${process.env.BACKEND_URL}invoice/getall`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setInvoice(data.data);
          } else {
            console.error(data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchInvoice();
  }, [reRetchData]);

  return (
    <>
      {invoice.length === 0 ? (
        <Error title='暂无数据' button={{ title: "Reload", onClick: () => setReFetchData(!reRetchData) }} />
      ) : (
        <InvoiceTable invoice={invoice} />
      )}
    </>
  );
}
