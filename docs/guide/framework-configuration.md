# 框架配置

NekoBot 的主配置文件位于 `data/config.json`。首次启动时，框架会自动生成该文件并补齐缺失字段。

## 配置结构

当前配置采用一个 JSON 文件集中管理：

```json
{
  "framework_config": {},
  "provider_configs": {},
  "platforms": [],
  "conversation_config": {},
  "plugin_configs": {},
  "plugin_bindings": {},
  "permission_config": {},
  "moderation_config": {}
}
```

## framework_config

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `web_host` | string | `"0.0.0.0"` | WebUI/API 监听地址 |
| `web_port` | int | `6285` | WebUI/API 监听端口 |
| `enable_webui` | bool | `true` | 是否启用 WebUI/API 服务 |
| `log_level` | string | `"INFO"` | 日志级别 |
| `timezone` | string | `"Asia/Shanghai"` | 默认时区 |
| `api_flavor` | string | `"chat_completions"` | LLM API 风格 |

## provider_configs

Provider 配置是一个对象，key 为提供商名称，value 为配置：

```json
{
  "provider_configs": {
    "openai": {
      "api_key": "sk-...",
      "default_model": "gpt-4o"
    },
    "openai_compatible": {
      "api_key": "...",
      "base_url": "https://api.deepseek.com/v1",
      "default_model": "deepseek-chat"
    }
  }
}
```

详见 [LLM 接入](./llm-providers)。

## platforms

平台配置是数组。当前内置 `onebot_v11`：

```json
{
  "platforms": [
    {
      "type": "onebot_v11",
      "instance_uuid": "qq_bot_1",
      "enabled": true,
      "host": "0.0.0.0",
      "port": 6299,
      "path": "/ws",
      "access_token": "",
      "self_id": "123456789",
      "command_prefix": "/"
    }
  ]
}
```

详见 [平台配置](./platform-configuration)。

## conversation_config

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `max_history_len` | `50` | 单会话保留的历史消息数量 |
| `persistence_driver` | `"sqlite"` | 会话持久化驱动 |
| `auto_summary_threshold` | `20` | 自动摘要阈值 |

## plugin_configs

插件配置按插件名存储：

```json
{
  "plugin_configs": {
    "my_plugin": {
      "option": true
    }
  }
}
```

## plugin_bindings

插件绑定用于控制插件在某个配置 profile 下的启用状态和绑定信息：

```json
{
  "plugin_bindings": {
    "my_plugin": {
      "enabled": true
    }
  }
}
```

## permission_config

权限配置用于初始化权限引擎。当前常用字段包括：

```json
{
  "permission_config": {
    "owner_ids": ["12345678"],
    "rules": []
  }
}
```

如果未配置 `owner_ids` 和 `rules`，权限引擎不会启用，框架会使用默认放行策略。

## 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `NEKOBOT_WEBUI` | 控制 WebUI 开关，`0/false/no/off` 表示禁用 | `NEKOBOT_WEBUI=false` |
| `NEKOBOT_HOST` | 覆盖 WebUI 监听地址 | `NEKOBOT_HOST=127.0.0.1` |
| `NEKOBOT_PORT` | 覆盖 WebUI 监听端口 | `NEKOBOT_PORT=8080` |
| `NEKOBOT_LOG_DIR` | 日志目录 | `NEKOBOT_LOG_DIR=data/logs` |
| `NEKOBOT_DIST_DIR` | WebUI 静态文件目录 | `NEKOBOT_DIST_DIR=data/dist` |
| `NEKOBOT_CORS_ORIGINS` | CORS 允许来源，逗号分隔；`*` 表示不限制 | `NEKOBOT_CORS_ORIGINS=http://localhost:6285` |
| `NEKOBOT_JWT_SECRET` | 覆盖 JWT secret | `NEKOBOT_JWT_SECRET=...` |
| `NEKOBOT_DB_PATH` | 会话 SQLite 路径 | `NEKOBOT_DB_PATH=data/conversations.sqlite3` |

优先级：命令行参数 > 环境变量 > `config.json` > 内置默认值。

## 端口冲突

::: warning
WebUI/API 默认使用 `6285`，OneBot V11 WebSocket 默认使用 `6299`。两者必须使用不同端口。
:::

## 认证数据

WebUI 认证数据默认存储在：

- `data/auth.sqlite3`
- `data/jwt_secret.key`

首次创建管理员账号时，用户名为 `nekobot`，初始密码会随机生成并输出到启动日志中。初始密码只显示一次，请登录后及时修改。
