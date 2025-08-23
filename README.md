# Food Not Bombs Morgantown

A modern, activist-themed web application for the Morgantown, West Virginia chapter of Food Not Bombs. Built with SvelteKit 5 and featuring a comprehensive volunteer management system with email functionality.

## 🏴 Features

- 🍽️ **Chapter Information** - Local meeting times, volunteer opportunities, and mission details
- 📧 **Volunteer Contact System** - Comprehensive form for new volunteers with automated email responses
- 🎨 **Anarcho Aesthetic** - Dark/light mode with revolutionary design and accessibility-first approach
- 📅 **Event Scheduling** - Weekly meal sharing, food prep sessions, and monthly meetings
- 🐳 **Docker Ready** - Complete containerization for easy deployment
- 📨 **Built-in SMTP** - Local development email server with production SMTP support
- ♿ **Accessibility** - WCAG compliant with proper contrast ratios and keyboard navigation
- ⚡ **Modern Stack** - SvelteKit 5, TypeScript, and Vite for lightning-fast performance

## 🚀 Quick Start

### Development Setup

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd fnb
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings (defaults work for development)
   ```

3. **Start development servers:**
   ```bash
   # Option 1: Start everything at once
   npm run dev:full
   
   # Option 2: Start separately (recommended for debugging)
   npm run smtp    # Terminal 1: SMTP server
   npm run dev     # Terminal 2: Web server
   ```

4. **Access the application:**
   - 🌐 **Web app:** http://localhost:5173
   - 📧 **Mail interface:** http://localhost:1080
   - 🎨 **Theme toggle:** Top-right corner (defaults to dark mode)

## 🐳 Production Deployment

### Docker Compose (Recommended)

1. **Development/Testing (with MailDev):**
   ```bash
   docker-compose up -d
   ```
   - App: http://localhost:3000
   - Mail: http://localhost:1080

2. **Production (with your SMTP):**
   ```bash
   # Configure your SMTP settings
   cp .env.example .env.production
   # Edit .env.production with your production SMTP details
   
   # Deploy with production config
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Manual Docker Build

```bash
# Build the image
docker build -t food-not-bombs-morgantown .

# Run with your SMTP configuration
docker run -d -p 3000:3000 \
  -e SMTP_HOST=your-smtp-server.com \
  -e SMTP_PORT=587 \
  -e SMTP_USER=your-username \
  -e SMTP_PASS=your-password \
  -e FROM_EMAIL=noreply@fnbmorgantown.org \
  -e TO_EMAIL=organizers@fnbmorgantown.org \
  food-not-bombs-morgantown
```

### Home Hardware Deployment Notes

- **Port Configuration:** The app runs on port 3000 by default
- **SMTP Setup:** Configure your home router/firewall for email delivery
- **Domain Setup:** Point your domain to your home IP address
- **SSL/TLS:** Consider using a reverse proxy (nginx) for HTTPS

## ⚙️ Configuration

### Environment Variables

All configuration is handled through environment variables. See `.env.example` for all available options:

```env
# SMTP Configuration (required for email functionality)
SMTP_HOST=localhost              # Your SMTP server hostname
SMTP_PORT=1025                  # SMTP port (1025 for dev, 587 for production)
SMTP_SECURE=false               # Use TLS (true for port 465)
SMTP_USER=                      # SMTP username (if required)
SMTP_PASS=                      # SMTP password (if required)

# Email Settings
FROM_EMAIL=noreply@fnbmorgantown.local    # Sender email address
TO_EMAIL=organizers@fnbmorgantown.local   # Recipient email address
```

### 🎨 Theme System

The application features a comprehensive dark/light mode system:

- **Default:** Dark mode (anarcho aesthetic)
- **Toggle:** Floating button in top-right corner
- **Persistence:** Theme choice saved in localStorage
- **Accessibility:** WCAG compliant contrast ratios
- **Features:** 
  - Eye-friendly colors (no pure white backgrounds)
  - High contrast mode support
  - Reduced motion support
  - Screen reader compatibility

### 📧 SMTP Configuration Options

| Environment | SMTP Setup | Use Case |
|-------------|------------|----------|
| **Development** | MailDev (localhost:1025) | Local testing & development |
| **Home Server** | Your ISP/router SMTP | Self-hosted deployment |
| **Cloud SMTP** | Gmail, SendGrid, Mailgun | Professional deployment |

**Popular SMTP Providers:**
- **Gmail:** `smtp.gmail.com:587` (requires app password)
- **SendGrid:** `smtp.sendgrid.net:587` 
- **Mailgun:** Check your Mailgun dashboard
- **Home ISP:** Contact your internet provider

## 📁 Project Structure

```
food-not-bombs-morgantown/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   └── ThemeToggle.svelte    # Dark/light mode toggle
│   │   └── stores/
│   │       └── theme.ts              # Theme state management
│   ├── routes/
│   │   ├── +layout.svelte            # Global layout & theme system
│   │   ├── +page.svelte              # Home page (chapter info)
│   │   └── contact/
│   │       ├── +page.svelte          # Volunteer contact form
│   │       └── +page.server.ts       # Email handling & validation
│   └── app.html                      # HTML template
├── static/
│   ├── fnb-logo.png                  # Official Food Not Bombs logo
│   └── robots.txt                    # SEO configuration
├── docker-compose.yml                # Development + MailDev
├── docker-compose.prod.yml           # Production deployment
├── Dockerfile                        # Multi-stage container build
├── healthcheck.js                    # Container health monitoring
├── .env.example                      # Environment configuration template
└── README.md                         # This documentation
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (port 5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run smtp` | Start MailDev SMTP server (ports 1025/1080) |
| `npm run dev:full` | Start both SMTP and dev server |
| `npm run check` | TypeScript type checking |

## 🧪 Testing the Application

### Email Functionality
1. **Start development:** `npm run dev:full`
2. **Submit volunteer form:** http://localhost:5173/contact
3. **View emails:** http://localhost:1080 (MailDev interface)
4. **Check logs:** Both admin notification and volunteer confirmation emails

### Theme System
1. **Toggle themes:** Click the sun/moon icon (top-right)
2. **Test accessibility:** Use keyboard navigation
3. **Verify persistence:** Refresh page, theme should persist

## 🏡 Morgantown Chapter Information

### Current Schedule (as displayed on site)
- **Weekly Meal Sharing:** Sundays at 2:00 PM (downtown Morgantown)
- **Food Prep:** Saturdays at 12:00 PM (Community Kitchen)  
- **Monthly Meeting:** First Friday, 7:00 PM (WVU Student Union)

### Volunteer Opportunities
- Meal preparation and serving
- Food recovery from local businesses
- Event organization and planning
- Outreach and community engagement

## 🔒 Security & Best Practices

- ✅ **No hardcoded secrets** - All sensitive data via environment variables
- ✅ **Non-root containers** - Docker runs as unprivileged user
- ✅ **Input validation** - Server-side form validation and sanitization
- ✅ **CSRF protection** - SvelteKit's built-in CSRF handling
- ✅ **Health monitoring** - Container health checks for reliability
- ✅ **Accessibility** - WCAG 2.1 AA compliant design

## 🛡️ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | SvelteKit 5 + TypeScript | Modern reactive web framework |
| **Styling** | CSS Custom Properties | Theme system & responsive design |
| **Email** | Nodemailer + dotenv | SMTP integration & configuration |
| **Development** | Vite + MailDev | Fast dev server & local email testing |
| **Deployment** | Docker + Docker Compose | Containerized deployment |
| **Accessibility** | ARIA + Semantic HTML | Screen reader & keyboard support |

## 🤝 Contributing

This is a chapter-specific website for Food Not Bombs Morgantown. To customize for your chapter:

1. **Update content** in `src/routes/+page.svelte` with your meeting times
2. **Configure emails** in `.env` with your chapter's contact information
3. **Modify branding** while maintaining the Food Not Bombs identity
4. **Deploy** to your own hosting infrastructure

## 🏴 About Food Not Bombs

Food Not Bombs is a loose-knit group of independent collectives, sharing free vegan and vegetarian meals with the hungry in over 1,000 cities around the world to protest war, poverty and the destruction of the environment.

**Core Principles:**
- All food shared is vegan or vegetarian and free
- Anyone can start a Food Not Bombs group
- Food Not Bombs has no leaders
- Decisions are made by consensus

**Learn More:** [foodnotbombs.net](http://foodnotbombs.net)

---

*🍽️ Food is a Human Right, Not a Privilege ✊*
