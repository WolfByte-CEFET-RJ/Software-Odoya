FROM node:20-alpine

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD npx knex migrate:latest && npm run knex:seed && npm run dev