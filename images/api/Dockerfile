# Node version
FROM node:latest

# Work directory
WORKDIR /usr/app

# Copy the package.json file to the container
COPY package*.json ./

# Install dependencies
RUN npm install --quiet

COPY ./ ./

