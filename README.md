# Vistalab

## 一、如何开发

安装依赖：

```bash
npm install
```

开发模式：

```bash
npm run dev
```

## 二、如何部署

### 手动部署

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

### Docker 部署

编译 Docker 镜像：

```bash
docker build -t vistalab .
```

启动 Docker 容器：

```bash
docker run --restart=unless-stopped -p 8091:3000 -d --name vistaweb vistalab
```

停止 Docker 容器：

```bash
docker stop vistalab
```

删除 Docker 容器：

```bash
docker rm vistalab
```

删除 Docker 镜像：

```bash
docker rmi vistalab
```
