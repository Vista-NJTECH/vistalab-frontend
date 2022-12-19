import Image from "next/image";

import welcome from "./images/welcome.jpg";

export default function Header() {
  return (
    <div className='frame flex flex-col lg:flex-row items-center justify-between gap-10'>
      <Image placeholder='blur' src={welcome} alt='welcome' className='object-cover object-center w-[600px]' />
      <div className='w-full lg:w-1/3 flex flex-col gap-10'>
        <h1 className='title text-3xl'>远景实验室</h1>
        <p className='border-b-2 border-slate-600 text-xl'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis debitis vel sed at reiciendis. Delectus
          debitis dolorem impedit a iure!
        </p>
        <form action='/' method='post' className='flex flex-row'>
          <input
            type='text'
            id='feedback'
            name='feedback'
            placeholder='感谢您的反馈'
            className='border-none outline-none rounded-md rounded-r-none p-3 shadow-md flex-1 bg-gray-100'
          />
          <button type='submit' className='btn py-3 px-5 rounded-l-none'>
            发送
          </button>
        </form>
      </div>
    </div>
  );
}
