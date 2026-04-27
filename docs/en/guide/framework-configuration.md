# Framework Configuration

NekoBot's core framework configuration defines the basic behavior and functionality of the system.

## Configuration File Structure

Framework configuration is located at the root level of `data/config.json` and includes the following main sections:

```json
{
  "framework_config": {
    "web_host": "0.0.0.0",
    "web_port": 6285,
    "log_level": "INFO",
    "timezone": "Asia/Shanghai",
    "enable_webui": true,
    "api_flavor": "chat_completions"
  },
  "permission_config": {
    "admin_users": ["12345678"],
    "whitelist_groups": []
  },
  "moderation_config": {
    "enable": false,
    "keywords": []
  },
  "conversation_config": {
    "max_history_len": 50,
    "persistence_driver": "sqlite",
    "auto_summary_threshold": 20
  }
}
```

## Framework Configuration (framework_config)

Controls the behavior of NekoBot's core framework.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `web_host` | string | `"0.0.0.0"` | Web UI listening address |
| `web_port` | integer | `6285` | Web UI listening port |
| `log_level` | string | `"INFO"` | Log level: `DEBUG`, `INFO`, `WARNING`, `ERROR` |
| `timezone` | string | `"Asia/Shanghai"` | System timezone |
| `enable_webui` | boolean | `true` | Whether to enable Web management interface |
| `api_flavor` | string | `"chat_completions"` | API flavor: `"chat_completions"` (OpenAI compatible) or `"anthropic"` |

### Log Level Explanation

- `DEBUG`: Most detailed logs, for debugging
- `INFO`: General information, records normal operation status
- `WARNING`: Warning messages, doesn't affect operation but needs attention
- `ERROR`: Error messages, requires immediate handling

## Permission Configuration (permission_config)

Controls access permissions for users and groups.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `admin_users` | array | `[]` | List of administrator user IDs |
| `whitelist_groups` | array | `[]` | List of whitelisted group IDs |

### Permission Rules

1. **Administrator Users**: Have all permissions, can execute administrative commands
2. **Whitelisted Groups**: Only groups in the whitelist can trigger bot responses
3. **Blacklist**: No independent configuration yet, can be implemented via plugins

### Example Configuration

```json
{
  "permission_config": {
    "admin_users": ["12345678", "87654321"],
    "whitelist_groups": ["10001", "10002"]
  }
}
```

## Moderation Configuration (moderation_config)

Provides basic content moderation functionality.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `enable` | boolean | `false` | Whether to enable content moderation |
| `keywords` | array | `[]` | List of sensitive keywords |

### Moderation Rules

1. When `enable` is `true`, the system checks if messages contain sensitive keywords
2. Messages matching keywords will be intercepted and won't trigger plugin responses
3. Keyword matching supports simple string matching

### Example Configuration

```json
{
  "moderation_config": {
    "enable": true,
    "keywords": ["sensitive_word1", "sensitive_word2", "banned_word"]
  }
}
```

## Conversation Configuration (conversation_config)

Controls dialogue history management and persistence.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `max_history_len` | integer | `50` | Maximum history entries (user+assistant message pairs) |
| `persistence_driver` | string | `"sqlite"` | Persistence driver: `"sqlite"` or `"memory"` |
| `auto_summary_threshold` | integer | `20` | Auto-summary threshold (triggers summary when history exceeds this value) |

### Conversation Management Features

#### 1. History Management
- System automatically maintains conversation history
- Old messages are compressed or removed when exceeding `max_history_len` limit
- Supports conversation context preservation

#### 2. Automatic Summarization
- Triggered when history length exceeds `auto_summary_threshold`
- Uses LLM to generate conversation summaries
- Summaries maintain long-term context, reducing token consumption

#### 3. Persistence Storage
- **SQLite**: Conversation history stored in `data/conversations.sqlite3`
- **Memory**: Memory-only storage, lost after restart

### Example Configuration

```json
{
  "conversation_config": {
    "max_history_len": 100,
    "persistence_driver": "sqlite",
    "auto_summary_threshold": 30
  }
}
```

## Advanced Configuration

### Database Configuration

To use an external database, add database configuration to `framework_config`:

```json
{
  "framework_config": {
    "database": {
      "url": "postgresql://user:password@localhost/nekobot",
      "pool_size": 10
    }
  }
}
```

### Cache Configuration

```json
{
  "framework_config": {
    "cache": {
      "type": "redis",
      "url": "redis://localhost:6379/0",
      "ttl": 3600
    }
  }
}
```

## Configuration Priority

1. **Environment Variables**: Highest priority, overrides configuration file
2. **Configuration File**: Settings in `data/config.json`
3. **Default Values**: Framework's built-in defaults

### Environment Variable Overrides

Some configurations can be overridden by environment variables:

- `NEKOBOT_HOST`: Overrides `web_host`
- `NEKOBOT_PORT`: Overrides `web_port`
- `NEKOBOT_WEBUI`: Overrides `enable_webui`

## Configuration Validation

The system automatically validates configuration integrity at startup:

1. Checks if required fields exist
2. Verifies field types are correct
3. Automatically completes missing configuration items
4. Generates configuration backup files

## Troubleshooting

### Configuration Not Taking Effect
1. Check if the configuration file path is correct
2. Confirm the file format is valid JSON
3. Check configuration loading information in startup logs

### Permission Issues
1. Ensure configuration file has correct read/write permissions
2. Check database file permissions (if using SQLite)

### Performance Issues
1. Adjust `max_history_len` to reduce memory usage
2. Consider using external database to improve performance
3. Adjust log level to reduce I/O overhead

## Next Steps

- [Platform Configuration](./platform-configuration.md) - Configure chat platform connections
- [LLM Provider Configuration](./llm-providers.md) - Configure AI services
- [Plugin Development](./plugin-development.md) - Extend functionality