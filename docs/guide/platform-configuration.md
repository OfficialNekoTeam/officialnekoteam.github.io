# 平台配置

当前 NekoBot 内置 **OneBot V11** 平台适配器，平台类型为 `onebot_v11`。

## OneBot V11 配置

在 `data/config.json` 的 `platforms` 数组中添加：

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
      "access_token": "your-token",
      "self_id": "123456789",
      "command_prefix": "/"
    }
  ]
}
```

## 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `type` | string | 是 | - | 固定为 `onebot_v11` |
| `instance_uuid` | string | 是 | - | 平台实例唯一标识 |
| `enabled` | boolean | 否 | `true` | 是否启用该平台 |
| `host` | string | 否 | `0.0.0.0` | NekoBot 监听 WebSocket 的地址 |
| `port` | integer | 否 | `6299` | NekoBot 监听 WebSocket 的端口 |
| `path` | string | 否 | `/ws` | WebSocket 路径 |
| `access_token` | string | 否 | `null` | 连接鉴权 token |
| `self_id` | string | 否 | `null` | 机器人账号 ID |
| `command_prefix` | string | 否 | `/` | 命令前缀 |

## 连接方向

当前实现中，NekoBot 是 WebSocket 服务端：

```text
OneBot 实现 -> NekoBot
```

OneBot 实现需要连接：

```text
ws://<NekoBot host>:<port><path>
```

例如本机部署：

```text
ws://127.0.0.1:6299/ws
```

## access_token

如果配置了 `access_token`，OneBot 客户端连接时需要提供相同 token。当前支持两种方式：

- URL query：`ws://127.0.0.1:6299/ws?access_token=your-token`
- Header：`Authorization: Bearer your-token`

## 多实例

多个实例需要不同的 `instance_uuid`。如果同时启动多个 OneBot WebSocket 服务，端口也需要不同：

```json
{
  "platforms": [
    {
      "type": "onebot_v11",
      "instance_uuid": "main",
      "enabled": true,
      "port": 6299
    },
    {
      "type": "onebot_v11",
      "instance_uuid": "test",
      "enabled": true,
      "port": 6300
    }
  ]
}
```

## 支持的事件

OneBot V11 适配器会处理常见消息、通知和请求事件，并转换为框架事件：

- `message.private`
- `message.group`
- `notice.*`
- `request.*`

插件通常使用 `@event_handler(event="message.group")` 或命令装饰器处理事件。

## 常见问题

### 端口被占用

WebUI 默认端口是 `6285`，OneBot V11 默认端口是 `6299`。不要把两者配置为同一个端口。

### 连接建立但不能调用 API

NekoBot 通过同一个 WebSocket 连接向 OneBot 实现发送 action。如果 OneBot 实现没有返回对应 `echo`，API 调用会等待响应。遇到问题时请检查 OneBot 实现日志。

### 配置变更是否需要重启

修改监听地址、端口、路径等连接参数后建议重启 NekoBot。普通插件配置或 Provider 配置可以通过热重载机制生效。

## 相关文档

- [QQ 平台对接](./platforms/qq)
- [框架配置](./framework-configuration)
- [插件开发](../develop/plugin)
