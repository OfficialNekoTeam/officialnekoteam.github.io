# 插件开发

本页是插件开发的快速入口。完整 API 说明见 [开发者文档：插件开发](../develop/plugin)。

## 快速模板

```text
my_plugin/
├── __init__.py
├── main.py
└── metadata.yaml
```

`__init__.py`：

```python
from .main import MyPlugin

__all__ = ["MyPlugin"]
```

`main.py`：

```python
from packages.decorators import command, event_handler, plugin
from packages.plugins import BasePlugin


@plugin(name="my_plugin", version="1.0.0", description="我的插件")
class MyPlugin(BasePlugin):
    @command(name="hello", aliases=("hi",), description="打招呼")
    async def hello(self, payload: dict) -> None:
        await self.reply("Hello from NekoBot plugin")

    @event_handler(event="message.group", description="群消息")
    async def on_group_message(self, payload: dict) -> None:
        if payload.get("plain_text") == "ping":
            await self.reply("pong")
```

`metadata.yaml`：

```yaml
name: my_plugin
display_name: 我的插件
version: 1.0.0
description: 示例插件
author: yourname
support_platforms:
  - onebot_v11
```

## 安装到本地

将插件目录放入：

```text
data/plugins/my_plugin/
```

然后启动 NekoBot，或在 WebUI 的插件管理中执行热重载。

## 常用能力

| 能力 | 写法 |
|------|------|
| 回复消息 | `await self.reply("text")` |
| 读取配置 | `self.get_config("key", default)` |
| 注册命令 | `@command(name="...")` |
| 监听事件 | `@event_handler(event="message.group")` |
| 调用 Provider | `await self.request_provider("openai", ...)` |

## 注意事项

- 插件代码会在 NekoBot 进程内执行，请不要安装不可信插件。
- `requirements.txt` 会触发依赖安装，生产环境建议先人工审核。
- 修改插件后如果热重载失败，请查看 `data/logs/`。
