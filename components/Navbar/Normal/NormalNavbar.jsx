import Link from "next/link";
import Image from "next/image";
import { AiFillCaretDown } from "react-icons/ai";

import logo from "../../../data/logo.png";
import Avatar from "./Avatar";
import { navbarData } from "../config";

function NavbarCard({ item }) {
  if (item.subMenu) {
    return (
      <div className='cursor-pointer whitespace-nowrap font-semibold text-md text-slate-700 hover:text-theme duration-300 flex flex-row gap-1 items-center justify-center'>
        <span>{item.icon}</span>
        <span>{item.title}</span>
        <AiFillCaretDown />
      </div>
    );
  }
  return (
    <Link
      href={item.href}
      className='whitespace-nowrap font-semibold text-md text-slate-700 hover:text-theme duration-300 flex flex-row gap-1 items-center justify-center'
    >
      <span>{item.icon}</span>
      <span>{item.title}</span>
    </Link>
  );
}

export default function NormalNavbar() {
  return (
    <>
      <Link
        href='/'
        className='text-2xl font-bold text-slate-800 font-serif italic flex flex-row items-end justify-center gap-2'
      >
        <Image src={logo} width={40} alt='logo' className='w-auto' />
        <h1>Vistalab</h1>
      </Link>
      <div className='hidden lg:flex flex-row items-center justify-center gap-2'>
        {navbarData.map((item1, index1) => (
          <div key={index1} className='relative group'>
            <NavbarCard item={item1} />
            {item1.subMenu && (
              <div className='-translate-y-4 delay-100 scale-y-0 group-hover:translate-y-0 group-hover:scale-y-100 duration-300 origin-top transform-gpu -z-10 absolute top-6 -left-3 flex flex-col items-start gap-1 bg-white p-3 rounded-md shadow-md'>
                {item1.subMenu.map((item2, index2) => (
                  <NavbarCard key={index2} item={item2} />
                ))}
              </div>
            )}
          </div>
        ))}
        <Avatar />
      </div>
    </>
  );
}
