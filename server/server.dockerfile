FROM node:14

# Copy file to container
WORKDIR /usr/src
COPY /server ./server
WORKDIR /usr/src/server

# Download requirements
RUN npm i

# Open port in docker
EXPOSE 5000

# Start API Server
CMD ["npm", "run", "server"]
