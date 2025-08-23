#!/bin/bash
# Production deployment script

echo "🚀 Deploying to production..."

# Stop existing containers
docker-compose down

# Rebuild with production optimizations
docker-compose build --no-cache

# Start with production environment
docker-compose --env-file .env.production up -d

echo "✅ Production deployment complete!"
echo "📱 App: http://localhost:3000"
echo "📋 Status:"
docker-compose ps