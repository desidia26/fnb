#!/bin/bash
# Remote deployment script for Food Not Bombs Morgantown
# Pushes changes from this machine and deploys on remote server

set -e  # Exit on any error

# Configuration
REMOTE_HOST="desidia26@192.168.40.128"
REMOTE_PROJECT_PATH="/home/desidia26/projects/fnb"
BRANCH="main"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a git repository"
        exit 1
    fi
}

# Check for uncommitted changes
check_git_status() {
    if ! git diff-index --quiet HEAD --; then
        log_warning "You have uncommitted changes"
        read -p "Do you want to commit them now? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add .
            commit_message="Auto-commit before deployment - $(date '+%Y-%m-%d %H:%M:%S')"
            git commit -m "$commit_message"
            log_success "Changes committed: $commit_message"
        else
            log_error "Please commit your changes before deploying"
            exit 1
        fi
    fi
}

# Test SSH connection
test_ssh_connection() {
    log_info "Testing SSH connection to $REMOTE_HOST..."
    if ssh -o ConnectTimeout=10 -o BatchMode=yes "$REMOTE_HOST" 'echo "SSH connection successful"' >/dev/null 2>&1; then
        log_success "SSH connection established"
    else
        log_error "SSH connection failed. Please check your SSH setup."
        log_info "Run: ssh-copy-id $REMOTE_HOST"
        exit 1
    fi
}

# Push changes to GitHub
push_to_github() {
    log_info "Pushing changes to GitHub..."
    git push origin "$BRANCH"
    log_success "Changes pushed to GitHub"
}

# Deploy on remote server
deploy_remote() {
    log_info "Deploying on remote server..."
    
    # Create deployment command
    DEPLOY_CMD="cd $REMOTE_PROJECT_PATH && \
                echo '📡 Pulling latest changes...' && \
                git pull origin $BRANCH && \
                echo '🐳 Running deployment script...' && \
                ./scripts/deploy.sh && \
                echo '📊 Checking container status...' && \
                docker compose ps"
    
    # Execute deployment on remote
    if ssh "$REMOTE_HOST" "$DEPLOY_CMD"; then
        log_success "Remote deployment completed successfully"
    else
        log_error "Remote deployment failed"
        exit 1
    fi
}

# Test deployment
test_deployment() {
    log_info "Testing remote deployment..."
    
    # Test if the application is responding
    if ssh "$REMOTE_HOST" "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/" | grep -q "200"; then
        log_success "Application is responding correctly"
    else
        log_warning "Application might not be responding correctly"
    fi
}

# Show deployment info
show_deployment_info() {
    echo
    echo "🎉 Deployment Summary:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🖥️  Remote Server: $REMOTE_HOST"
    echo "📁 Project Path: $REMOTE_PROJECT_PATH"
    echo "🌿 Branch: $BRANCH"
    echo "⏰ Deployed at: $(date)"
    echo
    echo "🔗 Access your site through Cloudflare Tunnel"
    echo "📱 Local test: http://192.168.40.12:3000"
    echo
}

# Main execution
main() {
    echo "🏴 Food Not Bombs Morgantown - Remote Deployment"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    check_git_repo
    check_git_status
    test_ssh_connection
    push_to_github
    deploy_remote
    test_deployment
    show_deployment_info
    
    log_success "🎊 Remote deployment completed successfully!"
}

# Run main function
main "$@"