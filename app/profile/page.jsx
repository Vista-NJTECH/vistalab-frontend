import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Link from "next/link";

var user = {
  name: 'T1',
  age: '30',
  location: 'New York',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus eget bibendum congue, est magna malesuada ipsum, ut malesuada enim diam eget turpis. Curabitur suscipit semper magna, eu convallis metus egestas ut.'
};

export default async function Page() {
  var session = await unstable_getServerSession(authOptions);

  if (!session){
    return (
      <div className='w-full flex flex-col items-center justify-center gap-3'>
        <h1 className='title text-2xl'>登录后才能查看</h1>
        <Link href={{ pathname: "/login", query: { callbackUrl: "/invoice" } }} className='btn py-2 px-4'>
          Login
        </Link>
      </div>
    )
  };

  const response = await fetch("http://124.223.196.177:8181/my/userinfo", {
    headers: { Authorization: session.user.token },
  });
  user = (await response.json()).userinfo;
  console.log(user)


  return (
    <div className="bg-gray-200 min-w-screen p-8">
      <h1 className="text-2xl font-medium mb-4">About Me</h1>
      <div className="bg-white rounded-lg p-4 flex">
        <img className="w-32 h-32 rounded-full mr-4" src={user.avatar} alt={user.username}/>
        <div>
          <p className="text-gray-800 font-medium mb-2">Name: {user.name}</p>
          <p className="text-gray-800 font-medium mb-2">username: {user.username}</p>
          <p className="text-gray-800 font-medium mb-2">Email: {user.email}</p>
          <p className="text-gray-800 font-medium mb-2">创建时间: {user.created_time}</p>
          <p className="text-gray-800 font-medium mb-2">用户权限组: {user.p_group}</p> 
        </div>
    </div>
  </div>
  );
}
