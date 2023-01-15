import { FaShare } from "react-icons/fa";

import { colorfulColors } from "./config";

function CompetitionCard({ competition }) {
  return (
    <div className='flex flex-col gap-5'>
      <h1 className='title text-2xl'>{competition.name}</h1>
      <div className='flex flex-col gap-3 shadow-xl bg-slate-100 p-2 rounded-md'>
        <div className='flex flex-row gap-1'>
          <span className='whitespace-nowrap title'>简介：</span>
          <span className='text-slate-800'>{competition.introduction}</span>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <span className='whitespace-nowrap title'>链接：</span>
          <span className='flex flex-row gap-2'>
            {Object.keys(competition.link).map((item, index) => (
              <a
                href={[competition.link[item]]}
                key={index}
                target='_blank'
                style={{ backgroundColor: colorfulColors[index % colorfulColors.length] }}
                className='flex flex-row items-center gap-1 py-1 px-2 rounded-md text-white'
              >
                <span>{item}</span>
                <span>
                  <FaShare size={10} />
                </span>
              </a>
            ))}
          </span>
        </div>
        <div className='flex flex-col md:flex-row gap-1'>
          <span className='whitespace-nowrap title'>详情：</span>
          <span>{competition.detail}</span>
        </div>
      </div>
    </div>
  );
}

export default async function Page({ params: { competitionid } }) {
  const res = await fetch(`${process.env.BACKEND_URL}competition/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  const decoded_competitionid = decodeURIComponent(competitionid);
  const competition = data.data.find((item) => item.name === decoded_competitionid);

  return (
    <div className='w-full'>
      <CompetitionCard competition={competition} />
    </div>
  );
}
