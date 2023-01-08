import Link from "next/link";
import Image from "next/image";

import logo from "../../../data/logo.png";
import Avatar from "./Avatar";
import { navbarData } from "../config";

function NavbarCard({ item }) {
  return (
    <Link
      href={item.href}
      className='font-semibold text-md rounded-md text-slate-700 hover:text-theme duration-300 flex flex-row gap-1 items-center justify-center'
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
      <div className='hidden lg:flex flex-row items-center justify-center gap-3'>
        {navbarData.map((item, index) => (
          <NavbarCard key={index} item={item} />
        ))}
        <Avatar />
      </div>
    </>
  );
}
