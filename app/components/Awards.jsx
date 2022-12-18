"use client";

import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import { awardsData } from "./config";

function YearCard({ item, currentIndex, setCurrentIndex }) {
  const commonStyle =
    "p-3 text-xl font-bold text-slate-700 border-l-4 w-full flex flex-row items-center justify-between cursor-pointer duration-500";
  return (
    <div
      onClick={setCurrentIndex}
      className={
        currentIndex === item ? `bg-slate-200 border-theme-dark ${commonStyle}` : `border-theme-light  ${commonStyle}`
      }
    >
      <span>{item}</span>
      {currentIndex === item && (
        <span className='text-theme-dark'>
          <IoIosArrowForward />
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

export default function Awards() {
  const yearsData = Object.keys(awardsData);
  const [currentIndex, setCurrentIndex] = useState(yearsData[0]);
  return (
    <div className='px-48 py-28 flex flex-row gap-10 items-center justify-center bg-slate-100'>
      <div className='w-1/3 flex flex-col items-center justify-start gap-7 rounded-r-none rounded-xl pl-16 py-10'>
        <h1 className='text-3xl font-bold text-slate-700'>我们的成果</h1>
        {yearsData.map((item, index) => (
          <YearCard key={index} item={item} currentIndex={currentIndex} setCurrentIndex={() => setCurrentIndex(item)} />
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
