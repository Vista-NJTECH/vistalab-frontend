import Link from "next/link";
import { getServerSession } from "next-auth/next";

import Client from "./Client";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <div className='w-full flex flex-col items-center justify-center gap-3'>
        <h1 className='title text-2xl'>登录后才能查看</h1>
        <Link href={{ pathname: "/login", query: { callbackUrl: "/invoice" } }} className='btn py-2 px-4'>
          Login
        </Link>
      </div>
    );

  return <Client />;
}
