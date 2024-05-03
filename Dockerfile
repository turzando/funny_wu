FROM node:14.17.0-alpine

RUN adduser -D funny_wu_user

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER funny_wu_user

CMD ["node", "app.js"]