# Simple production Dockerfile for SvelteKit
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]