import { useState } from "react";
import { ImDownload3 } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";

import useDownloadFile from "../../../lib/useDownloadFile";
import Delete from "./Delete";
import { useInvoiceStateContext } from "./InvoiceContextProvider";

export default function Operation({ record }) {
  const [isDelete, setIsDelete] = useState(false);
  const { invoice } = useInvoiceStateContext();

  return (
    <td className='p-2'>
      <button
        onClick={() => (record.path ? useDownloadFile(invoice.prefix + record.path, record.title + ".pdf") : null)}
        className={`text-gray-700 hover:text-gray-900 ${record.path ? "" : "cursor-not-allowed"}`}
      >
        <ImDownload3 />
      </button>
      <button onClick={() => setIsDelete(true)} className='text-gray-700 hover:text-gray-900 mx-1'>
        <MdDelete />
      </button>
      <button className='text-gray-700 hover:text-gray-900'>
        {record.state === 1 ? <FaToggleOn /> : <FaToggleOff />}
      </button>
      {isDelete && <Delete record={record} isDelete={isDelete} setIsDelete={setIsDelete} />}
    </td>
  );
}
