FROM node:boron

RUN mkdir -p /usr/src/codesnipapi
WORKDIR /usr/src/codesnipapi

COPY package.json /usr/src/codesnipapi
RUN npm install

COPY . /usr/src/codesnipapi
EXPOSE 8081

CMD ["npm","start"]