FROM node:10
WORKDIR /usr/src/codesnipapi
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]