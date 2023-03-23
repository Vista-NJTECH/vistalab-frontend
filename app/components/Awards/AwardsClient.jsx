"use client";

import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function AwardsClient({ awardsData }) {
  const yearsData = Object.keys(awardsData);
  const [currentIndex, setCurrentIndex] = useState(yearsData[0]);

  function YearCard({ item }) {
    return (
      <div
        onClick={() => setCurrentIndex(item)}
        className={`p-3 title text-2xl border-l-4 w-full flex flex-row items-center justify-between cursor-pointer duration-500 ${
          currentIndex === item ? "bg-slate-200 border-theme" : "border-slate-400"
        }`}
      >
        <span>{item}</span>
        {currentIndex === item && (
          <span className='text-theme'>
            <MdKeyboardArrowRight />
          </span>
        )}
      </div>
    );
  }

  function AwardCard({ item, index }) {
    return (
      <div className='flex flex-row items-start justify-start gap-2 text-xl'>
        <span>{`${index}.`}</span>
        <h1>{item}</h1>
      </div>
    );
  }

  return (
    <div className='frame py-10 md:py-40 flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center bg-slate-100'>
      <div className='w-full md:w-1/3 flex flex-col items-center justify-start gap-4 md:gap-7 rounded-r-none md:pl-16 md:py-10'>
        <h1 className='title text-3xl'>我们取得的成果</h1>
        {yearsData.map((item, index) => (
          <YearCard key={index} item={item} />
        ))}
      </div>
      <div className='flex flex-col gap-3 w-full border-2 border-slate-300 p-4 rounded-xl'>
        {awardsData[currentIndex].map((item, index) => (
          <AwardCard key={item} item={item} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
