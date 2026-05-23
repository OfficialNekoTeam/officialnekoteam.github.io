# QQ 平台对接（OneBot V11）

NekoBot 当前通过 OneBot V11 协议接入 QQ。推荐搭配 NapCatQQ 等 OneBot V11 实现使用。

## 连接方式

当前实现是 **反向 WebSocket**：

```text
NapCatQQ / OneBot 实现 -> ws://NekoBot:6299/ws -> NekoBot
```

NekoBot 自己启动 WebSocket 服务，OneBot 实现作为客户端连接进来。

## NekoBot 配置

编辑 `data/config.json` 的 `platforms` 数组：

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

如果不需要访问令牌，可将 `access_token` 设为空字符串或删除该字段。公网或跨机器部署时建议设置访问令牌。

## NapCatQQ 配置

在 NapCatQQ 中添加 WebSocket 客户端连接，目标地址指向 NekoBot：

```text
ws://127.0.0.1:6299/ws
```

如果 NekoBot 和 NapCatQQ 不在同一台机器，将 `127.0.0.1` 改为 NekoBot 所在机器的 IP 或域名。

如果 NekoBot 配置了 `access_token`，NapCatQQ 中也需要填相同 token，或通过 `Authorization: Bearer <token>` 方式发送。

## 端口说明

| 服务 | 默认端口 |
|------|----------|
| WebUI/API | `6285` |
| OneBot V11 WebSocket | `6299` |

两个端口不能相同，否则启动会失败。

## 启动顺序

推荐顺序：

1. 启动 NekoBot
2. 确认日志出现 OneBot V11 transport listening
3. 启动 NapCatQQ 或启用其 WebSocket 客户端
4. 在 QQ 中发送消息测试

## 支持的消息

当前 OneBot V11 适配器会标准化以下常见消息段：

| 消息段 | 说明 |
|--------|------|
| `text` | 文本 |
| `at` | @ 用户 |
| `reply` | 回复消息 |
| `image` | 图片 |
| `record` | 语音 |
| `video` | 视频 |

框架会将消息解析为平台无关事件，插件通常只需要读取 `plain_text` 或通过上下文回复。

## 命令触发

默认命令前缀为 `/`。例如：

```text
/help
/hello NekoBot
```

可在平台配置中修改 `command_prefix`。

## 常见问题

### NapCatQQ 连接不上

检查：

1. NekoBot 是否已启动
2. `host` / `port` / `path` 是否和 NapCatQQ 连接地址一致
3. 防火墙是否允许访问端口 `6299`
4. `access_token` 是否一致
5. WebUI 端口 `6285` 是否误填成 OneBot 端口

### 收到消息但不回复

检查：

1. 是否配置了可用的 LLM Provider
2. 插件是否启用
3. 群聊是否需要 @ 或唤醒词
4. 日志中是否有 Provider、权限或插件错误

### 如何调用 OneBot API

插件一般通过 `reply()` 回复消息。高级场景可以在平台适配器或扩展代码中调用 `call_api()`，action 名称遵循 OneBot V11 规范，例如 `send_group_msg`、`get_msg`、`set_group_ban`。

## 相关链接

- [OneBot V11 规范](https://11.onebot.dev/)
- [NapCatQQ GitHub](https://github.com/NapNeko/NapCatQQ)
- [平台配置](../platform-configuration)
