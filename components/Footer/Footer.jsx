import Image from "next/image";
import Link from "next/link";
import { FaShareSquare } from "react-icons/fa";

import { footerData } from "./config";
import logo from "../../data/logo.png";

export default function Footer() {
  return (
    <footer className='w-full frame bg-gray-100 flex flex-col gap-20 items-start justify-between'>
      <div className='flex w-full flex-row items-start justify-between'>
        {Object.keys(footerData).map((item1, index1) => (
          <div key={index1} className='flex flex-col gap-5'>
            <h1>{item1}</h1>
            <div className='flex flex-col gap-2'>
              {footerData[item1].map((item2, index2) => (
                <a
                  href={item2.href}
                  key={index2}
                  target='_blank'
                  className='flex flex-row gap-2 items-center text-gray-500 hover:text-gray-700'
                >
                  <h1>{item2.title}</h1>
                  {!item2.isLocal && <FaShareSquare size={12} />}
                </a>
              ))}
            </div>
          </div>
        ))}
        <div className='hidden md:flex flex-col gap-10 items-start'>
          <Link
            href='/'
            className='text-2xl font-bold text-slate-800 font-serif italic flex flex-row items-end justify-center gap-2'
          >
            <Image src={logo} width={40} alt='logo' className='w-auto' />
            <h1>Vistalab</h1>
          </Link>
        </div>
      </div>
      <span>Copyright &copy; {new Date().getFullYear()}. All rights reserved.</span>
    </footer>
  );
}
