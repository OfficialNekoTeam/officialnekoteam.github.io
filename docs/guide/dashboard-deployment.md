# Web 仪表盘部署

本指南介绍如何部署 NekoBot Dashboard，包括开发环境、生产环境和独立部署。

## 前置要求

- Node.js 18+
- npm 或 pnpm
- NekoBot 后端服务运行中

## 部署方式

### 方式一：集成部署（默认）

NekoBot 后端默认内置了 Web 仪表盘，直接启动后端即可使用。

```bash
# 启动 NekoBot
cd NekoBot
uv run main.py

# 访问仪表盘
# http://localhost:6285
```

### 方式二：独立部署

单独部署前端仪表盘，适用于需要独立管理前端的场景。

#### 1. 克隆仪表盘仓库

```bash
git clone https://github.com/NekoBotTeam/NekoBot-Dashboard.git
cd NekoBot-Dashboard
```

#### 2. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm
pnpm install
```

#### 3. 配置环境变量

创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:6285
```

如果你的 NekoBot 后端运行在其他地址，请相应修改：

```env
VITE_API_BASE_URL=http://your-backend-url:6285
```

#### 4. 开发模式

```bash
npm run dev
```

访问 `http://localhost:3000`

#### 5. 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

构建完成后，`dist` 目录包含所有静态文件，可以部署到任何静态文件服务器。

## 部署到静态服务器

### Nginx

```nginx
server {
    listen 80;
    server_name dashboard.nekobot.dev;
    root /var/www/nekobot-dashboard/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 代理 API 请求到后端
    location /api/ {
        proxy_pass http://localhost:6285;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Vercel

1. Fork 仪表盘仓库到你的 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 设置环境变量 `VITE_API_BASE_URL`
4. 部署

### Netlify

1. Fork 仪表盘仓库到你的 GitHub
2. 在 [Netlify](https://netlify.com) 导入项目
3. 设置构建命令 `npm run build`
4. 设置发布目录 `dist`
5. 添加环境变量 `VITE_API_BASE_URL`
6. 部署

### Docker

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
docker build -t nekobot-dashboard .
docker run -d -p 80:80 --name dashboard nekobot-dashboard
```

## API 配置

### 开发环境

在 `.env` 文件中配置：

```env
VITE_API_BASE_URL=http://localhost:6285
```

### 生产环境

构建时设置环境变量：

```bash
VITE_API_BASE_URL=https://api.nekobot.dev npm run build
```

或在构建后的 `dist/assets/*.js` 中查找并替换 API 地址。

## 存储配置

仪表盘使用 localStorage 存储以下数据：

| 键名 | 说明 |
|------|------|
| `nekobot_token` | 用户认证令牌 |
| `nekobot_username` | 用户名 |
| `nekobot_theme` | 主题设置 |
| `nekobot_language` | 语言设置 |
| `nekobot_settings` | 系统设置 |

## 安全配置

### 启用 HTTPS

生产环境建议使用 HTTPS：

1. 使用 Let's Encrypt 获取免费 SSL 证书
2. 配置 Nginx 使用证书
3. 强制 HTTP 重定向到 HTTPS

### CORS 配置

如果前端和后端部署在不同域名，需要配置后端 CORS：

```python
# NekoBot 后端配置
CORS_ORIGINS = [
    "https://dashboard.nekobot.dev",
    "http://localhost:3000"
]
```

### 访问控制

确保后端 API 启用了认证：

```json
{
  "jwt": {
    "secret_key": "your-secret-key",
    "algorithm": "HS256",
    "access_token_expire_minutes": 30
  }
}
```

## 监控和日志

### 前端错误监控

可以使用 Sentry 等服务监控前端错误：

```bash
npm install @sentry/react
```

### 性能监控

使用 Vite 自带的性能分析：

```bash
npm run build -- --mode analyze
```

## 更新部署

### 更新流程

1. 拉取最新代码
2. 安装依赖
3. 构建生产版本
4. 部署到服务器

```bash
git pull origin main
npm install
npm run build
# 部署 dist 目录
```

### 版本管理

仪表盘版本在构建时自动生成，可在"设置"页面查看。

## 故障排查

### API 连接失败

1. 检查后端服务是否运行
2. 验证 API 地址配置
3. 检查网络连接
4. 查看浏览器控制台错误

### 登录失败

1. 确认后端认证服务正常
2. 检查用户名密码
3. 查看 JWT 配置
4. 检查 localStorage 中的 token

### 构建失败

1. 清除 node_modules 和缓存
2. 重新安装依赖
3. 检查 Node.js 版本

```bash
rm -rf node_modules package-lock.json
npm install
```

## 最佳实践

1. **使用环境变量** - 不要在代码中硬编码配置
2. **启用 HTTPS** - 保护数据传输安全
3. **定期更新** - 保持依赖和代码最新
4. **监控性能** - 使用工具监控应用性能
5. **备份数据** - 定期备份重要配置

## 相关链接

- [仪表盘介绍](./dashboard.md)
- [功能详细说明](./dashboard-features.md)
- [GitHub 仓库](https://github.com/NekoBotTeam/NekoBot-Dashboard)