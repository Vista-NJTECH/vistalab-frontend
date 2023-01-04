# Vistalab

> 主页地址：
>
> - [https://vistalab.mraddict.one/](https://vistalab.mraddict.one/)

## 1. 本地开发

安装依赖：

```bash
npm install
```

本地开发：

```bash
npm run dev
```

## 2. Docker 部署

在主目录下添加`.env`文件，用于配置 Next-auth 环境变量：

```env
NEXT_AUTH_SECRET="8GYrPDgw9wj5213UHWIm"
NEXTAUTH_URL="https://vistalab.mraddict.one/"
```

编译 Docker 镜像：

```bash
docker build -t vistalab-frontend .
```

启动 Docker 容器：

```bash
docker run --restart=unless-stopped -p 8091:3000 -d --name vistalab-frontend vistalab-frontend
```
