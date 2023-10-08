FROM node:18.12-slim
WORKDIR /app
COPY . .
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org 
RUN cnpm install -ci
RUN cnpm run build
CMD ["npm", "start"]