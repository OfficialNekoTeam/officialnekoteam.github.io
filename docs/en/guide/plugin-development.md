# Plugin Development

This guide will help you develop NekoBot plugins.

## Plugin Structure

A standard NekoBot plugin contains the following files:

```
my_plugin/
    __init__.py      # Framework discovery entry, only re-export
    main.py          # Plugin logic, all @plugin / @command / @event_handler here
    requirements.txt # Optional, third-party dependencies
    metadata.yaml    # Plugin metadata
    README.md        # Plugin documentation
```

## Quick Start

### 1. Create plugin using template

Use the plugin example repository as a template:

```bash
# Clone plugin example
git clone https://github.com/OfficialNekoTeam/nekobot_plugin_template.git my_plugin
cd my_plugin

# Modify plugin name and configuration
# Edit metadata.yaml and main.py
```

### 2. Install plugin to NekoBot

Place the plugin in NekoBot's plugin directory:

```bash
cd /path/to/nekobot/data/plugins
git clone https://github.com/your/plugin_repo.git
```

### 3. Load plugin

NekoBot automatically scans the `data/plugins` directory to load plugins. You can also load manually:

```python
# Enable plugin in NekoBot configuration
# Plugins are automatically loaded and hot-reloaded
```

## Plugin Metadata

The `metadata.yaml` file defines basic plugin information:

```yaml
name: my_plugin           # Unique identifier, must match @plugin(name=)
display_name: My Plugin
version: 1.0.0
description: Plugin description
author: yourname
repository: https://github.com/you/my_plugin
tags:
  - utility
nekobot_version: ">=0.1.0"
support_platforms:
  - onebot_v11
```

## Plugin Implementation

### Basic Structure

`main.py` is the core file of the plugin:

```python
from packages.decorators import command, event_handler, plugin
from packages.plugins import BasePlugin


@plugin(name="my_plugin", version="1.0.0", description="Plugin description")
class MyPlugin(BasePlugin):

    @command(name="hello", aliases=("hi",), description="Say hello")
    async def cmd_hello(self, payload: dict) -> None:
        args = payload.get("command_args", [])
        name = args[0] if args else "World"
        await self.context.reply(f"Hello, {name}!")

    @event_handler(event="message.group", description="Group message handling")
    async def on_group_message(self, payload: dict) -> None:
        text = payload.get("plain_text", "")
        if isinstance(text, str) and "ping" in text.lower():
            await self.context.reply("pong")
```

### Entry File

`__init__.py` is very simple, only re-exporting:

```python
from .main import MyPlugin

__all__ = ["MyPlugin"]
```

## Decorators Explained

### @plugin Decorator

Marks a class as a plugin:

```python
@plugin(
    name="plugin_name",      # Plugin unique identifier
    version="1.0.0",         # Version number
    description="Plugin description",   # Plugin description
)
class MyPlugin(BasePlugin):
    pass
```

### @command Decorator

Registers a command handler:

```python
@command(
    name="command_name",     # Command name
    aliases=("alias1", "alias2"),  # Command aliases
    description="Command description",   # Command description
)
async def cmd_handler(self, payload: dict) -> None:
    # payload contains command arguments and context information
    args = payload.get("command_args", [])  # Command argument list
    await self.context.reply("Response message")
```

### @event_handler Decorator

Registers an event handler:

```python
@event_handler(
    event="message.group",   # Event type
    description="Event handling description",
)
async def event_handler(self, payload: dict) -> None:
    # payload contains event data
    text = payload.get("plain_text", "")
    # Process event...
```

### @provider Decorator

Registers an LLM provider:

```python
from packages.decorators import provider
from packages.providers import BaseProvider, ProviderKind

@provider(
    name="my_chat_provider",      # Provider unique identifier
    kind=ProviderKind.CHAT,       # Provider type: chat, embedding, tts, stt, rerank
    description="Custom chat provider",
    capabilities=("streaming", "function_calling"),  # Supported capabilities
)
class MyChatProvider(BaseProvider):
    async def chat(self, request: ProviderRequest) -> ProviderResponse:
        # Implement chat logic
        return ProviderResponse(
            content="Hello from custom provider",
            metadata={"model": "custom-model"}
        )
```

### @config_schema Decorator

Defines configuration schema for plugins or providers:

```python
from packages.decorators import config_schema

# Add configuration schema to plugin class
@config_schema("my_plugin_config")
class MyPlugin(BasePlugin):
    pass

# Add configuration schema to provider class  
@config_schema("my_provider_config")
class MyProvider(BaseProvider):
    pass
```

### @requires_permissions Decorator

Adds permission requirements to plugin classes or methods:

```python
from packages.decorators import requires_permissions

# Add permission requirements to entire plugin class
@requires_permissions("admin", "plugin_manager")
class AdminPlugin(BasePlugin):
    pass

# Add permission requirements to specific method
class MyPlugin(BasePlugin):
    @requires_permissions("user.write")
    async def sensitive_operation(self):
        pass
```

## Available Event Types

NekoBot supports the following event types:

- `message.private`: Private message
- `message.group`: Group message
- `message.channel`: Channel message
- `notice.friend_add`: Friend add notification
- `notice.group_increase`: Group member increase
- `notice.group_decrease`: Group member decrease
- `request.friend`: Friend request
- `request.group`: Group join request

## Provider Types

Plugins can register the following types of LLM providers:

- **chat**: Chat conversation provider, implements `chat` method
- **embedding**: Text embedding provider, implements `embedding` method
- **tts**: Text-to-speech provider, implements `tts` method
- **stt**: Speech-to-text provider, implements `stt` method
- **rerank**: Reranking provider, implements `rerank` method

Each provider type has a corresponding base class:
- `ChatProvider` - Chat provider
- `EmbeddingProvider` - Embedding provider
- `TTSProvider` - Text-to-speech provider
- `STTProvider` - Speech-to-text provider
- `RerankProvider` - Reranking provider

## Context Object

Plugins can access the context object via `self.context`:

```python
# Reply to message
await self.context.reply("Message content")

# Get current conversation
conversation = self.context.conversation

# Get current user
user_id = self.context.user_id

# Get current group (if in group chat)
group_id = self.context.group_id
```

## Permission Control

Plugins can define permission requirements:

```python
from packages.decorators import command, plugin
from packages.plugins import BasePlugin


@plugin(name="admin_plugin", version="1.0.0")
class AdminPlugin(BasePlugin):

    @command(
        name="shutdown",
        description="Shutdown bot",
        permissions=("admin",)  # Requires admin permission
    )
    async def cmd_shutdown(self, payload: dict) -> None:
        await self.context.reply("Shutting down...")
        # Perform shutdown operation
```

## Configuration Management

Plugins can define configuration schema:

```python
from packages.decorators import plugin
from packages.plugins import BasePlugin
from packages.schema import ObjectSchema, StringSchema


@plugin(
    name="configurable_plugin",
    version="1.0.0",
    config_schema=ObjectSchema(
        properties={
            "api_key": StringSchema(description="API key"),
            "endpoint": StringSchema(
                description="API endpoint",
                default="https://api.example.com"
            )
        }
    )
)
class ConfigurablePlugin(BasePlugin):
    def __init__(self):
        super().__init__()
        # Access configuration via self.config
        api_key = self.config.get("api_key")
```

## Tool Integration

Plugins can register AI tools:

```python
from packages.decorators import plugin, agent_tool
from packages.plugins import BasePlugin


@plugin(name="tool_plugin", version="1.0.0")
class ToolPlugin(BasePlugin):

    @agent_tool(
        name="get_weather",
        description="Get weather information",
        parameters_schema={
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "City name"}
            },
            "required": ["city"]
        }
    )
    async def tool_get_weather(self, city: str) -> str:
        # Implement weather query logic
        return f"Weather in {city} is sunny"
```

## Dependency Management

If plugins require third-party libraries, declare them in `requirements.txt`:

```
requests>=2.28.0
pydantic>=2.0.0
```

## Testing Plugins

### Local Testing

```python
# Create test environment
import asyncio
from my_plugin import MyPlugin

async def test_plugin():
    plugin = MyPlugin()
    # Simulate command calls
    # ...

asyncio.run(test_plugin())
```

### Testing in NekoBot

1. Place plugin in `data/plugins` directory
2. Start NekoBot
3. Test plugin functionality using commands
4. Check log output

## Publishing Plugins

### 1. Complete Documentation

Ensure `README.md` includes:
- Plugin feature introduction
- Installation and usage instructions
- Configuration options
- Command and event list

### 2. Version Management

Follow semantic versioning:
- `MAJOR`: Incompatible API changes
- `MINOR`: Backward-compatible feature additions
- `PATCH`: Backward-compatible bug fixes

### 3. Submit to Plugin Store

Submit plugin to NekoBot plugin store:
1. Ensure plugin complies with specifications
2. Provide complete metadata
3. Publish after review

## Example Plugin

Reference official plugin example: [https://github.com/OfficialNekoTeam/nekobot_plugin_template](https://github.com/OfficialNekoTeam/nekobot_plugin_template)

This example includes:
- Complete plugin structure
- Command and event handler examples
- Configuration and tool integration examples
- Detailed documentation

## Best Practices

1. **Error Handling**: Use try-except to catch exceptions, avoid plugin crashes affecting main program
2. **Logging**: Use `self.logger` to record plugin runtime logs
3. **Resource Cleanup**: Release resources in `on_unload` method
4. **Performance Optimization**: Avoid blocking operations, use async functions
5. **Code Standards**: Follow PEP 8 code standards

## FAQ

### Q: What if plugin fails to load?
A: Check if plugin structure is correct, view NekoBot logs for detailed error information.

### Q: What if commands don't work?
A: Check if command names conflict, if permission settings are correct.

### Q: How to debug plugins?
A: Add log output in plugin, check NekoBot logs.

### Q: What if plugin hot-reload fails?
A: Ensure plugin code has no syntax errors, try manual reload.

## Next Steps

- [MCP Tool Integration](./mcp-tools.md) - Expose plugin functionality as AI tools
- [Framework Configuration](./framework-configuration.md) - Learn about system configuration options
- [View Plugin Example](https://github.com/OfficialNekoTeam/nekobot_plugin_template)
- Reference NekoBot source code for API details
- Join developer community