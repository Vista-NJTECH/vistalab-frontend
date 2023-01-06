import { Table } from "./components";
import { InvoiceContextProvider } from "./components";

export default async function Page() {
  return (
    <div className='frame w-full flex flex-col items-start justify-center'>
      <div className='w-full overflow-x-auto'>
        <InvoiceContextProvider>
          <Table />
        </InvoiceContextProvider>
      </div>
    </div>
  );
}
