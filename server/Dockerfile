FROM node:20-alpine

WORKDIR /app

Copy package*.json ./
RUN npm i

COPY . .
EXPOSE 3001

CMD [ "npm", "start" ]