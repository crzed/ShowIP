FROM alpine:3.21.3

RUN apk add --update nodejs npm

COPY . /app

WORKDIR /app/src

RUN npm install

EXPOSE 80

ENTRYPOINT ["node", "./index.js"]