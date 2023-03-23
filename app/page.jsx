import { Head, Awards, Stacks, Certificates, Activities } from "./components";

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
