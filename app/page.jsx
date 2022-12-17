import Header from "./Header";
import Stack from "./Stack";
import Awards from "./Awards";

export default function Page() {
  return (
    <div className='flex flex-col gap-40'>
      <Header />
      <Stack />
      <Awards />
    </div>
  );
}
