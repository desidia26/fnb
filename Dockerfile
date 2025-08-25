# Secure production Dockerfile for SvelteKit
FROM node:18-alpine

# Create a non-root user
RUN addgroup -g 1001 -S fnbgroup && \
    adduser -S fnbuser -u 1001 -G fnbgroup

# Set working directory
WORKDIR /app

# Copy package files and install dependencies as root
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code and build
COPY . .
RUN npm run build

# Change ownership of the app directory to fnbuser
RUN chown -R fnbuser:fnbgroup /app

# Switch to non-root user
USER fnbuser

# Expose port and set environment
EXPOSE 3000
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

CMD ["node", "build"]