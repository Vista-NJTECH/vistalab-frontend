"use client";

import { useState, useEffect } from "react";

import { Spin } from "../../components";
import { CourseCard, Upload } from "./components";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPagesNum, setAllPagesNum] = useState(1);
  const [lessons, setLessons] = useState({ data: [] });
  const [isLoading, setIsloading] = useState(false);

  async function fetchStudyData(page) {
    setIsloading(true);
    await fetch(`${process.env.BACKEND_URL}study/getall?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setLessons(data);
          setAllPagesNum(data.pagecount);
        } else {
          console.error(data.message);
        }
        setIsloading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsloading(false);
      });
  }

  useEffect(() => {
    fetchStudyData(currentPage);
  }, [currentPage]);

  return (
    <div className='w-full flex flex-col gap-5'>
      <div className='w-full flex flex-row items-center justify-between'>
        <h1 href='/study' className='w-fit title text-xl'>
          推荐课程
        </h1>
        <Upload />
      </div>
      {isLoading ? (
        <Spin />
      ) : (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-3'>
          {lessons.data.map((item, index) => (
            <CourseCard key={index} prefix={lessons.prefix} course={item} />
          ))}
        </div>
      )}
      <div className='w-full flex flex-row items-center justify-center gap-2'>
        {[...Array(allPagesNum)].map((item, index) => (
          <button
            onClick={() => {
              setCurrentPage(index + 1);
              window.scroll({ top: 0, behavior: "auto" });
            }}
            className={`${index + 1 === currentPage ? "bg-gray-400" : "bg-theme"} text-white py-1 px-3 rounded-md`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
