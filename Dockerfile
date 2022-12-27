FROM node:18.12-slim
WORKDIR /app
COPY . .
RUN echo NEXT_AUTH_SECRET=$(echo $RANDOM | md5sum | head -c 30) > .env
RUN npm install -ci
RUN npm run build
CMD ["npm", "start"]