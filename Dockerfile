FROM node:latest

WORKDIR /app

ARG node_env=production

COPY package*.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "start"]