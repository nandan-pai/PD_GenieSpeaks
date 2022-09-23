FROM node:14
WORKDIR /usr/src
COPY /webapp ./webapp
WORKDIR /usr/src/webapp
RUN npm i
RUN npm install -g serve
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "build"]
