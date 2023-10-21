import { Spin } from "../components";

export default function Loading() {
  return (
    <div className='frame flex flex-col items-center w-full gap-1'>
      <Spin />
      <p className='title text-xl'>Loading...</p>
    </div>
  );
}
