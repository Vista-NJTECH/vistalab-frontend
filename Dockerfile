FROM node:18.12-slim
WORKDIR /app
COPY . .
RUN echo $RANDOM | md5sum | head -c 20 > .env
RUN npm install -ci
RUN npm run build
CMD ["npm", "start"]