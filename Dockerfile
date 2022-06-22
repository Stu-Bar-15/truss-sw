FROM node:16

WORKDIR /code

COPY package.json /code/
COPY yarn.lock /code/

RUN yarn install

COPY . /code/
