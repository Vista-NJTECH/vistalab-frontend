"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStateContext } from "../../Provider/Provider";

export default function Avatar() {
  const { data: session } = useSession();
  const { avatarUrl } = useStateContext();
  const [onlinePlayers, setOnlinePlayers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mcapi.us/server/status?ip=mc.vistalab.top");
        const data = await response.json();
        if (data && data.players) {
          console.log("Online players:", data.players.online);
          setOnlinePlayers(data.players.now);
        }
      } catch (error) {
        console.error("Error fetching Minecraft server data:", error);
      }
    };
  
    fetchData();
  }, []);

  
  if (session) {
    return (
      <div className='flex flex-row items-center'>
      <div className='flex flex-row gap-1 items-center relative group'>
        <Image
          width={240}
          height={240}
          alt='avatar'
          src={avatarUrl}
          className='w-8 h-8 object-cover object-center rounded-full cursor-pointer'
        />
        <div className='flex absolute -left-12 top-8 w-32 flex-col items-center gap-2 bg-white shadow-md p-3 rounded-md -z-10 -translate-y-5 origin-top scale-y-0 group-hover:translate-y-0 group-hover:scale-y-100 duration-300'>
          <h1 className='text-gray-700'>Hello, {session.user.nickname}</h1>
          <div className='w-full h-[1.5px] bg-gray-200'></div>
          <Link href='/profile' className='text-gray-500 hover:text-gray-800'>
            用户中心
          </Link>
          <div className='w-full h-[1.5px] bg-gray-200'></div>
          <button type='button' onClick={() => signOut()} className='btn w-full py-1'>
            退出
          </button>
        </div>
      </div>
      <span className='inline-block w-2 h-2 rounded-full bg-green-500 ml-2'></span>
    <p className='text-black-500 text-sm'>MC ONLINE: {onlinePlayers !== null ? onlinePlayers : 'Loading···'}</p>
      </div>
    );
  }
  return (
    <div className='flex flex-row items-center'>
    <button type='button' onClick={() => signIn()} className='btn text-base px-3 py-1 w-fit'>
      登录
    </button>
    <span className='inline-block w-2 h-2 rounded-full bg-green-500 ml-2'></span>
    <p className='text-black-500 text-sm'>MC ONLINE: {onlinePlayers !== null ? onlinePlayers : 'Loading···'}</p>
    </div>
  );
}
