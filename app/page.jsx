import { Head } from "./components";
import dynamic from 'next/dynamic';

const Awards = dynamic(() => import('./components/Awards/Awards'), { ssr: false });
const Stacks = dynamic(() => import('./components/Stacks'), { ssr: false });
const Certificates = dynamic(() => import('./components/Certificates/Certificates'), { ssr: false });
const Activities = dynamic(() => import('./components/Activities'), { ssr: false });

export default function Page() {
  return (
    <div className='flex flex-col'>
      <Head />
      <Awards />
      <Certificates />
      <Stacks />
      <Activities />
    </div>
  );
}
