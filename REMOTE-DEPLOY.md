# Remote Deployment Guide

## Overview

This repository includes automated remote deployment to push changes from your development machine to the production server at `desidia26@192.168.40.12`.

## Setup (One-time)

### 1. Set up SSH Key Access

First, copy your SSH public key to the remote server:

```bash
ssh-copy-id desidia26@192.168.40.12
```

Or follow the manual setup in `setup-remote-access.md`.

### 2. Verify SSH Access

Test that passwordless SSH works:

```bash
ssh desidia26@192.168.40.12 'echo "SSH access successful"'
```

## Usage

### Deploy to Remote Server

Run the deployment script:

```bash
# Using npm script (recommended)
npm run remote:deploy

# Or directly
./scripts/remote-deploy.sh
```

### What the Script Does

1. **Checks Git Status**: Ensures you're in a git repo and handles uncommitted changes
2. **Tests SSH Connection**: Verifies connection to remote server  
3. **Pushes to GitHub**: Pushes your changes to the origin/main branch
4. **Remote Deployment**: 
   - SSH to remote server
   - Pull latest changes from GitHub
   - Run Docker deployment
   - Check container status
5. **Verification**: Tests that the application is responding
6. **Summary**: Shows deployment information and access URLs

### Error Handling

The script includes comprehensive error handling:
- Git repository validation
- SSH connectivity tests
- Automatic commit prompts for uncommitted changes
- Remote command execution verification
- Application health checks

## Deployment Workflow

```
Local Changes → Git Commit → GitHub Push → Remote Pull → Docker Deploy → Verification
```

## Troubleshooting

### SSH Connection Issues
```bash
# Test SSH connection
ssh desidia26@192.168.40.12 'echo test'

# Copy SSH key if needed
ssh-copy-id desidia26@192.168.40.12
```

### Git Issues
```bash
# Check git status
git status

# Commit changes manually
git add .
git commit -m "Your commit message"
```

### Remote Server Issues
```bash
# Check remote containers
ssh desidia26@192.168.40.12 'cd /home/desidia26/projects/fnb && docker-compose ps'

# Check remote logs
ssh desidia26@192.168.40.12 'cd /home/desidia26/projects/fnb && docker-compose logs'
```

## Configuration

Edit the script configuration in `scripts/remote-deploy.sh`:

```bash
REMOTE_HOST="desidia26@192.168.40.12"
REMOTE_PROJECT_PATH="/home/desidia26/projects/fnb"
BRANCH="main"
```

## Security Notes

- Uses SSH key-based authentication (no passwords)
- Connects only to your specified remote server
- All commands are logged and visible during execution
- No sensitive information is transmitted