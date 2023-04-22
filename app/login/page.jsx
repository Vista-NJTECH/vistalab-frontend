import { getServerSession } from "next-auth/next";

import CredentialsLogin from "./CredentialsLogin";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) return <h1 className='title text-2xl'>你已经登录，不能访问此页面</h1>;

  return <CredentialsLogin />;
}
