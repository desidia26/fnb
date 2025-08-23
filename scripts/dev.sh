#!/bin/bash
# Development script - rebuild and restart containers

echo "🔄 Rebuilding and restarting development containers..."

# Stop existing containers
docker-compose down

# Rebuild images (no cache to ensure fresh build)
docker-compose build --no-cache

# Start containers
docker-compose up -d

# Show status
echo "✅ Containers restarted!"
echo "📱 App: http://localhost:3000"
echo "📋 Status:"
docker-compose ps