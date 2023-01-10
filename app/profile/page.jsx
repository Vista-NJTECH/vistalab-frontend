import Image from "next/image";
import Link from "next/link";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { unstable_getServerSession } from "next-auth/next";

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
      <div className='flex flex-row gap-10'>
        <div className='flex flex-col justify-between'>
          <p className='text-gray-800 font-medium'>姓名：{session.user.nickname}</p>
          <p className='text-gray-800 font-medium'>用户名：{session.user.username}</p>
          <p className='text-gray-800 font-medium'>邮箱：{session.user.email}</p>
          <p className='text-gray-800 font-medium'>创建时间：{new Date(session.user.created_time).toDateString()}</p>
          <p className='text-gray-800 font-medium'>用户权限组：{session.user.group}</p>
        </div>
        <div className='group relative'>
          <Image
            width={500}
            height={500}
            src={session.user.avatar}
            alt='avatar'
            className='w-40 h-40 object-cover object-center rounded-full'
          />
          <button
            type='button'
            className='opacity-0 group-hover:opacity-100 duration-300 absolute right-0 top-0 p-2 bg-gray-600 text-white rounded-full hover:bg-gray-800'
          >
            <AiOutlineCloudUpload size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
