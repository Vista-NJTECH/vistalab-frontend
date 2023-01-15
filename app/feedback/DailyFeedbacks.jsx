"use client";

import moment from "moment/moment";
import Delete from "./Delete";

export default function DailyFeedbacks({ dailyFeedbacks }) {
  return (
    <div className='flex flex-col gap-1 bg-slate-200 p-2 rounded-md overflow-x-auto'>
      {dailyFeedbacks.map((item, index) => (
        <div key={index} className='flex flex-row items-center justify-between gap-2'>
          <div className='flex flex-row gap-1'>
            <span className='whitespace-nowrap'>({moment.utc(item.created_time).format("YYYY-MM-DD hh:mm")})</span>
            <span className='whitespace-nowrap'>{item.feedback}</span>
          </div>
          <Delete feedback={item} />
        </div>
      ))}
    </div>
  );
}
