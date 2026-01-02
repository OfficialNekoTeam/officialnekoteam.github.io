# 平台对接

NekoBot 支持多个主流聊天平台，通过统一的平台适配器接口实现跨平台消息处理。

## 支持的平台

| 平台 | 协议/类型 | 流式消息 | 状态 |
|------|----------|---------|------|
| **QQ** | OneBot V11 | 否 | ✅ |
| **Discord** | Discord Bot API | 否 | ✅ |
| **Telegram** | Telegram Bot API | 是 | ✅ |
| **飞书** | 飞书官方 API | 否 | ✅ |
| **KOOK** | 开黑平台 | 是 | ✅ |
| **QQ频道** | QQ频道官方 API | 是 | ✅ |
| **Slack** | Slack Bot API | 否 | ✅ |
| **企业微信** | 企业微信官方 API | 否 | ✅ |

## 快速开始

选择一个平台开始配置：

- [QQ (OneBot V11)](./platforms/qq.md) - 通过 NapCatQQ/NapCat 对接 QQ
- [Discord](./platforms/discord.md) - 使用 Discord Bot API
- [Telegram](./platforms/telegram.md) - 使用 Telegram Bot API
- [飞书](./platforms/feishu.md) - 使用飞书官方 API
- [KOOK](./platforms/kook.md) - 使用开黑平台 API
- [QQ频道](./platforms/qqchannel.md) - 使用 QQ频道官方 API
- [Slack](./platforms/slack.md) - 使用 Slack Bot API
- [企业微信](./platforms/wecom.md) - 使用企业微信官方 API

## 平台配置

### 通过 Web 仪表盘添加

1. 登录 Web 仪表盘
2. 进入"平台管理"页面
3. 点击"添加平台"
4. 选择平台类型并填写配置
5. 保存并启用平台

### 通过配置文件添加

编辑 `data/platforms_sources.json`：

```json
{
  "aiocqhttp": {
    "type": "aiocqhttp",
    "enable": true,
    "id": "aiocqhttp",
    "name": "NekoBot",
    "ws_host": "0.0.0.0",
    "ws_port": 6299,
    "command_prefix": "/"
  },
  "telegram": {
    "type": "telegram",
    "enable": true,
    "id": "telegram",
    "token": "your-telegram-bot-token"
  }
}
```

## 平台适配器

### 开发自定义适配器

如果你需要对接新的平台，可以开发自定义平台适配器。

每个平台适配器需要实现以下方法：

```python
from packages.platform.base import BasePlatform

class MyPlatform(BasePlatform):
    async def connect(self):
        """连接到平台"""
        pass

    async def send_message(self, message_type, target_id, message):
        """发送消息"""
        pass

    async def disconnect(self):
        """断开连接"""
        pass

    def get_stats(self):
        """获取统计信息"""
        pass
```

### 注册平台

在 `packages/platform/register.py` 中注册你的平台：

```python
from packages.platform.sources.my_platform import MyPlatform

PLATFORMS = {
    "my_platform": MyPlatform
}
```

## 统一消息模型

NekoBot 使用统一的消息模型处理不同平台的差异：

```python
{
  "message_id": 12345,
  "group_id": 67890,
  "user_id": 54321,
  "sender_name": "用户昵称",
  "message_type": "group",  # group 或 private
  "message": "消息内容",
  "platform_id": "aiocqhttp",
  "raw_message": {...},  # 原始消息
  "timestamp": 1234567890
}
```

## 消息处理流程

```
平台接收消息
    ↓
转换为统一消息模型
    ↓
放入事件队列
    ↓
流水线调度器处理
    ↓
分发到插件处理
    ↓
转换回平台特定格式发送
```

## 多平台支持

### 同时连接多个平台

NekoBot 支持同时连接多个平台，只需在配置文件中添加多个平台配置即可。

### 跨平台消息转发

通过插件可以实现跨平台消息转发：

```python
class CrossPlatformPlugin(BasePlugin):
    async def on_message(self, message):
        # 将消息从一个平台转发到另一个平台
        if message["platform_id"] == "aiocqhttp":
            # 转发到 Telegram
            await self.send_telegram_message(
                chat_id=123456,
                text=message["message"]
            )
```

### 平台特定功能

不同平台可能有一些特定的功能，可以通过检查 `platform_id` 来实现：

```python
async def on_message(self, message):
    if message["platform_id"] == "telegram":
        # Telegram 特定功能
        await self.handle_telegram_features(message)
    elif message["platform_id"] == "discord":
        # Discord 特定功能
        await self.handle_discord_features(message)
```

## Web 仪表盘管理

Web 仪表盘提供完整的平台管理功能：

- **平台列表**: 查看所有已配置的平台
- **添加平台**: 添加新的平台配置
- **编辑配置**: 修改平台配置
- **启用/禁用**: 控制平台连接状态
- **删除平台**: 移除不需要的平台
- **查看统计**: 查看平台消息统计

## 常见问题

### 如何选择合适的平台？

根据你的需求选择：

- **QQ**: 适合国内用户，需要先部署 OneBot 实现
- **Telegram**: 适合国际用户，支持流式消息
- **Discord**: 适合游戏社区，功能丰富
- **飞书**: 适合企业协作场景
- **企业微信**: 适合企业内部使用

### 平台连接失败怎么办？

1. 检查网络连接
2. 验证配置信息（token、密钥等）
3. 查看日志了解具体错误
4. 确认平台服务是否正常

### 如何实现平台特定功能？

1. 在插件中检查 `message["platform_id"]`
2. 根据平台类型调用相应的 API
3. 使用平台特定的消息格式

### 流式消息支持

部分平台支持流式消息（实时发送）：

- **支持**: Telegram、KOOK、QQ频道
- **不支持**: QQ (OneBot V11)、Discord、飞书、Slack、企业微信

## 相关文档

- [平台适配器开发](../develop/platform-adapter.md)
- [插件开发](../develop/plugin.md)
- [消息类型](../develop/messages.md)
