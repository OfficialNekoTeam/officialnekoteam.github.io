---
layout: page
title: Plugin System
---

# Plugin System

NekoBot provides a powerful plugin system that allows you to easily extend your bot's functionality.

## Plugin Overview

Plugins are the core way to extend NekoBot functionality. Through plugins, you can:

- Add custom commands
- Handle message events
- Interact with platforms
- Persist data
- Configure plugin parameters

## Plugin Structure

A basic plugin structure looks like this:

```
data/plugins/my_plugin/
├── main.py
├── _conf_schema.json (optional)
└── metadata.yaml (optional)
```

- `main.py`: Plugin main file containing the plugin class
- `_conf_schema.json`: Plugin configuration schema (optional)
- `metadata.yaml`: Plugin metadata (optional)

## Creating Your First Plugin

### Basic Plugin Example

Create `data/plugins/hello/main.py`:

```python
from packages.backend.plugins.base import BasePlugin, register

class HelloPlugin(BasePlugin):
    def __init__(self):
        super().__init__()
        self.name = "HelloPlugin"
        self.version = "1.0.0"
        self.description = "A simple greeting plugin"
        self.author = "Your Name"
    
    async def on_load(self):
        print(f"{self.name} loaded")
    
    async def on_unload(self):
        print(f"{self.name} unloaded")
    
    @register("hello", "Say hello")
    async def hello_command(self, args, message):
        await self.send_group_message(
            message['group_id'], 
            message['user_id'], 
            f"Hello, {message['sender_name']}!"
        )
```

### Command Decorator

Use the `@register` decorator to register commands:

```python
@register("command_name", "command_description", aliases=["alias1", "alias2"])
async def my_command(self, args, message):
    pass
```

### Message Handlers

Use decorators to listen to messages:

```python
from packages.backend.plugins.base import on_message, on_group_message, on_private_message

@on_message
async def handle_all_messages(self, message):
    pass

@on_group_message
async def handle_group_messages(self, message):
    pass

@on_private_message
async def handle_private_messages(self, message):
    pass
```

## Sending Messages

Plugins can send messages using `send_private_message` and `send_group_message` methods:

```python
# Send group message
await self.send_group_message(
    group_id=123456,
    user_id=789,
    message="Hello!",
    platform_id="aiocqhttp"
)

# Send private message
await self.send_private_message(
    user_id=789,
    message="Hello!",
    platform_id="aiocqhttp"
)
```

## Plugin Configuration

### Configuration Schema

Create `_conf_schema.json` to define plugin configuration:

```json
{
  "title": "Hello Plugin Configuration",
  "type": "object",
  "properties": {
    "greeting": {
      "type": "string",
      "title": "Greeting",
      "default": "Hello"
    },
    "enabled": {
      "type": "boolean",
      "title": "Enable Plugin",
      "default": true
    }
  }
}
```

### Reading Configuration

```python
class HelloPlugin(BasePlugin):
    async def on_load(self):
        # Load plugin configuration
        config = self.conf_schema
        greeting = config.get("greeting", "Hello")
        print(f"Greeting: {greeting}")
```

## Plugin Data Persistence

NekoBot automatically creates a data directory for each plugin: `data/plugin_data/<plugin_name>/`

### Saving Data

```python
import json
from pathlib import Path

async def save_data(self):
    data_dir = self.get_plugin_data_dir()
    config_file = data_dir / "config.json"
    
    data = {"key": "value"}
    with open(config_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
```

### Loading Data

```python
import json
from pathlib import Path

async def load_data(self):
    data_dir = self.get_plugin_data_dir()
    config_file = data_dir / "config.json"
    
    if config_file.exists():
        with open(config_file, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    return {}
```

## Plugin Lifecycle

| Method | Description |
|--------|-------------|
| `on_load()` | Called when plugin is loaded |
| `on_unload()` | Called when plugin is unloaded |
| `on_enable()` | Called when plugin is enabled |
| `on_disable()` | Called when plugin is disabled |

## Installing Plugins from URL

You can install plugins from GitHub and other platforms:

### Via Web Dashboard

1. Go to "Plugins" page
2. Click "Install Plugin"
3. Enter plugin URL (supports GitHub repository links)
4. Click install

### Supported URL Formats

- GitHub repository: `https://github.com/user/repo`
- GitHub branch: `https://github.com/user/repo/tree/branch`
- GitHub release: `https://github.com/user/repo/releases/tag/v1.0.0`
- Direct ZIP file link

## Plugin Example

### Counter Plugin

```python
from packages.backend.plugins.base import BasePlugin, register, on_group_message
import json
from pathlib import Path

class CounterPlugin(BasePlugin):
    def __init__(self):
        super().__init__()
        self.name = "CounterPlugin"
        self.version = "1.0.0"
        self.description = "Group message counter"
        self.author = "Your Name"
        self.counters = {}
    
    async def on_load(self):
        self.load_counters()
    
    async def on_unload(self):
        self.save_counters()
    
    def load_counters(self):
        data_dir = self.get_plugin_data_dir()
        data_file = data_dir / "counters.json"
        if data_file.exists():
            with open(data_file, "r", encoding="utf-8") as f:
                self.counters = json.load(f)
    
    def save_counters(self):
        data_dir = self.get_plugin_data_dir()
        data_dir.mkdir(parents=True, exist_ok=True)
        data_file = data_dir / "counters.json"
        with open(data_file, "w", encoding="utf-8") as f:
            json.dump(self.counters, f, ensure_ascii=False, indent=2)
    
    @on_group_message
    async def count_message(self, message):
        group_id = str(message["group_id"])
        if group_id not in self.counters:
            self.counters[group_id] = 0
        self.counters[group_id] += 1
        self.save_counters()
    
    @register("count", "View message count")
    async def count_command(self, args, message):
        group_id = str(message["group_id"])
        count = self.counters.get(group_id, 0)
        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            f"This group has sent {count} messages"
        )
```

## Plugin Best Practices

1. **Error Handling**: Add appropriate error handling in plugins
2. **Resource Cleanup**: Clean up resources in `on_unload`
3. **Async Operations**: Use `async/await` for asynchronous operations
4. **Data Validation**: Validate input data to prevent injection attacks
5. **Logging**: Use logging to record plugin activities
6. **Configuration Management**: Use configuration schema to manage plugin settings

## Plugin Reference

### BasePlugin Class

```python
class BasePlugin(ABC):
    name: str
    version: str
    description: str
    author: str
    enabled: bool
    
    async def on_load(self): ...
    async def on_unload(self): ...
    async def on_enable(self): ...
    async def on_disable(self): ...
    async def on_message(self, message): ...
    
    async def send_private_message(
        self, user_id: int, 
        message: str, 
        platform_id: str = "onebot"
    ) -> bool: ...
    
    async def send_group_message(
        self, group_id: int, 
        user_id: int, 
        message: str, 
        platform_id: str = "onebot"
    ) -> bool: ...
    
    def get_plugin_data_dir(self) -> Path: ...
```

## More Examples

For more plugin examples, please refer to: [NekoBot Plugins Example](https://github.com/OfficialNekoTeam/NekoBot_Plugins_Example)
