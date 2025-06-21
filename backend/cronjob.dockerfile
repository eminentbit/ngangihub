FROM node:23-slim

# Set working directory in the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

ENV NODE_ENV=production

# Run cron in the foreground
CMD ["npm", "run", "cronJob"]