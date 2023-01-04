# Vistalab

## 1. 如何开发

主目录下添加`.env`文件，用于配置 Next-Auth 的环境变量：

```env
NEXT_AUTH_SECRET="8GYrPDgw9wj5213UHWIm"
NEXTAUTH_URL="https://vistalab.mraddict.one/"
```

安装依赖：

```bash
npm install
```

开发模式：

```bash
npm run dev
```

## 2.如何部署

### 2.1. 手动部署

主目录下添加`.env`文件，用于配置 Next-Auth 的环境变量：

```env
NEXT_AUTH_SECRET="8GYrPDgw9wj5213UHWIm"
NEXTAUTH_URL="https://vistalab.mraddict.one/"
```

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

### 2.2. Docker 部署

主目录下添加`.env`文件，用于配置 Next-Auth 的环境变量：

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

停止 Docker 容器：

```bash
docker stop vistalab-frontend
```

删除 Docker 容器：

```bash
docker rm vistalab-frontend
```

删除 Docker 镜像：

```bash
docker rmi vistalab-frontend
```
