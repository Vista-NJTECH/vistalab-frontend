"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import CourseCard from "./CourseCard";
import { Spin } from "../../../components";
import { useStudyStateContext } from "./StudyContextProvider";

export default function Page({ url }) {
  const { data: session } = useSession();
  const { refreshData } = useStudyStateContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [allPagesNum, setAllPagesNum] = useState(1);
  const [lessons, setLessons] = useState({ data: [] });
  const [isLoading, setIsloading] = useState(false);

  async function fetchStudyData(page, url) {
    setIsloading(true);
    await fetch(
      `${process.env.BACKEND_URL}study/getall?page=${page}${url}`,
      session ? { headers: { Authorization: session.user.token } } : null
    )
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
    fetchStudyData(currentPage, url);
  }, [currentPage, refreshData, session]);

  return (
    <>
      {isLoading ? (
        <div className='w-full flex items-center justify-center py-10'>
          <Spin />
        </div>
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
            key={index}
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
    </>
  );
}
