"use client";

import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxDotFilled, RxDot } from "react-icons/rx";

import importAllImages from "./importAllImages";

export default function Certificates() {
  const images = importAllImages();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const prevSlide = () => {
    const newSlideIndex = currentSlideIndex === 0 ? images.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newSlideIndex);
  };
  const nextSlide = () => {
    const newSlideIndex = currentSlideIndex === images.length - 1 ? 0 : currentSlideIndex + 1;
    setCurrentSlideIndex(newSlideIndex);
  };
  return (
    <div className='px-10 md:px-48 flex flex-col items-center justify-center py-10 gap-5'>
      <h1 className='text-3xl font-bold text-slate-700'>获得的奖项</h1>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <div className='max-w-[700px] max-h-[500px] relative group border-8 border-[#cdaa7d] border-dashed p-2'>
          {<Image src={images[currentSlideIndex]} alt='slide-image' placeholder='blur' className='w-full h-full' />}
          <button className='group-hover:block hidden absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full cursor-pointer text-white bg-black/30'>
            <MdKeyboardArrowLeft onClick={prevSlide} size={30} />
          </button>
          <button className='group-hover:block hidden absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full cursor-pointer text-white bg-black/30'>
            <MdKeyboardArrowRight onClick={nextSlide} size={30} />
          </button>
        </div>
        <div className='flex flex-row gap-2'>
          {images.map((item, index) => (
            <button key={index} className='cursor-pointer text-slate-700' onClick={() => setCurrentSlideIndex(index)}>
              {currentSlideIndex === index ? <RxDotFilled size={25} /> : <RxDot size={25} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
