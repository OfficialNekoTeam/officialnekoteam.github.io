# 平台对接

NekoBot 通过平台适配器接入聊天平台。当前内置平台是 **OneBot V11**，主要用于接入 QQ 机器人实现，例如 NapCatQQ。

## 支持状态

| 平台 | 协议/类型 | 当前状态 |
|------|----------|----------|
| QQ | `onebot_v11` | 已内置 |
| Telegram | - | 规划中 |
| Discord | - | 规划中 |
| 飞书 | - | 规划中 |
| Slack | - | 规划中 |
| 企业微信 | - | 规划中 |
| KOOK | - | 规划中 |
| QQ 频道 | - | 规划中 |

::: tip
文档中未列为“已内置”的平台，需要通过自定义平台适配器或后续版本支持。
:::

## 配置位置

平台配置位于 `data/config.json` 的 `platforms` 数组中：

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

字段说明：

| 字段 | 说明 |
|------|------|
| `type` | 平台类型，OneBot V11 固定为 `onebot_v11` |
| `instance_uuid` | 平台实例唯一 ID，用于区分多个机器人 |
| `enabled` | 是否启用该实例 |
| `host` | NekoBot 监听 WebSocket 的地址 |
| `port` | NekoBot 监听 WebSocket 的端口 |
| `path` | WebSocket 路径，默认 `/ws` |
| `access_token` | 可选访问令牌，OneBot 客户端连接时需一致 |
| `self_id` | 机器人账号 ID，可选 |
| `command_prefix` | 命令前缀，默认 `/` |

## 连接方向

当前 OneBot V11 实现采用反向 WebSocket：

```text
OneBot 实现（NapCatQQ 等） -> 连接到 -> NekoBot WebSocket 服务
```

也就是说，NekoBot 会监听 `ws://<host>:<port><path>`，OneBot 实现需要配置为连接这个地址。

## 多实例

可以同时配置多个 OneBot V11 实例，但每个实例需要唯一的 `instance_uuid`。如果多个实例使用不同端口，也需要分别配置 `port`。

```json
{
  "platforms": [
    {
      "type": "onebot_v11",
      "instance_uuid": "qq_bot_main",
      "enabled": true,
      "host": "0.0.0.0",
      "port": 6299,
      "path": "/ws"
    },
    {
      "type": "onebot_v11",
      "instance_uuid": "qq_bot_test",
      "enabled": false,
      "host": "0.0.0.0",
      "port": 6300,
      "path": "/ws"
    }
  ]
}
```

## 消息处理流程

```text
OneBot WebSocket 事件
    ↓
OneBotV11EventParser 标准化事件
    ↓
平台 Dispatcher
    ↓
命令处理 / 插件事件处理 / on_event fallback
    ↓
LLM fallback
    ↓
通过 OneBot API 回复消息
```

## WebUI 管理

WebUI 可用于查看和修改平台配置。修改配置后会写入 `data/config.json`；部分平台连接参数变更需要重启进程才能重新监听端口。

## 相关文档

- [QQ / OneBot V11](./platforms/qq)
- [平台配置](./platform-configuration)
- [平台适配器开发](../develop/platform-adapter)
