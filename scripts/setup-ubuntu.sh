#!/bin/bash

# Exit on error
set -e

# Source common functions
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/common.sh"

# Update system packages
update_system() {
    log_info "Updating system packages..."
    sudo apt-get update
    sudo apt-get upgrade -y
}

# Install Node.js and npm
install_node() {
    log_info "Installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
}

# Install PM2
install_pm2() {
    log_info "Installing PM2..."
    sudo npm install -g pm2
}

# Configure firewall
setup_firewall() {
    log_info "Configuring firewall..."
    sudo apt-get install -y ufw
    sudo ufw allow ssh
    sudo ufw allow 80/tcp
    sudo ufw allow 443/tcp
    sudo ufw allow 3000/tcp
    sudo ufw allow 5000/tcp
    sudo ufw --force enable
}

# Install and configure Nginx
setup_nginx() {
    log_info "Setting up Nginx..."
    sudo apt-get install -y nginx
    
    # Create Nginx configuration
    sudo tee /etc/nginx/sites-available/marketplace << EOF
server {
    listen 80;
    server_name your_domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/marketplace /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
}

# Main setup flow
main() {
    log_info "Starting Ubuntu server setup..."
    
    update_system
    install_node
    install_pm2
    setup_firewall
    setup_nginx
    
    log_success "Ubuntu server setup completed!"
    
    echo -e "\nNext steps:"
    echo "1. Update Nginx configuration with your domain"
    echo "2. Setup SSL with Certbot"
    echo "3. Run the main setup.sh script"
}

# Run main function
main