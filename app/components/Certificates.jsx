"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxDotFilled, RxDot } from "react-icons/rx";

import importAllImages from "./config";

export default function Certificates() {
  const images = importAllImages();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const timerRef = useRef(null);

  const prevSlide = useCallback(() => {
    const newSlideIndex = currentSlideIndex === 0 ? images.length - 1 : currentSlideIndex - 1;
    setCurrentSlideIndex(newSlideIndex);
  }, [currentSlideIndex, images]);
  const nextSlide = () => {
    const newSlideIndex = currentSlideIndex === images.length - 1 ? 0 : currentSlideIndex + 1;
    setCurrentSlideIndex(newSlideIndex);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 4000);
    return () => clearTimeout(timerRef.current);
  }, [nextSlide]);

  return (
    <div className='frame flex flex-col items-center justify-center gap-5'>
      <h1 className='title text-3xl'>我们获得的奖项</h1>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <div className='flex flex-row items-center justify-center gap-3 md:gap-5'>
          <button type='button' className='text-2xl md:text-3xl rounded-full cursor-pointer text-white bg-black/50'>
            <MdKeyboardArrowLeft onClick={prevSlide} />
          </button>
          <div className='border-4 md:border-8 border-[#cdaa7d] border-dashed p-1'>
            <div className='w-[250px] md:w-[700px] h-[180px] md:h-[500px] relative'>
              {images.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt='certificate'
                  placeholder='blur'
                  className={`absolute object-cover object-center top-0 left-0 w-full h-full duration-1000 ${
                    currentSlideIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
          <button type='button' className='text-2xl md:text-3xl rounded-full cursor-pointer text-white bg-black/50'>
            <MdKeyboardArrowRight onClick={nextSlide} />
          </button>
        </div>
        <div className='flex flex-row gap-2'>
          {images.map((item, index) => (
            <button
              type='button'
              key={index}
              className='cursor-pointer text-slate-700'
              onClick={() => setCurrentSlideIndex(index)}
            >
              {currentSlideIndex === index ? <RxDotFilled size={25} /> : <RxDot size={25} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
