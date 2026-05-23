# 部署指南

本指南介绍如何在不同环境中部署 NekoBot。

## 部署方式

### 1. 本地运行（开发环境）

最简单的部署方式，适合开发和测试：

```bash
# 克隆项目
git clone https://github.com/OfficialNekoTeam/NekoBot.git
cd NekoBot

# 安装依赖
pnpm install
# 或
pip install -e .

# 运行
python -m nekobot
```

### 2. Docker 部署

使用 Docker 容器化部署，适合生产环境。

#### 使用官方镜像
```bash
# 拉取镜像
docker pull ghcr.io/officialnekoteam/nekobot:latest

# 运行容器
docker run -d \
  --name nekobot \
  -p 6285:6285 \
  -v ./data:/app/data \
  -e OPENAI_API_KEY="your-api-key" \
  ghcr.io/officialnekoteam/nekobot:latest
```

#### 使用 Docker Compose
创建 `docker-compose.yml`：

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

运行：
```bash
# 创建 .env 文件
echo "OPENAI_API_KEY=your-key" > .env
echo "ANTHROPIC_API_KEY=your-key" >> .env

# 启动服务
docker-compose up -d
```

### 3. 系统服务部署

使用 systemd 在 Linux 系统上作为服务运行。

#### 创建服务文件
`/etc/systemd/system/nekobot.service`：
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

# 数据目录
Environment="NEKOBOT_DATA_DIR=/var/lib/nekobot"

# 安全设置
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ReadWritePaths=/var/lib/nekobot

[Install]
WantedBy=multi-user.target
```

#### 设置和启动
```bash
# 创建用户和目录
sudo useradd -r -s /bin/false nekobot
sudo mkdir -p /opt/nekobot /var/lib/nekobot
sudo chown -R nekobot:nekobot /opt/nekobot /var/lib/nekobot

# 复制文件
sudo cp -r /path/to/nekobot/* /opt/nekobot/

# 重载 systemd
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start nekobot

# 设置开机自启
sudo systemctl enable nekobot

# 查看状态
sudo systemctl status nekobot
```

## 环境配置

### 数据目录结构
```
/var/lib/nekobot/
├── config.json          # 主配置文件
├── conversations.sqlite3 # 会话数据库
├── plugins/             # 插件目录
│   ├── plugin1/
│   └── plugin2/
├── logs/                # 日志目录
│   └── nekobot.log
└── cache/               # 缓存目录
```

### 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 密钥 | `sk-...` |
| `ANTHROPIC_API_KEY` | Anthropic API 密钥 | `sk-ant-...` |
| `GEMINI_API_KEY` | Google Gemini API 密钥 | `...` |
| `NEKOBOT_HOST` | Web UI 监听地址 | `0.0.0.0` |
| `NEKOBOT_PORT` | Web UI 监听端口 | `6285` |
| `NEKOBOT_WEBUI` | 启用/禁用 WebUI | `true` 或 `false` |
| `NEKOBOT_CORS_ORIGINS` | CORS 允许的源 | `http://localhost:3000,https://example.com` |
| `NEKOBOT_JWT_SECRET` | JWT 密钥（用于身份验证） | 随机字符串 |
| `TZ` | 时区设置 | `Asia/Shanghai` |

### 配置文件

主配置文件 `config.json` 可以放在以下位置（按优先级）：
1. `NEKOBOT_DATA_DIR/config.json`
2. `./data/config.json`（当前目录）
3. `/etc/nekobot/config.json`

## 网络配置

### 端口说明
| 端口 | 协议 | 用途 | 默认 |
|------|------|------|------|
| 6285 | HTTP | Web 管理界面 | 开启 |
| 6299 | WebSocket | OneBot 反向连接 | 可选 |

### 防火墙设置
```bash
# 开放 Web UI 端口
sudo ufw allow 6285/tcp

# 开放 OneBot 端口（如果需要）
sudo ufw allow 6299/tcp
```

### 反向代理（Nginx）
使用 Nginx 作为反向代理，支持 HTTPS：

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
        
        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

## 安全配置

### 1. 最小权限原则
- 使用专用用户运行服务
- 限制文件系统访问权限
- 禁用不必要的功能

### 2. API 密钥管理
- 使用环境变量而非配置文件
- 定期轮换密钥
- 使用密钥管理服务（如 Vault）

### 3. 网络隔离
- 将 NekoBot 部署在内网
- 使用 VPN 访问管理界面
- 配置防火墙规则

### 4. 日志审计
```bash
# 查看访问日志
tail -f /var/lib/nekobot/logs/nekobot.log

# 日志轮转配置 /etc/logrotate.d/nekobot
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

## 监控和维护

### 健康检查
```bash
# HTTP 健康检查
curl -f http://localhost:6285/health

# 服务状态检查
systemctl status nekobot

# 日志检查
tail -n 100 /var/lib/nekobot/logs/nekobot.log
```

### 性能监控
```bash
# 查看内存使用
ps aux | grep nekobot

# 查看网络连接
netstat -tulpn | grep 6285

# 查看磁盘使用
du -sh /var/lib/nekobot/
```

### 备份策略
```bash
# 备份配置和数据库
BACKUP_DIR="/backup/nekobot/$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR
cp /var/lib/nekobot/config.json $BACKUP_DIR/
cp /var/lib/nekobot/conversations.sqlite3 $BACKUP_DIR/

# 备份插件
tar -czf $BACKUP_DIR/plugins.tar.gz /var/lib/nekobot/plugins/

# 清理旧备份（保留30天）
find /backup/nekobot -type d -mtime +30 -exec rm -rf {} \;
```

## 扩展部署

### 高可用部署
对于高可用需求，可以部署多个 NekoBot 实例：

```nginx
upstream nekobot_servers {
    server 192.168.1.10:6285;
    server 192.168.1.11:6285;
    server 192.168.1.12:6285;
}

server {
    location / {
        proxy_pass http://nekobot_servers;
        # 负载均衡配置
    }
}
```

### 数据库分离
将会话数据库迁移到外部数据库：

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

## 故障排除

### 服务无法启动
```bash
# 查看错误日志
journalctl -u nekobot -n 50

# 检查端口占用
netstat -tulpn | grep :6285

# 检查权限
ls -la /var/lib/nekobot/
```

### Web UI 无法访问
1. 检查防火墙设置
2. 检查 Nginx 配置
3. 查看浏览器控制台错误
4. 检查跨域设置

### 插件加载失败
1. 检查插件目录权限
2. 查看插件依赖是否安装
3. 检查插件兼容性

### 性能问题
1. 检查内存使用情况
2. 查看数据库性能
3. 分析日志中的慢请求

## 更新升级

### 版本升级
```bash
# 停止服务
systemctl stop nekobot

# 备份数据
cp -r /var/lib/nekobot /var/lib/nekobot.backup

# 更新代码
cd /opt/nekobot
git pull origin main

# 更新依赖
pnpm install
# 或
pip install -e .

# 启动服务
systemctl start nekobot
```

### 数据库迁移
如果版本升级包含数据库变更：
```bash
# 备份数据库
cp /var/lib/nekobot/conversations.sqlite3 /var/lib/nekobot/conversations.backup.sqlite3

# 运行迁移脚本
python -m nekobot.migrate
```

## 下一步

- [框架配置](./framework-configuration.md) - 配置系统行为和权限
- [平台配置](./platform-configuration.md) - 配置聊天平台连接
- [LLM 提供商配置](./llm-providers.md) - 配置 AI 服务
- [插件开发](./plugin-development.md) - 扩展功能