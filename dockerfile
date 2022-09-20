FROM node:14
WORKDIR /src/usr/app
COPY requirements.txt ./
RUN npm i
EXPOSE 80
CMD ["node", "app.js"]