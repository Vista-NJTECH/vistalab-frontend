import { GoCheck } from "react-icons/go";
import { AiOutlineStop } from "react-icons/ai";

import Operation from "./Operation";
import { useInvoiceStateContext } from "./InvoiceContextProvider";

export default function InvoiceTable() {
  const { invoice } = useInvoiceStateContext();

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
          <th className='p-2 bg-green-600 text-white'>操作</th>
        </tr>
      </thead>
      <tbody>
        {invoice.data.map((item, index) => (
          <tr key={index} className={`${index % 2 === 1 ? "bg-gray-100" : ""}`}>
            <td className='p-2'>{index}</td>
            <td className='p-2'>{item.title}</td>
            <td className='p-2'>{item.applicant}</td>
            <td className='p-2'>{item.category}</td>
            <td className='p-2'>{new Date(item.time).toISOString().split("T")[0]}</td>
            <td className='p-2'>￥{item.amount}</td>
            <td className='p-2'>{item.remark}</td>
            <td className={`p-2 ${item.state === 1 ? "text-green-600" : "text-red-600"}`}>
              {item.state === 1 ? <GoCheck size={20} /> : <AiOutlineStop />}
            </td>
            <Operation record={item} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
