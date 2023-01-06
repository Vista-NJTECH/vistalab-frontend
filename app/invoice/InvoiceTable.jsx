import { BsDot } from "react-icons/bs";
import { ImDownload3 } from "react-icons/im";

import useDownloadFile from "../../lib/useDownloadFile";

export default function InvoiceTable({ invoice }) {
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
