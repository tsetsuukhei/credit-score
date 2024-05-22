# Dockerfile for Backend

# Use the official Node.js image as the base image
FROM node:20 AS build

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Set the working directory in the container
WORKDIR /server/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your backend uses, for example, 4000
EXPOSE 8000

# Start the backend server
CMD [ "npm", "run", "dev"]
