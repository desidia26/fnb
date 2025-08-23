#!/bin/bash
# Clean up Docker resources

echo "🧹 Cleaning up Docker resources..."

# Stop containers
docker-compose down

# Remove unused images
docker image prune -f

# Remove unused volumes
docker volume prune -f

echo "✅ Cleanup complete!"