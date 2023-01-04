import Link from "next/link";
import Image from "next/image";

import { navbarData } from "./config";
import logo from "../../data/logo.png";
import MobileNavbar from "./MobileNavbar";
import Login from "./Login";

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

export default function Navbar() {
  return (
    <div className='frame py-3 shadow-md flex flex-row w-full items-center justify-between relative'>
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
        <Login />
      </div>
      <MobileNavbar />
    </div>
  );
}
