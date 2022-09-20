FROM node:14
WORKDIR /usr/src/app
COPY /server ./server
WORKDIR /usr/src/app/server
RUN npm i
EXPOSE 5000
CMD ["npm", "run", "server"]