import Link from "next/link";
import Image from "next/image";

import logo from "../../data/images/logo.png";
import { navbarData } from "./config";

function NavbarCard({ item }) {
  return (
    <Link
      href={item.href}
      className='py-2 px-3 rounded-md font-semibold text-md hover:shadow-md bg-theme-dark text-white duration-500 flex flex-row gap-1 items-center justify-center'
    >
      <span>{item.icon}</span>
      <span>{item.title}</span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <div className='w-full flex flex-row gap-5 items-center justify-between relative px-48 py-4 shadow-md'>
      <div className='text-2xl font-bold text-slate-800 font-serif italic flex flex-row items-end justify-center gap-2'>
        <Image src={logo} width={40} alt='logo' className='w-auto' />
        <h1>Vistalab</h1>
      </div>
      <div className='flex flex-row items-center justify-center gap-4'>
        {navbarData.map((item) => (
          <NavbarCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
