import Link from "next/link";
import { GoCheck } from "react-icons/go";
import { AiOutlineStop } from "react-icons/ai";
import { getServerSession } from "next-auth/next";

import { Upload, Download, Delete, Toggle } from "./components";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session)
    return (
      <div className='w-full flex flex-col items-center justify-center gap-3'>
        <h1 className='title text-2xl'>登录后才能查看</h1>
        <Link href={{ pathname: "/login", query: { callbackUrl: "/invoice" } }} className='btn py-2 px-4'>
          Login
        </Link>
      </div>
    );

  const res = await fetch(`${process.env.BACKEND_URL}invoice/getall`, {
    headers: { Authorization: session.user.token },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const invoice = await res.json();

  const projectNames = Object.keys(invoice.data);

  return (
    <div className='frame w-full flex flex-col items-start justify-center gap-5'>
      {projectNames.map((project, index) => (
        <div key={project} className='w-full flex flex-col gap-1'>
          <div className='w-full flex flex-row items-center justify-between'>
            <h1 className='title text-xl'>{project}</h1>
            {index === 0 && <Upload />}
          </div>
          <div className='w-full overflow-x-auto'>
            <table className='w-full text-left border-collapse rounded-md'>
              <thead>
                <tr className='whitespace-nowrap'>
                  <th className='p-2 bg-green-600 text-white'>序号</th>
                  <th className='p-2 bg-green-600 text-white'>名称</th>
                  <th className='p-2 bg-green-600 text-white'>申请人</th>
                  <th className='p-2 bg-green-600 text-white'>类别</th>
                  <th className='p-2 bg-green-600 text-white'>时间</th>
                  <th className='p-2 bg-green-600 text-white'>金额</th>
                  <th className='p-2 bg-green-600 text-white'>备注</th>
                  <th className='p-2 bg-green-600 text-white'>状态</th>
                  <th className='p-2 bg-green-600 text-white'>操作</th>
                </tr>
              </thead>
              <tbody>
                {invoice.data[project].map((item, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 1 && "#f2f2f2" }}>
                    <td className='p-2'>{index + 1}</td>
                    <td className='p-2 max-w-[150px]'>{item.title}</td>
                    <td className='p-2'>{item.applicant}</td>
                    <td className='p-2'>{item.category}</td>
                    <td className='p-2'>{new Date(item.time).toISOString().split("T")[0]}</td>
                    <td className='p-2'>￥{item.amount}</td>
                    <td className='p-2'>{item.remark}</td>
                    <td className={`p-2 ${item.state === 1 ? "text-green-600" : "text-red-600"}`}>
                      {item.state === 1 ? <GoCheck size={20} /> : <AiOutlineStop />}
                    </td>
                    <td className='p-2 flex flex-row items-center'>
                      <Download prefix={invoice.prefix} record={item} />
                      <Toggle record={item} />
                      <Delete record={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
