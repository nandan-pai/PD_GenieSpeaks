# FROM ubuntu:latest
FROM python:3.9-slim

# Update System
RUN apt-get update

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code to container
COPY /geniescrapes/ .

ENTRYPOINT ["scrapy"]
CMD []
