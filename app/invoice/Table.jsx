"use client";

import { BsDot } from "react-icons/bs";
import { ImDownload3 } from "react-icons/im";
import { useEffect, useState } from "react";

import useDownloadFile from "../../lib/useDownloadFile";

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
          <th className='p-2 bg-green-600 text-white'>下载</th>
        </tr>
      </thead>
      <tbody>
        {invoice.data.map((item, index) => (
          <tr key={index} className={index % 2 === 1 ? "bg-gray-100" : ""}>
            <td className='pl-2'>{index}</td>
            <td className='pl-2'>{item.invoicename}</td>
            <td className='pl-2'>{item.applicant}</td>
            <td className='pl-2'>{item.category}</td>
            <td className='pl-2'>{new Date(item.time).toISOString().split("T")[0]}</td>
            <td className='pl-2'>￥{item.amount}</td>
            <td className='pl-2'>{item.remark}</td>
            <td className={`${item.state === 1 ? "text-green-700" : "text-red-600"}`}>{<BsDot size={40} />}</td>
            <td className='pl-2'>
              <button
                onClick={() =>
                  item.path ? useDownloadFile(invoice.prefix + item.path, item.invoicename + ".pdf") : null
                }
                className={`text-gray-700 hover:text-gray-900 ${item.path ? "" : "cursor-not-allowed"}`}
              >
                <ImDownload3 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Table() {
  const [invoice, setInvoice] = useState({ data: [] });
  const [reRetchData, setReFetchData] = useState(false);

  useEffect(() => {
    async function fetchInvoice() {
      fetch(`${process.env.BACKEND_URL}invoice/getall`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) {
            setInvoice(data);
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
      {invoice.data.length === 0 ? (
        <Error title='暂无数据' button={{ title: "Reload", onClick: () => setReFetchData(!reRetchData) }} />
      ) : (
        <InvoiceTable invoice={invoice} />
      )}
    </>
  );
}
