import { Header, Awards, Stacks, Certificates, Activities } from "./components";

export default function Page() {
  return (
    <div className='flex flex-col gap-10 md:gap-40'>
      <Header />
      <Awards />
      <Certificates />
      <Stacks />
      <Activities />
    </div>
  );
}
