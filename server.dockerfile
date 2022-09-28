FROM node:14
WORKDIR /usr/src
COPY /server ./server
WORKDIR /usr/src/server
RUN npm i
EXPOSE 5000
CMD ["npm", "run", "server"]
