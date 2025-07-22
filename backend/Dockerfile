FROM node:alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY package.json .

RUN npm install 

COPY . .

CMD ["npm", "run", "dev"]