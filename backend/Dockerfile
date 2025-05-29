# Use Node.js LTS version as the base image
FROM node:23-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run insertBods

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "serve"]