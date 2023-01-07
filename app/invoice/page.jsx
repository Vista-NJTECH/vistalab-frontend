import { Table } from "./components";
import { InvoiceContextProvider } from "./components";

export default async function Page() {
  return (
    <div className='frame w-full flex flex-col items-start justify-center'>
      <InvoiceContextProvider>
        <Table />
      </InvoiceContextProvider>
    </div>
  );
}
