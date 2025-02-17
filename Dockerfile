FROM node:20-alpine

WORKDIR /usr/src/app

COPY . .
COPY .env.production .env

RUN yarn install 

RUN yarn build

CMD ["yarn", "start:prod"]
