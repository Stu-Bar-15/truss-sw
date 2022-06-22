FROM node:16

WORKDIR /code

COPY package.json /code/
COPY yarn.lock /code/

RUN yarn install

COPY . /code/

#RUN yarn build
#
#COPY . /code/
#
#EXPOSE 3000
#
#CMD ["node", "server.js"]

#FROM node:16 AS ui-build
#WORKDIR /usr/src/app
#COPY my-app/ ./my-app/
#RUN cd my-app && npm install && npm run build
