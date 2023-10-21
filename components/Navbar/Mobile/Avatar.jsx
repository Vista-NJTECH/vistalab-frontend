"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStateContext } from "../../Provider/Provider";

export default function Login() {
  const { data: session } = useSession();
  const { avatarUrl } = useStateContext();
  const [onlinePlayers, setOnlinePlayers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://mcapi.us/server/status?ip=mc.vistalab.top");
        const data = await response.json();
        if (data && data.players) {
          
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
      <div className='w-full flex flex-col gap-1 items-center'>
        <Image
          width={240}
          height={240}
          src={avatarUrl}
          alt='avatar'
          className='w-10 h-10 object-cover object-center rounded-full cursor-pointer'
        />
        <h1 className='text-gray-700 text-xl'>Hello, {session.user.nickname}</h1>
        <button type='button' onClick={() => signOut()} className='btn w-full py-2 text-xl'>
          退出
        </button>
        
      </div>
      <span className='inline-block w-2 h-2 rounded-full bg-green-500 ml-2'></span>
      <p className='text-black-500 text-sm'>MC ONLINE: {onlinePlayers !== null ? onlinePlayers : 'Loading···'}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-row items-center'>
    <button type='button' onClick={() => signIn()} className='btn w-full p-3 text-xl'>
      登录
    </button>
    <span className='inline-block w-2 h-2 rounded-full bg-green-500 ml-2'></span>
    <p className='text-black-500 text-sm'>MC ONLINE: {onlinePlayers !== null ? onlinePlayers : 'Loading···'}</p>
    </div>
  );
}
