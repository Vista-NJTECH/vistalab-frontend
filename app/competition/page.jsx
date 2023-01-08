import Image from "next/image";

import welcome from "./welcome.jpg";

export default async function Page() {
  return (
    <div className='w-full flex flex-col items-center gap-5'>
      <Image src={welcome} alt='welcome' className='w-full max-w-md object-cover object-center' />
      <h1 className='title text-xl md:text-3xl'>侧边栏查看竞赛详细信息</h1>
    </div>
  );
}
