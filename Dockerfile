FROM node:10.11.0-alpine

WORKDIR /app

COPY . /app

ENTRYPOINT ["node", "index.js"]
