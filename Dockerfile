FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install -ci
RUN npm run build
CMD ["npm", "start"]