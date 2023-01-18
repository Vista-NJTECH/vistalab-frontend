import Image from "next/image";
import welcome from "./images/welcome.jpg";

import FeedbackForm from "./FeedbackForm";

export default function Head() {
  return (
    <div className='frame flex flex-col lg:flex-row items-center justify-between gap-10'>
      <Image placeholder='blur' priority src={welcome} alt='welcome' className='object-cover object-center w-[600px]' />
      <div className='w-full flex flex-col gap-10'>
        <h1 className='title text-3xl'>远景实验室</h1>
        <p className='border-b-2 border-slate-600 text-xl indent-10 flex flex-col'>
          <span>
            远景实验室是南京工业大学计算机科学与技术学院的一个实验室，在这里学生可以学习电控、编程、算法等相关内容，参与各类高校的活动和竞赛。同时，我们也有自己的日常项目和活动，同学们可以在这里发掘兴趣，培养能力，相互交流学习。
          </span>
          <span>你可以在下方留下对我们的建议和想法。</span>
        </p>
        <FeedbackForm />
      </div>
    </div>
  );
}
