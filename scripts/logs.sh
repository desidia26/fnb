#!/bin/bash
# Show container logs

echo "📋 Container logs:"
docker-compose logs -f --tail=50