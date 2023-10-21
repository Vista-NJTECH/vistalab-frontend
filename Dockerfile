FROM node:18.12-slim
WORKDIR /app
COPY . .
#RUN npm install -g cnpm --registry=https://registry.npm.taobao.org 
RUN npm install -ci
RUN npm run build
CMD ["npm", "start"]