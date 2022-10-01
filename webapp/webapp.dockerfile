FROM node:14

# Copy file to container
WORKDIR /usr/src
COPY /webapp ./webapp
WORKDIR /usr/src/webapp

# Download requirements
RUN npm i
RUN npm install -g serve
RUN npm run build

# Open port in docker
EXPOSE 3000

# Start frontend
CMD ["serve", "-s", "build"]
