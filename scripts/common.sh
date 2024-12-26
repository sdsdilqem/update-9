#!/bin/bash

# Colors for logging
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${YELLOW}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# System requirement checks
check_system_requirements() {
    log_info "Checking system requirements..."

    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi

    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi

    # Check required ports
    check_port_availability 3000 "Frontend port 3000 is already in use"
    check_port_availability 5000 "Backend port 5000 is already in use"

    log_success "System requirements check completed"
}

# Check if a port is available
check_port_availability() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        log_error "$2"
        exit 1
    fi
}

# Create directory if it doesn't exist
ensure_directory() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        log_info "Created directory: $1"
    fi
}

# Check if file exists
check_file() {
    if [ ! -f "$1" ]; then
        log_error "Required file not found: $1"
        exit 1
    fi
}

# Backup function
create_backup() {
    local source=$1
    local dest=$2
    if [ -f "$source" ]; then
        cp "$source" "$dest"
        log_info "Backup created: $dest"
    fi
}

# PM2 process management
restart_pm2_process() {
    local process_name=$1
    pm2 reload $process_name || pm2 start $process_name
    log_info "Restarted PM2 process: $process_name"
}

# Health check function
check_health() {
    local url=$1
    local max_retries=5
    local retry=0

    while [ $retry -lt $max_retries ]; do
        if curl -s "$url" > /dev/null; then
            return 0
        fi
        retry=$((retry+1))
        sleep 2
    done

    return 1
}