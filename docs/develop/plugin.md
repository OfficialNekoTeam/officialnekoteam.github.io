# 插件开发

NekoBot 插件基于 Python 类和装饰器注册。一个插件可以注册命令、事件处理器，也可以通过上下文调用回复、Provider、权限检查等能力。

## 目录结构

```text
my_plugin/
├── __init__.py
├── main.py
├── metadata.yaml
├── requirements.txt
└── README.md
```

`__init__.py`：

```python
from .main import MyPlugin

__all__ = ["MyPlugin"]
```

## 最小插件

`main.py`：

```python
from packages.decorators import command, event_handler, plugin
from packages.plugins import BasePlugin


@plugin(name="hello_plugin", version="1.0.0", description="Hello 示例")
class HelloPlugin(BasePlugin):
    @command(name="hello", aliases=("hi",), description="打招呼")
    async def hello(self, payload: dict) -> None:
        args = payload.get("command_args", [])
        name = args[0] if args else "NekoBot"
        await self.reply(f"Hello, {name}!")

    @event_handler(event="message.group", description="群消息 ping/pong")
    async def on_group_message(self, payload: dict) -> None:
        if payload.get("plain_text") == "ping":
            await self.reply("pong")
```

## metadata.yaml

```yaml
name: hello_plugin
display_name: Hello 插件
version: 1.0.0
description: Hello 示例
author: yourname
repository: https://github.com/you/hello_plugin
tags:
  - example
nekobot_version: ">=0.1.0"
support_platforms:
  - onebot_v11
```

## @plugin

标记插件类：

```python
@plugin(name="plugin_name", version="1.0.0", description="插件说明")
class MyPlugin(BasePlugin):
    pass
```

## @command

注册命令处理器：

```python
@command(name="weather", aliases=("w",), description="查询天气")
async def weather(self, payload: dict) -> None:
    args = payload.get("command_args", [])
    city = args[0] if args else "北京"
    await self.reply(f"正在查询 {city} 的天气")
```

命令参数由平台分发器解析后放入 `payload`。常见字段包括：

- `command_name`
- `command_args`
- `plain_text`
- 平台事件相关字段

## @event_handler

注册事件处理器：

```python
@event_handler(event="message.private", description="私聊消息")
async def on_private_message(self, payload: dict) -> None:
    await self.reply("收到私聊消息")
```

常用事件：

- `message.private`
- `message.group`
- `notice.*`
- `request.*`

## on_event fallback

如果插件实现了 `on_event()`，当命令和事件处理器未处理时，框架可以调用该 fallback：

```python
async def on_event(self, event_name: str, payload: dict) -> None:
    if event_name == "message.group":
        ...
```

## PluginContext

`BasePlugin` 提供了一组便捷方法：

| 方法 | 说明 |
|------|------|
| `self.reply(message)` | 回复当前消息 |
| `self.get_config(key, default)` | 读取插件配置 |
| `self.request_provider(provider_name, **kwargs)` | 调用 Provider |
| `self.schedule_task(task_name, payload)` | 调度任务 |
| `self.check_permissions(*permissions)` | 检查权限 |
| `self.permission_decision(*permissions)` | 返回权限判定详情 |

也可以直接访问 `self.context` 获取更完整上下文。

## 配置读取

配置写在 `data/config.json` 的 `plugin_configs` 中：

```json
{
  "plugin_configs": {
    "hello_plugin": {
      "prefix": "Hello"
    }
  }
}
```

插件中读取：

```python
prefix = self.get_config("prefix", "Hello")
```

## 生命周期

插件可以实现：

```python
async def setup(self) -> None:
    # 插件加载后调用
    ...

async def teardown(self) -> None:
    # 插件卸载或热重载前调用
    ...
```

## 依赖

如需第三方依赖，在插件目录放置 `requirements.txt`：

```text
httpx>=0.28.0
```

加载器会尝试安装依赖。生产环境请谨慎安装不可信插件。

## 调试建议

- 插件目录必须包含 `__init__.py`
- 插件类必须使用 `@plugin`
- 修改代码后可在 WebUI 执行热重载
- 查看 `data/logs/` 下日志定位导入、依赖和绑定错误
