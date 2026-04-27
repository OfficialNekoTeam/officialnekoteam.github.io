# LLM 接入

NekoBot 通过 Provider 接入不同模型服务。Provider 配置位于 `data/config.json` 的 `provider_configs` 对象中，也可以在 WebUI 中管理。

## 内置 Provider

| 类型/名称 | 说明 | 常用字段 |
|-----------|------|----------|
| `openai` | OpenAI 官方 Chat Completions | `api_key`、`default_model`、`base_url` |
| `anthropic` | Anthropic Claude | `api_key`、`default_model`、`base_url` |
| `gemini` | Google Gemini | `api_key`、`default_model` |
| `openai_compatible` | OpenAI 兼容服务 | `api_key`、`base_url`、`default_model` |
| `openai_tts` | OpenAI TTS | `api_key`、`default_model`、`base_url` |
| `openai_stt` | OpenAI STT / Whisper | `api_key`、`default_model`、`base_url` |
| `edge_tts` | Microsoft Edge TTS | `voice` |

## 配置示例

```json
{
  "provider_configs": {
    "openai": {
      "api_key": "sk-...",
      "default_model": "gpt-4o"
    },
    "anthropic": {
      "api_key": "sk-ant-...",
      "default_model": "claude-3-5-sonnet-latest"
    },
    "gemini": {
      "api_key": "...",
      "default_model": "gemini-2.0-flash"
    },
    "openai_compatible": {
      "api_key": "...",
      "base_url": "https://api.deepseek.com/v1",
      "default_model": "deepseek-chat"
    }
  }
}
```

## OpenAI

| 字段 | 说明 |
|------|------|
| `api_key` | OpenAI API Key |
| `default_model` | 默认模型，例如 `gpt-4o` |
| `base_url` | 可选，自定义兼容端点 |

## Anthropic

| 字段 | 说明 |
|------|------|
| `api_key` | Anthropic API Key |
| `default_model` | 默认模型，例如 `claude-3-5-sonnet-latest` |
| `base_url` | 可选，自定义端点 |

## Gemini

| 字段 | 说明 |
|------|------|
| `api_key` | Google AI Studio API Key |
| `default_model` | 默认模型，例如 `gemini-2.0-flash` |

## OpenAI Compatible

适用于 DeepSeek、OpenRouter、LM Studio、Ollama 兼容端点等服务。

| 字段 | 说明 |
|------|------|
| `api_key` | API Key，本地服务可按服务要求填写 |
| `base_url` | 兼容 OpenAI 的 API 根地址，例如 `http://localhost:11434/v1` |
| `default_model` | 默认模型名 |

## 语音 Provider

OpenAI TTS/STT 和 Edge TTS 可用于语音合成、语音识别等场景。插件可以通过 `PluginContext.tts()` 和 `PluginContext.stt()` 使用。

## 在插件中调用

插件可以通过上下文请求 Provider：

```python
result = await self.request_provider(
    "openai",
    messages=[{"role": "user", "content": "你好"}],
)
```

具体请求对象由 Provider 类型决定。普通聊天场景通常由框架的 LLM fallback 自动调用，无需插件手动处理。

## 配置安全

包含 `api_key`、`token`、`secret`、`password` 等关键字的配置项会按框架规则加密保存。仍建议避免把真实密钥提交到 Git 仓库。
