# 快速开始

本文档将引导你在 5 分钟内完成 NekoBot 的安装与首次运行。

## 环境要求

- Python **3.13+**
- [uv](https://docs.astral.sh/uv/)（推荐）或 pip
- 网络连接（用于调用 LLM API）
- 已配置好的 QQ 机器人（NapCatQQ 或其他 OneBot V11 实现）

## 第一步：克隆仓库

```bash
git clone https://github.com/OfficialNekoTeam/NekoBot.git
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

初始密码只会在首次创建账号时输出，请登录后立即修改密码。

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

两者必须使用**不同端口**。WebUI 默认 `6285`，OneBot V11 适配器默认 `6299`，不要在配置中手动将两者设为同一端口。

**Q: `Address already in use` 错误**

有残留进程占用了端口，运行 `lsof -i :6285` 找到进程并 kill 掉。
