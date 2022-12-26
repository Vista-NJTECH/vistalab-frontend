FROM node:18.12
WORKDIR /app
COPY . .
RUN npm install -g npm@9.2.0
RUN npm install -ci
RUN npm run build
CMD ["npm", "start"]