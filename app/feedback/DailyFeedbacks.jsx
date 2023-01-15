"use client";

import useFormatDate from "../../lib/useFormateDate";
import Delete from "./Delete";

export default function DailyFeedbacks({ dailyFeedbacks }) {
  return (
    <div className='flex flex-col gap-1 bg-slate-200 p-2 rounded-md'>
      {dailyFeedbacks.map((item, index) => (
        <div key={index} className='flex flex-row items-center justify-between'>
          <div className='flex flex-row gap-1'>
            <span>({useFormatDate(item.created_time)})</span>
            <span>{item.feedback}</span>
          </div>
          <Delete feedback={item} />
        </div>
      ))}
    </div>
  );
}
