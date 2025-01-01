# Dockerfile

FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /app

COPY ./ /app

ENV NODE_OPTIONS=--openssl-legacy-provider
# Install global dependencies (create-react-app, serve) only once
# RUN npm install -g create-react-app

# Install application dependencies\
# # Build the React app
RUN npm install

# # serve your static site on the port 3000
# RUN npm install -g serve

# # Clean up the npm cache to make the image smaller
# RUN npm cache clean --force



# apt update && apt install curl vim -y
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
# nvm install 22
