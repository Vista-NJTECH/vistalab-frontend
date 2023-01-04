import { FaShare } from "react-icons/fa";

import { footerData } from "./config";

export default function MobileFooter() {
  return (
    <div className='md:hidden flex w-full flex-col items-start justify-between gap-5'>
      {Object.keys(footerData).map((item1, index1) => (
        <div key={index1} className='flex flex-col gap-2 w-full'>
          <h1>{item1}</h1>
          <div className='grid gap-2 grid-cols-2'>
            {footerData[item1].map((item2, index2) => (
              <a
                href={item2.href}
                key={index2}
                target='_blank'
                className='flex flex-row gap-1 items-center text-gray-500 hover:text-gray-700'
              >
                <h1>{item2.title}</h1>
                {!item2.isLocal && <FaShare size={12} />}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
