# LLM Provider Configuration

NekoBot supports multiple Large Language Model (LLM) providers, including OpenAI, Anthropic, Google Gemini, and more.

## Configuration Overview

Configure LLM providers in the `provider_configs` object in `data/config.json`:

```json
{
  "provider_configs": {
    "openai": {
      "api_key": "sk-your-openai-api-key",
      "default_model": "gpt-4o"
    },
    "anthropic": {
      "api_key": "sk-ant-your-anthropic-api-key",
      "default_model": "claude-3-5-sonnet-20241022"
    },
    "gemini": {
      "api_key": "your-google-api-key",
      "default_model": "gemini-1.5-pro"
    }
  }
}
```

## Supported Providers

### 1. OpenAI

Supports OpenAI official API and OpenAI-compatible APIs.

#### Basic Configuration
```json
{
  "openai": {
    "api_key": "sk-your-api-key",
    "base_url": "https://api.openai.com/v1",
    "default_model": "gpt-4o",
    "timeout": 30,
    "max_retries": 3
  }
}
```

#### Configuration Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `api_key` | string | Yes | - | OpenAI API key |
| `base_url` | string | No | `"https://api.openai.com/v1"` | API base URL |
| `default_model` | string | No | `"gpt-4o"` | Default model |
| `timeout` | integer | No | `30` | Request timeout (seconds) |
| `max_retries` | integer | No | `3` | Maximum retry attempts |
| `organization` | string | No | `null` | Organization ID |
| `project` | string | No | `null` | Project ID |

#### Supported Models
- `gpt-5.4` - GPT-5.4 (latest version)
- `gpt-5.4-mini` - GPT-5.4 Mini (lightweight)
- `gpt-5.4-pro` - GPT-5.4 Pro (professional)
- `gpt-5.4-nano` - GPT-5.4 Nano (ultra-lightweight)
- `gpt-5` - GPT-5
- `gpt-5-mini` - GPT-5 Mini
- `gpt-5-pro` - GPT-5 Pro
- `gpt-5.1` - GPT-5.1
- `gpt-5.2` - GPT-5.2
- `gpt-5.3` - GPT-5.3
- `gpt-4.1` - GPT-4.1 (reasoning model)
- `gpt-4.1-mini` - GPT-4.1 Mini (lightweight reasoning)
- `gpt-4o` - GPT-4o (multimodal model)
- `gpt-4o-mini` - GPT-4o Mini (lightweight multimodal)
- `gpt-4-turbo` - GPT-4 Turbo
- `gpt-4` - GPT-4
- `gpt-3.5-turbo` - GPT-3.5 Turbo
- `o1-preview` - OpenAI o1 preview (reasoning optimized)
- `o1-mini` - OpenAI o1 mini (lightweight reasoning)

> Note: Model list based on [models.dev](https://models.dev), actual availability depends on OpenAI API support. NekoBot automatically fetches model capabilities from models.dev.

### 2. Anthropic (Claude)

Supports Anthropic Claude series models.

#### Basic Configuration
```json
{
  "anthropic": {
    "api_key": "sk-ant-your-api-key",
    "default_model": "claude-sonnet-4-6",
    "base_url": "https://api.anthropic.com",
    "timeout": 30
  }
}
```

#### Configuration Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `api_key` | string | Yes | - | Anthropic API key |
| `default_model` | string | No | `"claude-sonnet-4-6"` | Default model |
| `base_url` | string | No | `"https://api.anthropic.com"` | API base URL |
| `timeout` | integer | No | `30` | Request timeout (seconds) |
| `max_tokens` | integer | No | `4096` | Maximum generation tokens |
| `temperature` | number | No | `0.7` | Temperature parameter (0-1) |

#### Supported Models
- `claude-3-7-sonnet-latest` - Claude 3.7 Sonnet (latest version)
- `claude-sonnet-4-20250514` - Claude Sonnet 4
- `claude-opus-4-7` - Claude Opus 4.7 (strongest reasoning)
- `claude-sonnet-4-6` - Claude Sonnet 4.6 (best value)
- `claude-haiku-4-5` - Claude Haiku 4.5 (fastest)
- `claude-opus-4-6` - Claude Opus 4.6 (previous strongest)
- `claude-sonnet-4-5` - Claude Sonnet 4.5
- `claude-opus-4-5` - Claude Opus 4.5
- `claude-3-5-sonnet-20241022` - Claude 3.5 Sonnet (legacy)
- `claude-3-5-haiku-20241022` - Claude 3.5 Haiku (legacy)

### 3. Google Gemini

Supports Google Gemini series models.

#### Basic Configuration
```json
{
  "gemini": {
    "api_key": "your-google-api-key",
    "default_model": "gemini-2.5-pro",
    "safety_settings": {
      "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
      "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
      "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
      "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE"
    }
  }
}
```

#### Configuration Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `api_key` | string | Yes | - | Google API key |
| `default_model` | string | No | `"gemini-2.5-pro"` | Default model |
| `safety_settings` | object | No | `{}` | Safety settings |
| `generation_config` | object | No | `{}` | Generation configuration |
| `timeout` | integer | No | `30` | Request timeout (seconds) |

#### Supported Models
- `gemini-2.5-pro` - Gemini 2.5 Pro (latest version)
- `gemini-2.5-flash` - Gemini 2.5 Flash (fast version)
- `gemini-1.5-pro` - Gemini 1.5 Pro
- `gemini-1.5-flash` - Gemini 1.5 Flash
- `gemini-pro` - Gemini Pro
- `gemini-ultra` - Gemini Ultra

### 4. OpenAI Compatible API

Supports third-party services compatible with OpenAI API, such as DeepSeek, Ollama, etc.

#### Basic Configuration
```json
{
  "openai_compatible": {
    "api_key": "your-api-key",
    "base_url": "https://api.deepseek.com/v1",
    "default_model": "deepseek-chat",
    "provider_name": "deepseek"
  }
}
```

#### Configuration Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `api_key` | string | Yes | - | API key |
| `base_url` | string | Yes | - | API base URL |
| `default_model` | string | No | `null` | Default model |
| `provider_name` | string | No | `"openai_compatible"` | Provider name |
| `timeout` | integer | No | `30` | Request timeout (seconds) |

#### Supported Compatible Services
- **DeepSeek**: `https://api.deepseek.com/v1`
- **Ollama**: `http://localhost:11434/v1`
- **LocalAI**: `http://localhost:8080/v1`
- **Together AI**: `https://api.together.xyz/v1`
- **Azure OpenAI**: `https://{resource}.openai.azure.com/openai/deployments/{deployment}`

### 5. Text-to-Speech (TTS)

#### Edge TTS
Uses Microsoft Edge's speech synthesis service.

```json
{
  "edge_tts": {
    "voice": "zh-CN-XiaoxiaoNeural",
    "rate": "+0%",
    "volume": "+0%",
    "pitch": "+0Hz"
  }
}
```

#### OpenAI TTS
Uses OpenAI's text-to-speech service.

```json
{
  "openai_tts": {
    "api_key": "sk-your-openai-api-key",
    "model": "tts-1",
    "voice": "alloy",
    "speed": 1.0
  }
}
```

### 6. Speech-to-Text (STT)

#### OpenAI Whisper
Uses OpenAI's speech recognition service.

```json
{
  "openai_stt": {
    "api_key": "sk-your-openai-api-key",
    "model": "whisper-1",
    "language": "zh",
    "temperature": 0.0
  }
}
```

## Multi-Provider Configuration

You can configure multiple providers simultaneously, and NekoBot will automatically select as needed:

```json
{
  "provider_configs": {
    "openai": {
      "api_key": "sk-openai-key",
      "default_model": "gpt-4o"
    },
    "anthropic": {
      "api_key": "sk-ant-key",
      "default_model": "claude-3-5-sonnet"
    },
    "gemini": {
      "api_key": "google-key",
      "default_model": "gemini-1.5-pro"
    },
    "deepseek": {
      "api_key": "deepseek-key",
      "base_url": "https://api.deepseek.com/v1",
      "default_model": "deepseek-chat",
      "provider_name": "deepseek"
    }
  }
}
```

## Provider Selection Strategy

### 1. Default Provider
Specify default provider in plugins or configuration:

```python
# Specify provider in plugin
await self.context.request_provider("openai", prompt="Hello")
```

### 2. Fallback Strategy
If the primary provider fails, automatically try other available providers:

1. Try the first configured provider
2. If fails, try other providers in configuration order
3. Record failure reasons for debugging

### 3. Load Balancing
For multiple providers of the same type, configure load balancing:

```json
{
  "provider_configs": {
    "openai_1": {
      "api_key": "key1",
      "weight": 0.5
    },
    "openai_2": {
      "api_key": "key2", 
      "weight": 0.5
    }
  }
}
```

## Advanced Configuration

### Model-Specific Configuration
Set specific parameters for different models:

```json
{
  "openai": {
    "api_key": "sk-key",
    "models": {
      "gpt-4o": {
        "max_tokens": 4096,
        "temperature": 0.7
      },
      "gpt-3.5-turbo": {
        "max_tokens": 2048,
        "temperature": 0.8
      }
    }
  }
}
```

### Proxy Configuration
Access API through proxy:

```json
{
  "openai": {
    "api_key": "sk-key",
    "http_client": {
      "proxy": "http://proxy.example.com:8080",
      "verify_ssl": true
    }
  }
}
```

### Request Limits
Configure request rate limiting:

```json
{
  "openai": {
    "api_key": "sk-key",
    "rate_limit": {
      "requests_per_minute": 60,
      "tokens_per_minute": 90000
    }
  }
}
```

## Environment Variable Configuration

Use environment variables instead of sensitive information in configuration files:

```bash
export OPENAI_API_KEY="sk-your-key"
export ANTHROPIC_API_KEY="sk-ant-your-key"
export GEMINI_API_KEY="your-google-key"
```

Then reference environment variables in configuration file:

```json
{
  "openai": {
    "api_key": "${OPENAI_API_KEY}"
  },
  "anthropic": {
    "api_key": "${ANTHROPIC_API_KEY}"
  }
}
```

## Troubleshooting

### API Key Errors
```
ERROR: Invalid API key provided
```
Solutions:
1. Check if API key is correct
2. Check for spaces or special characters
3. Check if key has expired

### Network Connection Issues
```
ERROR: Connection timeout
```
Solutions:
1. Check network connection
2. Check firewall settings
3. Try increasing `timeout` parameter
4. Check proxy configuration

### Model Unavailable
```
ERROR: Model not found
```
Solutions:
1. Check if model name is correct
2. Check if API supports the model
3. Check provider documentation for available model list

### Quota Limits
```
ERROR: Rate limit exceeded
```
Solutions:
1. Reduce request frequency
2. Configure `rate_limit` parameter
3. Upgrade API plan
4. Use multiple providers to distribute requests

## Testing Configuration

### 1. Validate Configuration
Automatically validate configuration when starting NekoBot:
```bash
python -m nekobot
```

### 2. Test Provider Connection
Use Web UI to test provider connections:
1. Access `http://localhost:6285`
2. Go to provider management page
3. Click "Test Connection" button

### 3. Check Logs
Check NekoBot logs for detailed error information:
```bash
# View real-time logs
tail -f logs/nekobot.log
```

## Custom Providers

You can register custom providers through plugins, see [Plugin Development](./plugin-development.md) documentation.

## Next Steps

- [Framework Configuration](./framework-configuration.md) - Configure permissions, moderation, and conversation management
- [Platform Configuration](./platform-configuration.md) - Configure chat platforms
- [Plugin Development](./plugin-development.md) - Develop custom features
- [Quick Start](./getting-started.md) - Review basic configuration