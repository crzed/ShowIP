FROM alpine:3.21.3

RUN apk add --update nodejs npm

COPY . /app

WORKDIR /app

RUN npm install express

EXPOSE 3000

ENTRYPOINT ["node", "./src/index.js"]