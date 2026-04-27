# 安装

## 系统要求

| 条件 | 要求 |
|------|------|
| Python | 3.13 或更高 |
| 操作系统 | Linux / macOS / Windows（推荐 WSL） |
| 包管理器 | uv（推荐）或 pip |

## 使用 uv 安装（推荐）

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh

git clone https://github.com/OfficialNekoTeam/NekoBot.git
cd NekoBot
uv sync
```

启动：

```bash
uv run main.py
```

## 使用 pip 安装

```bash
git clone https://github.com/OfficialNekoTeam/NekoBot.git
cd NekoBot
pip install -e .
python main.py
```

## 首次启动

首次启动会创建 `data/` 目录和默认配置文件。WebUI 管理员账号如下：

```text
默认用户: nekobot
初始密码: 启动日志中随机生成
```

初始密码只在首次创建账号时输出，请登录后立即修改密码。

## 目录结构

运行后常见目录如下：

```text
data/
├── auth.sqlite3             # WebUI 用户认证数据
├── config.json              # 主配置文件
├── conversations.sqlite3    # 会话数据库
├── dist/                    # WebUI 静态文件，可选
├── jwt_secret.key           # JWT secret
├── logs/                    # 日志目录
├── plugins/                 # 插件目录
└── skills/                  # Skill 目录
```

## WebUI 前端

WebUI 前端静态文件默认从 `data/dist/` 提供。若该目录不存在，NekoBot 仍会提供 API 服务，但没有前端页面。

如需部署前端：

```bash
# 在 dashboard 项目中构建
pnpm install
pnpm build

# 复制到 NekoBot
rm -rf /path/to/NekoBot/data/dist/*
cp -r dist/. /path/to/NekoBot/data/dist/
```

也可以通过环境变量指定静态文件目录：

```bash
NEKOBOT_DIST_DIR=/path/to/dist uv run main.py
```

## 启动参数

```bash
python main.py --help
```

常用参数：

| 参数 | 说明 |
|------|------|
| `--webui` / `--no-webui` | 启用或禁用 WebUI |
| `--config PATH` | 指定配置文件 |
| `--host HOST` | WebUI/API 监听地址 |
| `--port PORT` | WebUI/API 监听端口 |

## 核心依赖

| 包 | 说明 |
|----|------|
| `quart` | WebUI/API 和 OneBot WebSocket 服务 |
| `hypercorn` | ASGI 服务器 |
| `aiohttp` | HTTP 客户端 |
| `aiosqlite` | SQLite 异步访问 |
| `openai` | OpenAI / OpenAI-compatible Provider |
| `anthropic` | Anthropic Provider |
| `google-genai` | Gemini Provider |
| `mcp` | Model Context Protocol 支持 |
| `watchfiles` | 配置和插件热重载 |

## 下一步

- [快速开始](./getting-started)
- [框架配置](./framework-configuration)
- [QQ 平台对接](./platforms/qq)
