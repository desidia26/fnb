# Food Not Bombs Morgantown - Deployment Guide

This guide provides detailed instructions for deploying the Food Not Bombs Morgantown website to your home hardware.

## 🏠 Home Hardware Deployment

### Prerequisites

- Linux server (Ubuntu 20.04+ recommended)
- Docker and Docker Compose installed
- Static IP address or Dynamic DNS setup
- Router access for port forwarding
- Domain name (optional but recommended)

### Step 1: Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Reboot to apply changes
sudo reboot
```

### Step 2: Application Setup

```bash
# Clone the repository
git clone <your-repository-url> /home/$USER/food-not-bombs
cd /home/$USER/food-not-bombs

# Configure environment
cp .env.example .env.production
nano .env.production
```

### Step 3: Production Environment Configuration

Edit `.env.production` with your production settings:

```env
# Production SMTP Configuration
SMTP_HOST=smtp.your-isp.com          # Your ISP's SMTP server
SMTP_PORT=587                        # Standard submission port
SMTP_SECURE=false                    # Use STARTTLS
SMTP_USER=your-email@your-domain.com # Your email username
SMTP_PASS=your-email-password        # Your email password

# Production Email Settings
FROM_EMAIL=noreply@fnbmorgantown.org
TO_EMAIL=organizers@fnbmorgantown.org

# Optional: Custom port if needed
# PORT=3000
```

### Step 4: Network Configuration

#### Router Port Forwarding

Configure your router to forward traffic:

| Service | External Port | Internal Port | Protocol |
|---------|---------------|---------------|----------|
| Web App | 80 | 3000 | TCP |
| Web App (HTTPS) | 443 | 3000 | TCP |

#### Firewall Configuration

```bash
# Allow HTTP/HTTPS traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow SSH (if needed for remote management)
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

### Step 5: Deploy with Docker Compose

```bash
# Build and start the application
docker-compose -f docker-compose.prod.yml up -d

# Check logs
docker-compose -f docker-compose.prod.yml logs -f

# Verify health
docker-compose -f docker-compose.prod.yml ps
```

### Step 6: Domain Configuration (Optional)

If you have a domain name:

#### Option A: Static IP
Point your domain's A record to your home IP address.

#### Option B: Dynamic DNS
Use a service like DuckDNS, No-IP, or DynDNS:

```bash
# Example: DuckDNS setup
echo "*/5 * * * * curl 'https://www.duckdns.org/update?domains=your-domain&token=your-token&ip='" | crontab -
```

### Step 7: SSL/TLS Setup (Recommended)

#### Option A: Let's Encrypt with Reverse Proxy

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Install Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### Option B: Cloudflare (Easier)
Use Cloudflare's free tier for SSL termination and DDoS protection.

## 🔧 Maintenance

### Updating the Application

```bash
# Navigate to project directory
cd /home/$USER/food-not-bombs

# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Clean up old images
docker system prune -f
```

### Monitoring

#### Check Application Health
```bash
# Check container status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f app

# Check health endpoint
curl http://localhost:3000/
```

#### System Monitoring
```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
top
```

### Backup Strategy

```bash
# Create backup script
cat > /home/$USER/backup-fnb.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/$USER/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application files
tar -czf $BACKUP_DIR/fnb-app-$DATE.tar.gz -C /home/$USER food-not-bombs

# Keep only last 7 backups
ls -t $BACKUP_DIR/fnb-app-*.tar.gz | tail -n +8 | xargs rm -f

echo "Backup completed: fnb-app-$DATE.tar.gz"
EOF

chmod +x /home/$USER/backup-fnb.sh

# Schedule daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /home/$USER/backup-fnb.sh") | crontab -
```

## 🚨 Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check logs for errors
docker-compose -f docker-compose.prod.yml logs app

# Check available resources
docker system df
free -h
```

#### Email Not Sending
```bash
# Test SMTP connection
telnet your-smtp-server 587

# Check application logs
docker-compose -f docker-compose.prod.yml logs app | grep -i smtp
```

#### Can't Access from Internet
1. Check router port forwarding
2. Verify firewall rules
3. Test with local IP first
4. Check ISP blocking policies

### Performance Optimization

#### For Low-Resource Hardware
```yaml
# In docker-compose.prod.yml, add resource limits
services:
  app:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

#### Enable Gzip Compression
Add to nginx config:
```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
gzip_min_length 1000;
```

## 📞 Support

For technical issues:
1. Check the main [README.md](./README.md)
2. Review application logs
3. Test with development setup first
4. Check Food Not Bombs community resources

---

*Remember: This website serves your local community. Keep it simple, reliable, and accessible!*