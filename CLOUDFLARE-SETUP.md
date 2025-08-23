# morgantownfnb.org - Cloudflare Tunnel Setup Guide

This guide walks you through setting up Food Not Bombs Morgantown with your domain `morgantownfnb.org`, Mailgun email, and Cloudflare Tunnel.

## 🎯 Architecture Overview

```
Internet → Cloudflare → Cloudflare Tunnel → Your Computer → Docker Container
```

**Benefits:**
- ✅ No port forwarding needed
- ✅ Free SSL/TLS certificates
- ✅ DDoS protection
- ✅ CDN acceleration
- ✅ Professional email delivery
- ✅ Analytics and monitoring

## 📧 Step 1: Configure Mailgun

### 1.1 Add Domain to Mailgun
1. Log into your Mailgun dashboard
2. Go to **Sending > Domains**
3. Click **Add New Domain**
4. Enter: `morgantownfnb.org`
5. Select region (US for better performance)

### 1.2 DNS Configuration in Cloudflare
Add these DNS records in your Cloudflare dashboard:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT | @ | `v=spf1 include:mailgun.org ~all` | Auto |
| TXT | @ | `(DKIM record from Mailgun)` | Auto |
| MX | @ | `mxa.mailgun.org` | Auto |
| MX | @ | `mxb.mailgun.org` | Auto |
| CNAME | email | `mailgun.org` | Auto |

### 1.3 Get SMTP Credentials
1. In Mailgun, go to **Sending > Domain settings > SMTP credentials**
2. Note your credentials:
   - **Username:** `postmaster@morgantownfnb.org`
   - **Password:** (copy the generated password)

## 🌐 Step 2: Set Up Cloudflare Tunnel

### 2.1 Install Cloudflared
```bash
# Download cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb

# Verify installation
cloudflared --version
```

### 2.2 Authenticate with Cloudflare
```bash
cloudflared tunnel login
```
This opens a browser - select your `morgantownfnb.org` domain.

### 2.3 Create Tunnel
```bash
# Create tunnel
cloudflared tunnel create fnb-morgantown

# Note the tunnel ID that gets generated
```

### 2.4 Configure DNS
```bash
# Point your domain to the tunnel
cloudflared tunnel route dns fnb-morgantown morgantownfnb.org
```

### 2.5 Create Tunnel Configuration
Create `/home/$USER/.cloudflared/config.yml`:

```yaml
tunnel: fnb-morgantown
credentials-file: /home/$USER/.cloudflared/your-tunnel-id.json

ingress:
  - hostname: morgantownfnb.org
    service: http://localhost:3000
  - hostname: www.morgantownfnb.org
    service: http://localhost:3000
  - service: http_status:404
```

## 🐳 Step 3: Configure Docker for Production

### 3.1 Update Environment Variables
Edit `/home/setsuna/projects/fnb/.env.production`:

```env
# Mailgun SMTP Configuration
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@morgantownfnb.org
SMTP_PASS=your-actual-mailgun-password-here

# Production Email Settings
FROM_EMAIL=noreply@morgantownfnb.org
TO_EMAIL=organizers@morgantownfnb.org

# Application Settings
NODE_ENV=production
```

### 3.2 Create Production Deployment Script
Create `/home/setsuna/deploy-fnb.sh`:

```bash
#!/bin/bash
set -e

echo "🏴 Deploying Food Not Bombs Morgantown..."

# Navigate to project directory
cd /home/setsuna/projects/fnb

# Load environment variables
export $(cat .env.production | xargs)

# Build and start the application
docker-compose -f docker-compose.cloudflare.yml down
docker-compose -f docker-compose.cloudflare.yml pull
docker-compose -f docker-compose.cloudflare.yml up -d --build

# Wait for health check
echo "⏳ Waiting for application health check..."
sleep 30

# Check if app is healthy
if curl -f http://localhost:3000/ > /dev/null 2>&1; then
    echo "✅ Application is healthy"
else
    echo "❌ Application health check failed"
    exit 1
fi

echo "🎉 Deployment complete!"
echo "📧 Test email functionality at http://localhost:3000/contact"
```

Make it executable:
```bash
chmod +x /home/setsuna/deploy-fnb.sh
```

## 🚀 Step 4: Deploy Everything

### 4.1 Deploy the Application
```bash
# Run the deployment script
./deploy-fnb.sh
```

### 4.2 Start Cloudflare Tunnel
```bash
# Start tunnel (test first)
cloudflared tunnel run fnb-morgantown

# If it works, install as service
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

### 4.3 Test Everything
1. **Website:** Visit `https://morgantownfnb.org`
2. **Email:** Submit the contact form
3. **Monitoring:** Check Cloudflare Analytics

## 📊 Step 5: Monitoring & Maintenance

### 5.1 Create Monitoring Script
Create `/home/setsuna/monitor-fnb.sh`:

```bash
#!/bin/bash

# Check application health
if ! curl -f http://localhost:3000/ > /dev/null 2>&1; then
    echo "❌ $(date): Application health check failed" >> /var/log/fnb-monitor.log
    # Restart application
    cd /home/setsuna/projects/fnb
    docker-compose -f docker-compose.cloudflare.yml restart app
fi

# Check tunnel status
if ! systemctl is-active --quiet cloudflared; then
    echo "❌ $(date): Cloudflare tunnel is down" >> /var/log/fnb-monitor.log
    sudo systemctl restart cloudflared
fi

# Log success
echo "✅ $(date): All systems operational" >> /var/log/fnb-monitor.log
```

Add to crontab:
```bash
chmod +x /home/setsuna/monitor-fnb.sh
(crontab -l 2>/dev/null; echo "*/5 * * * * /home/setsuna/monitor-fnb.sh") | crontab -
```

### 5.2 Log Monitoring
```bash
# View application logs
docker-compose -f docker-compose.cloudflare.yml logs -f app

# View Cloudflare tunnel logs
journalctl -u cloudflared -f

# View monitoring logs
tail -f /var/log/fnb-monitor.log
```

## 🔧 Step 6: SSL and Security

### 6.1 Cloudflare SSL Settings
In Cloudflare dashboard:
1. Go to **SSL/TLS > Overview**
2. Set encryption mode to **Full (strict)**
3. Enable **Always Use HTTPS**
4. Enable **HTTP Strict Transport Security (HSTS)**

### 6.2 Security Headers
In Cloudflare dashboard under **Security > Settings**:
- Enable **Security Level: Medium**
- Enable **Bot Fight Mode**
- Configure **Rate Limiting** if needed

## 🎯 Quick Commands Reference

```bash
# Deploy application
./deploy-fnb.sh

# Check application status
docker-compose -f docker-compose.cloudflare.yml ps

# View logs
docker-compose -f docker-compose.cloudflare.yml logs -f

# Restart application
docker-compose -f docker-compose.cloudflare.yml restart

# Update application
git pull && ./deploy-fnb.sh

# Check tunnel status
sudo systemctl status cloudflared

# Restart tunnel
sudo systemctl restart cloudflared
```

## 🆘 Troubleshooting

### Application Issues
```bash
# Check if app is responding
curl http://localhost:3000/

# Check Docker logs
docker-compose -f docker-compose.cloudflare.yml logs app

# Rebuild from scratch
docker-compose -f docker-compose.cloudflare.yml down
docker system prune -f
./deploy-fnb.sh
```

### Tunnel Issues
```bash
# Check tunnel status
cloudflared tunnel info fnb-morgantown

# Test tunnel manually
cloudflared tunnel run fnb-morgantown

# Check DNS settings
dig morgantownfnb.org
```

### Email Issues
```bash
# Test SMTP connection
telnet smtp.mailgun.org 587

# Check Mailgun logs in dashboard
# Verify DNS records in Cloudflare
```

---

## 🎉 You're Live!

Once everything is set up:
- **Website:** https://morgantownfnb.org
- **Email:** Volunteers can contact via the form
- **Monitoring:** Cloudflare Analytics + your monitoring script
- **Updates:** Just run `./deploy-fnb.sh`

**Welcome to the professional Food Not Bombs presence online!** 🏴✊