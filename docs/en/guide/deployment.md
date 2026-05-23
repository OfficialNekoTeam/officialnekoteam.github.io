# Deployment Guide

This guide explains how to deploy NekoBot in different environments.

## Deployment Methods

### 1. Local Run (Development Environment)

The simplest deployment method, suitable for development and testing:

```bash
# Clone project
git clone https://github.com/OfficialNekoTeam/NekoBot.git
cd NekoBot

# Install dependencies
pnpm install
# or
pip install -e .

# Run
python -m nekobot
```

### 2. Docker Deployment

Use Docker containerization for deployment, suitable for production environments.

#### Using Official Image
```bash
# Pull image
docker pull ghcr.io/officialnekoteam/nekobot:latest

# Run container
docker run -d \
  --name nekobot \
  -p 6285:6285 \
  -v ./data:/app/data \
  -e OPENAI_API_KEY="your-api-key" \
  ghcr.io/officialnekoteam/nekobot:latest
```

#### Using Docker Compose
Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  nekobot:
    image: ghcr.io/officialnekoteam/nekobot:latest
    container_name: nekobot
    restart: unless-stopped
    ports:
      - "6285:6285"
    volumes:
      - ./data:/app/data
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - TZ=Asia/Shanghai
    env_file:
      - .env
```

Run:
```bash
# Create .env file
echo "OPENAI_API_KEY=your-key" > .env
echo "ANTHROPIC_API_KEY=your-key" >> .env

# Start services
docker-compose up -d
```

### 3. System Service Deployment

Use systemd to run as a service on Linux systems.

#### Create Service File
`/etc/systemd/system/nekobot.service`:
```ini
[Unit]
Description=NekoBot Chatbot Framework
After=network.target

[Service]
Type=simple
User=nekobot
WorkingDirectory=/opt/nekobot
ExecStart=/usr/bin/python -m nekobot
Restart=on-failure
RestartSec=5
Environment="PYTHONPATH=/opt/nekobot"
Environment="OPENAI_API_KEY=your-api-key"

# Data directory
Environment="NEKOBOT_DATA_DIR=/var/lib/nekobot"

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=/var/lib/nekobot

[Install]
WantedBy=multi-user.target
```

#### Setup and Start
```bash
# Create user and directories
sudo useradd -r -s /bin/false nekobot
sudo mkdir -p /opt/nekobot /var/lib/nekobot
sudo chown -R nekobot:nekobot /opt/nekobot /var/lib/nekobot

# Copy files
sudo cp -r /path/to/nekobot/* /opt/nekobot/

# Reload systemd
sudo systemctl daemon-reload

# Start service
sudo systemctl start nekobot

# Enable auto-start
sudo systemctl enable nekobot

# Check status
sudo systemctl status nekobot
```

## Environment Configuration

### Data Directory Structure
```
/var/lib/nekobot/
├── config.json          # Main configuration file
├── conversations.sqlite3 # Conversation database
├── plugins/             # Plugin directory
│   ├── plugin1/
│   └── plugin2/
├── logs/                # Log directory
│   └── nekobot.log
└── cache/               # Cache directory
```

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `ANTHROPIC_API_KEY` | Anthropic API key | `sk-ant-...` |
| `GEMINI_API_KEY` | Google Gemini API key | `...` |
| `NEKOBOT_HOST` | Web UI listening address | `0.0.0.0` |
| `NEKOBOT_PORT` | Web UI listening port | `6285` |
| `NEKOBOT_WEBUI` | Enable/disable WebUI | `true` or `false` |
| `NEKOBOT_CORS_ORIGINS` | CORS allowed origins | `http://localhost:3000,https://example.com` |
| `NEKOBOT_JWT_SECRET` | JWT secret (for authentication) | Random string |
| `TZ` | Timezone setting | `Asia/Shanghai` |

### Configuration Files

Main configuration file `config.json` can be placed in the following locations (in priority order):
1. `NEKOBOT_DATA_DIR/config.json`
2. `./data/config.json` (current directory)
3. `/etc/nekobot/config.json`

## Network Configuration

### Port Description
| Port | Protocol | Purpose | Default |
|------|----------|---------|---------|
| 6285 | HTTP | Web management interface | Enabled |
| 6299 | WebSocket | OneBot reverse connection | Optional |

### Firewall Settings
```bash
# Open Web UI port
sudo ufw allow 6285/tcp

# Open OneBot port (if needed)
sudo ufw allow 6299/tcp
```

### Reverse Proxy (Nginx)
Use Nginx as reverse proxy with HTTPS support:

```nginx
server {
    listen 80;
    server_name bot.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bot.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/bot.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bot.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:6285;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## Security Configuration

### 1. Principle of Least Privilege
- Use dedicated user to run service
- Restrict filesystem access permissions
- Disable unnecessary features

### 2. API Key Management
- Use environment variables instead of configuration files
- Regularly rotate keys
- Use key management services (e.g., Vault)

### 3. Network Isolation
- Deploy NekoBot in internal network
- Use VPN to access management interface
- Configure firewall rules

### 4. Log Auditing
```bash
# View access logs
tail -f /var/lib/nekobot/logs/nekobot.log

# Log rotation configuration /etc/logrotate.d/nekobot
/var/lib/nekobot/logs/nekobot.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 640 nekobot nekobot
}
```

## Monitoring and Maintenance

### Health Checks
```bash
# HTTP health check
curl -f http://localhost:6285/health

# Service status check
systemctl status nekobot

# Log check
tail -n 100 /var/lib/nekobot/logs/nekobot.log
```

### Performance Monitoring
```bash
# Check memory usage
ps aux | grep nekobot

# Check network connections
netstat -tulpn | grep 6285

# Check disk usage
du -sh /var/lib/nekobot/
```

### Backup Strategy
```bash
# Backup configuration and database
BACKUP_DIR="/backup/nekobot/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR
cp /var/lib/nekobot/config.json $BACKUP_DIR/
cp /var/lib/nekobot/conversations.sqlite3 $BACKUP_DIR/

# Backup plugins
tar -czf $BACKUP_DIR/plugins.tar.gz /var/lib/nekobot/plugins/

# Clean old backups (keep 30 days)
find /backup/nekobot -type d -mtime +30 -exec rm -rf {} \;
```

## Scaling Deployment

### High Availability Deployment
For high availability requirements, deploy multiple NekoBot instances:

```nginx
upstream nekobot_servers {
    server 192.168.1.10:6285;
    server 192.168.1.11:6285;
    server 192.168.1.12:6285;
}

server {
    location / {
        proxy_pass http://nekobot_servers;
        # Load balancing configuration
    }
}
```

### Database Separation
Migrate conversation database to external database:

```json
{
  "framework_config": {
    "database": {
      "url": "postgresql://user:password@localhost/nekobot",
      "pool_size": 10
    }
  }
}
```

## Troubleshooting

### Service Fails to Start
```bash
# View error logs
journalctl -u nekobot -n 50

# Check port usage
netstat -tulpn | grep :6285

# Check permissions
ls -la /var/lib/nekobot/
```

### Web UI Unaccessible
1. Check firewall settings
2. Check Nginx configuration
3. Check browser console errors
4. Check CORS settings

### Plugin Loading Failure
1. Check plugin directory permissions
2. Check plugin dependencies
3. Check plugin compatibility

### Performance Issues
1. Check memory usage
2. Check database performance
3. Analyze slow requests in logs

## Updates and Upgrades

### Version Upgrade
```bash
# Stop service
systemctl stop nekobot

# Backup data
cp -r /var/lib/nekobot /var/lib/nekobot.backup

# Update code
cd /opt/nekobot
git pull origin main

# Update dependencies
pnpm install
# or
pip install -e .

# Start service
systemctl start nekobot
```

### Database Migration
If version upgrade includes database changes:
```bash
# Backup database
cp /var/lib/nekobot/conversations.sqlite3 /var/lib/nekobot/conversations.backup.sqlite3

# Run migration script
python -m nekobot.migrate
```

## Next Steps

- [Framework Configuration](./framework-configuration.md) - Configure system behavior and permissions
- [Platform Configuration](./platform-configuration.md) - Configure chat platform connections
- [LLM Provider Configuration](./llm-providers.md) - Configure AI services
- [Plugin Development](./plugin-development.md) - Extend functionality