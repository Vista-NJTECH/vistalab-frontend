# Vistalab

> 主页地址：
>
> - [https://vistalab.mraddict.one/](https://vistalab.mraddict.one/)

## 1. 添加 Next-auth 环境变量

由于 Next-auth 部署时需要几个环境变量，因此需要在主目录下手动添加`.env`文件，内容如下：

```env
NEXT_AUTH_SECRET="8GYrPDgw9wj5213UHWIm"
NEXTAUTH_URL="https://vistalab.mraddict.one/"
```

## 2. 如何开发

安装依赖：

```bash
npm install
```

开发模式：

```bash
npm run dev
```

## 3.如何部署

### 3.1. 手动部署

安装依赖：

```bash
npm install
```

编译项目：

```bash
npm run build
```

部署模式：

```bash
npm start
```

### 3.3. Docker 部署

编译 Docker 镜像：

```bash
docker build -t vistalab-frontend .
```

启动 Docker 容器：

```bash
docker run --restart=unless-stopped -p 8091:3000 -d --name vistalab-frontend vistalab-frontend
```
