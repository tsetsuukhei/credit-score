FROM node:20 AS build

# Set the working directory in the container
WORKDIR /client/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# For the NextJS
CMD npm run dev