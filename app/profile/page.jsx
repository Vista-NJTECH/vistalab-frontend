import Image from "next/image";
import Link from "next/link";
import { unstable_getServerSession } from "next-auth/next";

import UploadAvatar from "./UploadAvatar";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await unstable_getServerSession(authOptions);

  if (!session) {
    return (
      <div className='w-full flex flex-col items-center justify-center gap-3'>
        <h1 className='title text-2xl'>登录后才能查看</h1>
        <Link href={{ pathname: "/login", query: { callbackUrl: "/profile" } }} className='btn py-2 px-4'>
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className='frame w-full flex flex-col gap-10'>
      <h1 className='title text-3xl font-bold'>个人信息</h1>
      <div className='flex flex-col md:flex-row gap-10'>
        <div className='flex flex-col justify-between'>
          <p className='text-gray-800 font-medium'>姓名：{session.user.nickname}</p>
          <p className='text-gray-800 font-medium'>用户名：{session.user.username}</p>
          <p className='text-gray-800 font-medium'>邮箱：{session.user.email}</p>
          <p className='text-gray-800 font-medium'>创建时间：{new Date(session.user.created_time).toDateString()}</p>
          <p className='text-gray-800 font-medium'>用户权限组：{session.user.group}</p>
        </div>
        <div className='group relative w-fit'>
          <Image
            width={500}
            height={500}
            src={session.user.avatar}
            alt='avatar'
            className='w-40 h-40 object-cover object-center rounded-full cursor-pointer'
          />
          <UploadAvatar />
        </div>
      </div>
    </div>
  );
}
