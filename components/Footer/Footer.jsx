import Image from "next/image";
import Link from "next/link";

import LinkCard from "./LinkCard";
import { footerData } from "./config";
import MobileFooter from "./MobileFooter";
import logo from "../../data/logo.png";

export default function Footer() {
  return (
    <footer className='w-full frame bg-gray-100 flex flex-col gap-10 md:gap-20 items-start justify-between'>
      <div className='hidden md:flex w-full flex-row items-start justify-between'>
        {Object.keys(footerData).map((item1, index1) => (
          <div key={index1} className='flex flex-col gap-5'>
            <h1>{item1}</h1>
            <div className='flex flex-col gap-2'>
              {footerData[item1].map((item2, index2) => (
                <LinkCard item={item2} key={index2} />
              ))}
            </div>
          </div>
        ))}
        <div className='flex flex-col gap-10 items-start'>
          <Link
            href='/'
            className='text-2xl font-bold text-slate-800 font-serif italic flex flex-row items-end justify-center gap-2'
          >
            <Image src={logo} width={40} alt='logo' className='w-auto' />
            <h1>Vistalab</h1>
          </Link>
        </div>
      </div>
      <MobileFooter />
      <div className='flex flex-row gap-2'>
        <span>Copyright &copy; {new Date().getFullYear()}.</span>
        <span>All rights reserved.</span>
        <a href='https://beian.miit.gov.cn/' target='_blank' className='underline hover:text-blue-600'>
          苏ICP备2022012206号-2
        </a>
      </div>
    </footer>
  );
}
