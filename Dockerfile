# Dockerfile

FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /app

COPY ./ /app

ENV NODE_OPTIONS=--openssl-legacy-provider

# Install application dependencies\
RUN npm install
