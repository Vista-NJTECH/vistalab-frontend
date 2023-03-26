import { unstable_getServerSession } from "next-auth/next";

import FaceLogin from "./FaceLogin";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

export default async function Page() {
  const session = await unstable_getServerSession(authOptions);

  if (session) return <h1 className='title text-2xl'>你已经登录，不能访问此页面</h1>;

  return <FaceLogin />;
}
