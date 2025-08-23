# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - TypeScript type checking and validation
- `npm run check:watch` - Continuous type checking

### Testing Email Functionality
1. Configure your Mailgun credentials in `.env` (see `.env.example`)
2. Run `npm run dev` to start the development server
3. Visit http://localhost:5173/contact to test the volunteer form
4. Check your configured email address or Mailgun dashboard for sent emails

## Project Architecture

### Framework & Structure
This is a SvelteKit 5 application with TypeScript, following the standard SvelteKit project structure:

- **Framework**: SvelteKit 5 with adapter-auto
- **Language**: TypeScript with strict mode
- **Email**: Mailgun API with environment-based configuration
- **Styling**: CSS custom properties for comprehensive dark/light theme system
- **Deployment**: Docker with multi-stage builds and health checks

### Key Components & Architecture

#### Theme System (`src/lib/stores/theme.ts` + `src/lib/components/ThemeToggle.svelte`)
- Comprehensive dark/light mode system using CSS custom properties
- Persistent theme storage in localStorage with `fnb-theme` key
- Defaults to dark mode (anarcho aesthetic)
- Accessible theme toggle with proper ARIA labels

#### Email System (`src/routes/contact/+page.server.ts`)
- Server-side form handling with validation
- Dual email sending: admin notification + user confirmation
- Mailgun API integration for reliable email delivery
- Environment-based configuration for domain and API key

#### Layout & Styling (`src/routes/+layout.svelte`)
- Global CSS custom properties defining anarcho aesthetic color palette
- Responsive design with accessibility focus (WCAG compliance)
- Eye-friendly colors (no pure white backgrounds)
- Smooth transitions and reduced motion support

### Environment Configuration
Uses `.env` files for configuration:
- `MAILGUN_API_KEY` - Your Mailgun private API key
- `MAILGUN_DOMAIN` - Your verified Mailgun domain (e.g., morgantownfnb.org)
- `FROM_EMAIL`, `TO_EMAIL` - Email addresses for sending/receiving emails

### Docker Deployment
- Multi-stage build with Node.js 18 Alpine
- Non-root user for security
- Health check endpoint via `healthcheck.js`
- Environment-based configuration for different deployment scenarios

## Important Development Notes

### Email Testing
The contact form sends both admin notifications and user confirmations via Mailgun. For development, ensure you have valid Mailgun credentials configured, or consider using Mailgun's sandbox domain for testing.

### Theme System
The theme system is tightly integrated with CSS custom properties. When modifying styles, ensure both light and dark themes remain accessible and maintain the anarcho aesthetic.

### SvelteKit 5 Specifics
This project uses SvelteKit 5 with the new runes syntax (`$props()`, `$state()`, etc.) and the latest Svelte 5 component patterns.

### Security Considerations
- No hardcoded secrets (all via environment variables)
- Docker runs as non-root user
- Server-side form validation and sanitization
- CSRF protection via SvelteKit's built-in handling