# Platform Configuration

NekoBot supports multiple chat platform integrations, currently mainly supporting the **OneBot V11 (QQ)** protocol.

## OneBot V11 Configuration

OneBot V11 is the standard protocol for QQ bots, supporting WebSocket and HTTP connections.

### Basic Configuration

Add OneBot V11 configuration to the `platforms` array in `data/config.json`:

```json
{
  "platforms": [
    {
      "type": "onebot_v11",
      "instance_uuid": "my_qq_bot",
      "enabled": true,
      "host": "127.0.0.1",
      "port": 6700,
      "protocol": "ws_reverse",
      "access_token": "your_access_token",
      "self_id": "123456789",
      "command_prefix": "/"
    }
  ]
}
```

### Configuration Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `type` | string | Yes | - | Platform type, fixed as `"onebot_v11"` |
| `instance_uuid` | string | Yes | - | Instance unique identifier for distinguishing multiple bot instances |
| `enabled` | boolean | No | `true` | Whether to enable this platform |
| `host` | string | No | `"127.0.0.1"` | Host address of the OneBot implementation |
| `port` | integer | No | `6700` | Port number of the OneBot implementation |
| `protocol` | string | No | `"ws_reverse"` | Connection protocol: `"ws_reverse"` (WebSocket reverse connection) or `"http"` |
| `access_token` | string | No | `null` | Access token for authentication |
| `self_id` | string | No | `null` | Bot's own QQ number for sender identification |
| `command_prefix` | string | No | `"/"` | Command prefix, e.g., `/help` |

### Connection Protocols

#### WebSocket Reverse Connection (ws_reverse)

This is the recommended approach, where NekoBot acts as a WebSocket client connecting to the OneBot implementation:

```
NekoBot (client) → Connects to → OneBot implementation (server)
```

Configuration example:
```json
{
  "type": "onebot_v11",
  "instance_uuid": "my_bot",
  "protocol": "ws_reverse",
  "host": "127.0.0.1",
  "port": 6700
}
```

#### HTTP Polling (http)

NekoBot actively polls for messages via HTTP API:

```
NekoBot (active polling) → HTTP GET/POST → OneBot implementation
```

Configuration example:
```json
{
  "type": "onebot_v11", 
  "instance_uuid": "my_bot",
  "protocol": "http",
  "host": "127.0.0.1",
  "port": 5700
}
```

### Supported OneBot Implementations

NekoBot is compatible with the following OneBot V11 implementations:

#### 1. go-cqhttp
- GitHub: https://github.com/Mrs4s/go-cqhttp
- Most complete OneBot implementation
- Supports Windows, Linux, macOS
- Recommended for use

Configure go-cqhttp's `config.yml`:
```yaml
account:
  uin: 123456789  # QQ number
  password: ""    # Password, empty for QR code login

message:
  post-format: array  # Must be set to array

servers:
  - ws-reverse:
      universal: ws://127.0.0.1:6700/ws
      reconnect-interval: 3000
      access-token: "your_access_token"  # Optional, match with NekoBot configuration
```

#### 2. LLOneBot
- GitHub: https://github.com/LLOneBot/LLOneBot
- OneBot implementation based on Lagrange.Core
- Supports .NET platform

#### 3. OneBot Kotlin
- GitHub: https://github.com/yyuueexxiinngg/onebot-kotlin
- OneBot implementation based on Kotlin
- Supports Android

### Message Formats

NekoBot supports OneBot V11 standard message formats:

#### Text Message
```json
{
  "type": "text",
  "data": {
    "text": "Hello, World!"
  }
}
```

#### Image Message
```json
{
  "type": "image", 
  "data": {
    "file": "http://example.com/image.jpg",
    "url": "http://example.com/image.jpg"
  }
}
```

#### Voice Message
```json
{
  "type": "record",
  "data": {
    "file": "http://example.com/voice.amr",
    "url": "http://example.com/voice.amr"
  }
}
```

#### Forward Message
```json
{
  "type": "forward",
  "data": {
    "id": "forward_id"
  }
}
```

### Event Types

NekoBot handles the following OneBot V11 events:

#### Message Events
- `message.private`: Private message
- `message.group`: Group message
- `message.channel`: Channel message (platform-specific)

#### Notice Events
- `notice.friend_add`: Friend added
- `notice.group_increase`: Group member increase
- `notice.group_decrease`: Group member decrease
- `notice.group_ban`: Group member muted
- `notice.group_recall`: Group message recall
- `notice.friend_recall`: Friend message recall
- `notice.notify`: Other notifications

#### Request Events
- `request.friend`: Friend request
- `request.group`: Group join request

### Permission Mapping

NekoBot permission system maps to OneBot V11 roles:

| OneBot Role | NekoBot Permission |
|-------------|-------------------|
| `owner` (group owner) | `group.owner` |
| `admin` (administrator) | `group.admin` |
| `member` (member) | `group.member` |

### Configuration Validation

NekoBot automatically validates platform configuration on startup:

```bash
python -m nekobot
```

If configuration is incorrect, error messages will appear in logs:
```
ERROR: Invalid OneBot v11 config: missing 'instance_uuid'
```

### Multi-Instance Configuration

You can configure multiple OneBot instances to manage multiple QQ accounts:

```json
{
  "platforms": [
    {
      "type": "onebot_v11",
      "instance_uuid": "bot_1",
      "enabled": true,
      "host": "127.0.0.1",
      "port": 6700,
      "self_id": "123456789"
    },
    {
      "type": "onebot_v11", 
      "instance_uuid": "bot_2",
      "enabled": true,
      "host": "127.0.0.1",
      "port": 6701,
      "self_id": "987654321"
    }
  ]
}
```

### Troubleshooting

#### Connection Failure
1. Check if the OneBot implementation is running
2. Check if host and port are correct
3. Check firewall settings
4. Check NekoBot logs for detailed error information

#### Messages Not Received
1. Check if `post-format` in OneBot configuration is set to `array`
2. Check if WebSocket connection is normal
3. Check if `self_id` configuration is correct

#### Permission Issues
1. Check if the bot has appropriate permissions
2. Check if permission configuration is correctly mapped

### Advanced Configuration

#### Custom Metadata
You can add custom metadata to the configuration:

```json
{
  "type": "onebot_v11",
  "instance_uuid": "my_bot",
  "host": "127.0.0.1",
  "port": 6700,
  "metadata": {
    "custom_field": "value",
    "priority": 1,
    "tags": ["main", "production"]
  }
}
```

Metadata can be accessed through plugin context.

#### Connection Retry
NekoBot automatically handles connection disconnections and reconnections:
- Automatic reconnection after disconnection
- Gradually increasing reconnection interval (exponential backoff)
- Maximum retry count limit

### Next Steps

- [Framework Configuration](./framework-configuration.md) - Configure permissions, moderation, and conversation management
- [Plugin Development](./plugin-development.md) - Develop custom features for platforms
- [Quick Start](./getting-started.md) - Review basic configuration
- Check [OneBot V11 Standard](https://github.com/botuniverse/onebot-11) for protocol details