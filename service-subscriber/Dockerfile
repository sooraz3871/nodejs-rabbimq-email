FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
    && npm install pm2 -g

COPY . .

EXPOSE 8000

CMD ["pm2-runtime", "start","server.js","-i","max"]`