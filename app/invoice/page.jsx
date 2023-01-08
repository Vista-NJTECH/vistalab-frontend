import Link from "next/link";
import { unstable_getServerSession } from "next-auth/next";

import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { InvoiceTable, InvoiceContextProvider } from "./components";

export default async function Page() {
  const session = await unstable_getServerSession(authOptions);
  if (!session)
    return (
      <div className='w-full flex flex-col items-center justify-center gap-3'>
        <h1 className='title text-2xl'>登录后才能查看</h1>
        <Link href={{ pathname: "/login", query: { callbackUrl: "/members" } }} className='btn py-2 px-4'>
          Login
        </Link>
      </div>
    );

  return (
    <div className='frame w-full flex flex-col items-start justify-center'>
      <InvoiceContextProvider>
        <InvoiceTable />
      </InvoiceContextProvider>
    </div>
  );
}
