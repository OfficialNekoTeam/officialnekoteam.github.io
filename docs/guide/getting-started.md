# 快速开始

本文档将引导你在 5 分钟内完成 NekoBot 的安装与首次运行。

## 环境要求

- Python **3.13+**
- [uv](https://docs.astral.sh/uv/)（推荐）或 pip
- 网络连接（用于调用 LLM API）
- 已配置好的 QQ 机器人（NapCatQQ 或其他 OneBot V11 实现）

## 第一步：克隆仓库

```bash
git clone https://github.com/Carillen/NekoBot.git
cd NekoBot
```

## 第二步：安装依赖

```bash
# 推荐使用 uv
uv pip install -e .

# 或使用 pip
pip install -e .
```

## 第三步：启动

```bash
# 使用 uv
uv run main.py

# 或使用 python
python main.py
```

首次启动会在 `data/` 目录下自动生成 `config.json`。如果是第一次创建 WebUI 管理员账号，启动日志会输出初始登录信息：

```text
默认用户: nekobot
初始密码: <随机生成的密码>
```

### 6. 访问独立部署的 Web 仪表盘

如果你单独部署了 [NekoBot Dashboard](https://github.com/Carillen/NekoBot-Dashboard)：

1. 克隆仪表盘仓库
2. 安装依赖并启动开发服务器
3. 访问 `http://localhost:3000`
4. 配置 API 地址指向 NekoBot 后端

## 默认账户

## 第四步：打开 WebUI

启动成功后，访问 `http://localhost:6285` 进入 Web 管理界面。

在 WebUI 中完成以下配置：

1. **LLM 提供商** → 添加一个 OpenAI / Anthropic / Gemini / Compatible 提供商，填入 API Key。
2. **平台配置**（`data/config.json` 中的 `platforms` 字段） → 填写 OneBot V11 连接信息。
3. **插件管理** → 查看、配置、启用或热重载本地插件。

OneBot V11 的连接地址通常为：

```text
ws://127.0.0.1:6299/ws
```

在 NapCatQQ 等 OneBot 实现中配置 WebSocket 客户端连接到该地址。

## 启动参数

```
usage: main.py [--webui | --no-webui] [--config PATH] [--host HOST] [--port PORT]
```

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--webui` / `--no-webui` | 启用或禁用 WebUI | 启用 |
| `--config PATH` | 指定配置文件路径 | `data/config.json` |
| `--host HOST` | WebUI 监听地址 | `0.0.0.0` |
| `--port PORT` | WebUI 监听端口 | `6285` |

## 常见问题

**Q: WebUI 无法访问**

确认 `--no-webui` 没有被传入，且端口 6285 未被占用。

**Q: OneBot 适配器和 WebUI 端口冲突**

1. **本地插件**: 将插件文件放入 `data/plugins/` 目录
2. **在线插件**: 通过 Web 仪表盘的插件管理页面安装

## Docker 部署

NekoBot 提供 Docker 镜像，支持容器化部署。

### 使用 Docker Compose

```bash
# 克隆仓库
git clone https://github.com/Carillen/NekoBot.git
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

**Q: `Address already in use` 错误**

- [NekoBot](https://github.com/Carillen/NekoBot) - 主项目
- [NekoBot Dashboard](https://github.com/Carillen/NekoBot-Dashboard) - Web 管理后台
- [NekoBot Plugin Template](https://github.com/Carillen/nekobot_plugin_template) - 插件模板
