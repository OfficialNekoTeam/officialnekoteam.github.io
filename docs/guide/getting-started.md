# 快速开始

本指南将帮助你快速上手 NekoBot，从安装到运行你的第一个机器人。

## 环境要求

- **Python**: 3.10 或更高版本
- **操作系统**: Windows / Linux / macOS
- **内存**: 建议 2GB 以上
- **网络**: 需要访问互联网以安装依赖和连接 LLM 服务
- **包管理器**: uv（推荐）或 pip

## 安装步骤

### 1. 克隆仓库

```bash
git clone https://github.com/OfficialNekoTeam/NekoBot.git
cd NekoBot
```

### 2. 安装依赖

NekoBot 使用 uv 作为推荐的包管理器，也支持传统的 pip。

#### 使用 uv（推荐）

```bash
# 安装 uv（如果尚未安装）
pip install uv

# 安装 NekoBot 及其依赖
uv pip install -e .
```

#### 使用 pip

```bash
# 安装 NekoBot 及其依赖
pip install -e .
```

### 3. 创建配置文件

首次运行时，NekoBot 会自动创建默认配置文件 `data/config.json`。

你也可以手动创建配置文件：

```json
{
  "command_prefix": "/",
  "server": {
    "host": "0.0.0.0",
    "port": 6285
  },
  "jwt": {
    "secret_key": "your-secret-key-here",
    "algorithm": "HS256",
    "access_token_expire_minutes": 30
  },
  "webui_enabled": true,
  "demo": false
}
```

### 4. 启动 NekoBot

```bash
# 使用 uv
uv run main.py

# 或使用 python
python main.py
```

### 5. 访问 Web 仪表盘

启动成功后，打开浏览器访问：

```
http://localhost:6285
```

### 6. 访问独立部署的 Web 仪表盘

如果你单独部署了 [NekoBot Dashboard](https://github.com/OfficialNekoTeam/NekoBot-Dashboard)：

1. 克隆仪表盘仓库
2. 安装依赖并启动开发服务器
3. 访问 `http://localhost:3000`
4. 配置 API 地址指向 NekoBot 后端

## 默认账户

NekoBot 提供了默认管理员账户：

- **用户名**: `nekobot`
- **密码**: `nekobot`

> **安全提示**: 首次登录后，系统会强制要求你修改密码，请务必修改以确保安全。

## CLI 命令

NekoBot 提供了命令行工具，用于管理和操作机器人。

| 命令 | 说明 |
|------|------|
| (默认) | 启动 NekoBot 服务器 |
| `reset-password` | 重置 WebUI 默认账户密码 |
| `version`, `-v` | 显示版本信息 |
| `help`, `-h` | 显示帮助信息 |

### 重置密码

```bash
# 使用 uv
uv run main.py reset-password

# 或使用 python
python main.py reset-password
```

> **注意**: 输入密码时无任何回显提示，直接输入密码后回车即可。

## 验证安装

启动 NekoBot 后，你应该能在终端看到类似的日志输出：

```
2025-XX-XX XX:XX:XX.XXX [INFO] 启动 NekoBot...
2025-XX-XX XX:XX:XX.XXX [INFO] 正在初始化 NekoBot 服务器...
2025-XX-XX XX:XX:XX.XXX [INFO] 平台适配器已注册: aiocqhttp
2025-XX-XX XX:XX:XX.XXX [INFO] 开始加载插件...
2025-XX-XX XX:XX:XX.XXX [INFO] 插件加载完成，共 X 个插件
2025-XX-XX XX:XX:XX.XXX [INFO] 启动 Quart 应用: http://0.0.0.0:6285
```

## 下一步

- [平台对接](./platforms.md) - 配置聊天平台（QQ、Telegram、Discord 等）
- [LLM 配置](./llm.md) - 配置 AI 模型（OpenAI、Gemini、Claude 等）
- [插件系统](./plugins.md) - 了解插件开发和安装
- [Web 仪表盘](./dashboard.md) - 了解仪表盘部署和功能

## 常见问题

### 如何修改端口？

编辑 `data/config.json` 文件，修改 `server.port` 字段：

```json
{
  "server": {
    "host": "0.0.0.0",
    "port": 8080
  }
}
```

### 忘记密码怎么办？

运行重置密码命令：

```bash
# 使用 uv
uv run main.py reset-password

# 或使用 python
python main.py reset-password
```

### 如何启用或禁用 Web 仪表盘？

编辑 `data/config.json`，修改 `webui_enabled` 字段：

```json
{
  "webui_enabled": true
}
```

### 如何查看日志？

- **终端日志**: NekoBot 使用 loguru 输出日志到终端
- **Web 仪表盘**: 通过"日志"页面实时查看日志
- **日志文件**: 日志文件保存在 `data/logs/` 目录

### 如何添加 LLM 提供商？

通过 Web 仪表盘添加：

1. 登录 Web 仪表盘
2. 进入"LLM 管理"页面
3. 点击"添加提供商"
4. 选择提供商类型并填写配置
5. 保存并启用提供商

### 如何安装插件？

NekoBot 支持两种插件安装方式：

1. **本地插件**: 将插件文件放入 `data/plugins/` 目录
2. **在线插件**: 通过 Web 仪表盘的插件管理页面安装

## Docker 部署

NekoBot 提供 Docker 镜像，支持容器化部署。

### 使用 Docker Compose

```bash
# 克隆仓库
git clone https://github.com/OfficialNekoTeam/NekoBot.git
cd NekoBot

# 启动容器
docker-compose up -d
```

### 单独使用 Docker

```bash
# 构建镜像
docker build -t nekobot .

# 运行容器
docker run -d -p 6285:6285 --name nekobot nekobot
```

## 相关项目

- [NekoBot](https://github.com/OfficialNekoTeam/NekoBot) - 主项目
- [NekoBot Dashboard](https://github.com/OfficialNekoTeam/NekoBot-Dashboard) - Web 管理后台
- [NekoBot Plugins Example](https://github.com/OfficialNekoTeam/NekoBot_Plugins_Example) - 插件示例
