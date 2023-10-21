export default async function Page() {
  return (
    <ul class='w-full frame flex flex-col gap-1 md:gap-3 list-disc'>
      <li className='ml-5'>
        <h1>2022.12</h1>
        <p>
          顾俊玮与蔡建文开始搭建网站，顾俊玮主要完成后端搭建，蔡建文主要完成前端搭建。
          <a href='https://github.com/510Lab/vistalab-frontend' className='text-blue-600 hover:underline'>
            前端
          </a>
          /
          <a href='https://github.com/510Lab/vistalab-backend' className='text-blue-600 hover:underline'>
            后端
          </a>
          。
        </p>
      </li>

      <li className='ml-5'>
        <h1>2023.02</h1>
        <p>网站基本完成开发，更新新春活动，在主页反馈栏寻找四个flag。</p>
      </li>

      <li className='ml-5'>
        <h1>2023.03</h1>
        <p>实验室将举办乐高活动，蔡建文搭建副站</p>
      </li>

      <li className='ml-5'>
        <h1>2023.03.31</h1>
        <p className='line-through'>
          GJW: 完成校内地址配置，校内解析服务器ip:202.119.245.10
          <br />
          主站：校内地址为
          <a href='https://vista.online.njtech.edu.cn' className='text-blue-600 hover:underline'>
            https://vista.online.njtech.edu.cn
          </a>
          <br />
          副站：其中校内地址为
          <a href='https://vista.online.njtech.edu.cn/labact' className='text-blue-600 hover:underline'>
            https://vista.online.njtech.edu.cn/labact
          </a>
          <br />
        </p>
      </li>

      <li className='ml-5'>
        <h1>2023.04.16</h1>
        <p>CJW:完善智慧物联的Camera页面，加入保护页面</p>
      </li>
    </ul>
  );
}
