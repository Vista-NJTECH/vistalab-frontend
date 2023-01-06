import Table from "./Table";

export default async function Page() {
  return (
    <div className='frame w-full flex flex-col items-start justify-center'>
      <div className='w-full overflow-x-auto'>
        <Table />
      </div>
    </div>
  );
}
