FROM node:14.17.0

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "app.js"]