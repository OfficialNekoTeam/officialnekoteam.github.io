# LLM 配置

NekoBot 支持多种 LLM（大语言模型）提供商，包括 OpenAI、Google Gemini、Claude、DeepSeek、DashScope、Moonshot、ZhipuAI 等。

## 支持的 LLM 提供商

| 提供商 | 类型 | 支持的模型 |
|--------|------|-----------|
| **OpenAI** | openai | gpt-4o, gpt-4o-mini, gpt-3.5-turbo |
| **Google Gemini** | gemini | gemini-2.0-flash-exp, gemini-1.5-pro, gemini-1.5-flash |
| **Claude** | claude | claude-3-5-sonnet-20241022, claude-3-5-haiku-20241022 |
| **DeepSeek** | deepseek | deepseek-chat, deepseek-coder |
| **DashScope** | dashscope | qwen-max, qwen-plus, qwen-turbo |
| **Moonshot** | moonshot | moonshot-v1-8k, moonshot-v1-32k, moonshot-v1-128k |
| **ZhipuAI** | zhipu | glm-4, glm-4-flash, glm-4-plus |
| **Ollama** | openai_compatible | 本地模型 |
| **LM Studio** | openai_compatible | 本地模型 |

## 配置文件

LLM 配置存储在 `data/llm_providers.json` 中。你也可以通过 Web 仪表盘添加和管理提供商。

```json
{
  "openai": {
    "type": "openai",
    "enable": true,
    "id": "openai",
    "api_key": "your-api-key-here",
    "base_url": "https://api.openai.com/v1",
    "model": "gpt-4o"
  },
  "gemini": {
    "type": "gemini",
    "enable": true,
    "id": "gemini",
    "api_key": "your-gemini-key",
    "model": "gemini-2.0-flash-exp"
  }
}
```

## OpenAI 配置

### 基础配置

```json
{
  "type": "openai",
  "enable": true,
  "id": "openai",
  "api_key": "sk-...",
  "base_url": "https://api.openai.com/v1",
  "model": "gpt-4o"
}
```

### 支持的模型

| 模型 | 说明 |
|------|------|
| gpt-4o | 最强大的多模态模型 |
| gpt-4o-mini | 性价比高 |
| gpt-3.5-turbo | 快速、经济 |

### 自定义端点

支持使用兼容 OpenAI API 的服务：

```json
{
  "type": "openai_compatible",
  "enable": true,
  "id": "custom-openai",
  "api_key": "your-key",
  "base_url": "https://your-api-endpoint.com/v1",
  "model": "gpt-4"
}
```

## Google Gemini 配置

### 基础配置

```json
{
  "type": "gemini",
  "enable": true,
  "id": "gemini",
  "api_key": "your-gemini-key",
  "model": "gemini-2.0-flash-exp"
}
```

### 支持的模型

| 模型 | 说明 |
|------|------|
| gemini-2.0-flash-exp | 最新 Flash 模型 |
| gemini-1.5-pro | 通用模型 |
| gemini-1.5-flash | 快速响应 |

## Claude 配置

### 基础配置

```json
{
  "type": "claude",
  "enable": true,
  "id": "claude",
  "api_key": "your-claude-key",
  "model": "claude-3-5-sonnet-20241022"
}
```

### 支持的模型

| 模型 | 说明 |
|------|------|
| claude-3-5-sonnet-20241022 | 强大的 Sonnet 模型 |
| claude-3-5-haiku-20241022 | 快速的 Haiku 模型 |

## DeepSeek 配置

### 基础配置

```json
{
  "type": "deepseek",
  "enable": true,
  "id": "deepseek",
  "api_key": "your-deepseek-key",
  "model": "deepseek-chat"
}
```

### 支持的模型

| 模型 | 说明 |
|------|------|
| deepseek-chat | 对话模型 |
| deepseek-coder | 代码生成模型 |

## DashScope (阿里云通义千问) 配置

### 基础配置

```json
{
  "type": "dashscope",
  "enable": true,
  "id": "dashscope",
  "api_key": "your-dashscope-key",
  "model": "qwen-max"
}
```

### 支持的模型

| 模型 | 说明 |
|------|------|
| qwen-max | 最强大的模型 |
| qwen-plus | 性价比高 |
| qwen-turbo | 快速响应 |

## Moonshot 配置

### 基础配置

```json
{
  "type": "moonshot",
  "enable": true,
  "id": "moonshot",
  "api_key": "your-moonshot-key",
  "model": "moonshot-v1-8k"
}
```

### 支持的模型

| 模型 | 说明 |
|------|------|
| moonshot-v1-8k | 8K 上下文 |
| moonshot-v1-32k | 32K 上下文 |
| moonshot-v1-128k | 128K 上下文 |

## ZhipuAI (智谱 GLM) 配置

### 基础配置

```json
{
  "type": "zhipu",
  "enable": true,
  "id": "zhipu",
  "api_key": "your-zhipu-key",
  "model": "glm-4"
}
```

### 支持的模型

| 模型 | 说明 |
|------|------|
| glm-4 | 最新 GLM-4 模型 |
| glm-4-flash | 快速响应 |
| glm-4-plus | 增强版 |

## 本地 LLM 配置

### Ollama

Ollama 是一个本地运行大模型的工具。

#### 安装 Ollama

1. 下载并安装 [Ollama](https://ollama.ai)
2. 拉取模型：
```bash
ollama pull llama2
```

#### 配置 NekoBot

```json
{
  "type": "ollama",
  "enable": true,
  "id": "ollama",
  "api_key": "ollama",
  "base_url": "http://localhost:11434/v1",
  "model": "llama2"
}
```

### LM Studio

LM Studio 提供了图形化界面和本地 API 服务。

#### 配置步骤

1. 启动 LM Studio
2. 启动本地服务器（默认端口 1234）
3. 配置 NekoBot：

```json
{
  "type": "lm_studio",
  "enable": true,
  "id": "lm-studio",
  "api_key": "lm-studio",
  "base_url": "http://localhost:1234/v1",
  "model": "local-model"
}
```

## Web 仪表盘配置

通过 Web 仪表盘添加 LLM 提供商：

1. 登录 Web 仪表盘
2. 进入"LLM 管理"页面
3. 点击"添加提供商"
4. 选择提供商类型并填写配置：
   - **ID**: 唯一标识符
   - **API Key**: API 密钥
   - **Base URL**: API 端点（如需自定义）
   - **Model**: 模型名称
5. 保存并启用提供商

## LLM 调用

### 基础调用

在插件中调用 LLM：

```python
from packages.llm import register

class MyPlugin(BasePlugin):
    async def on_load(self):
        # 注册 LLM 提供商
        register.register_llm_provider(...)

    async def ask_llm(self, prompt, message):
        result = await self.llm_manager.text_chat(
            provider_id="openai",
            prompt=prompt,
            session_id=str(message["user_id"])
        )
        return result.get("text", "")
```

### 流式响应

```python
async def ask_llm_stream(self, prompt, message):
    async for chunk in self.llm_manager.text_chat_stream(
        provider_id="openai",
        prompt=prompt,
        session_id=str(message["user_id"])
    ):
        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            chunk
        )
```

### 多模态输入

```python
async def ask_llm_with_image(self, prompt, image_url, message):
    result = await self.llm_manager.text_chat(
        provider_id="gemini",
        prompt=prompt,
        image_urls=[image_url],
        session_id=str(message["user_id"])
    )
    return result.get("text", "")
```

## 会话管理

### 创建新会话

```python
session_id = f"user_{user_id}_{group_id}"
```

### 上下文记忆

NekoBot 自动管理对话上下文，默认保留最近 10 条消息。

### 自定义系统提示

```python
result = await self.llm_manager.text_chat(
    provider_id="openai",
    prompt=prompt,
    system_prompt="你是一个友好的助手。",
    session_id=session_id
)
```

## 人格配置

### 人格管理

在 Web 仪表盘中可以配置不同的人格：

1. 进入"人设管理"页面
2. 点击"添加人设"
3. 设置人设名称、描述、系统提示
4. 选择默认人设

### 使用人格

```python
result = await self.llm_manager.text_chat(
    provider_id="openai",
    prompt=prompt,
    persona_id="helpful_assistant",
    session_id=session_id
)
```

## 常见问题

### API 密钥错误

1. 检查 API 密钥是否正确
2. 确认账户有足够余额
3. 检查 API 密钥是否过期

### 连接超时

1. 检查网络连接
2. 检查防火墙设置
3. 尝试使用代理

### 模型不可用

1. 确认模型名称正确
2. 检查模型是否在支持的地区
3. 联系服务提供商

### 响应缓慢

1. 尝试使用更快的模型
2. 减少上下文长度
3. 使用流式响应

## 最佳实践

1. **选择合适的模型**：根据需求选择性价比最高的模型
2. **缓存响应**：对常见问题缓存响应以减少 API 调用
3. **错误处理**：妥善处理 API 错误和网络问题
4. **成本控制**：设置合理的上下文长度和频率限制
5. **多提供商**：配置多个提供商以提高可用性

## 相关链接

- [OpenAI API 文档](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/)
- [Claude API](https://docs.anthropic.com/)
- [DeepSeek API](https://platform.deepseek.com/)
- [阿里云通义千问](https://help.aliyun.com/zh/dashscope/)
- [Moonshot AI](https://platform.moonshot.cn/)
- [智谱 AI 开放平台](https://open.bigmodel.cn/)
- [Ollama 文档](https://ollama.ai/docs)
- [LM Studio](https://lmstudio.ai/)
