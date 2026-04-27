# 命令系统

NekoBot 的命令由插件通过 `@command` 装饰器注册。平台消息进入分发器后，会先尝试匹配命令；未匹配时再进入事件处理器、插件 fallback 和 LLM fallback。

## 命令格式

默认命令前缀来自平台配置的 `command_prefix`，OneBot V11 默认是 `/`。

```text
/hello
/weather 北京
/help
```

## 注册命令

```python
from packages.decorators import command, plugin
from packages.plugins import BasePlugin


@plugin(name="command_demo", version="1.0.0", description="命令示例")
class CommandDemoPlugin(BasePlugin):
    @command(name="hello", aliases=("hi",), description="打招呼")
    async def hello(self, payload: dict) -> None:
        args = payload.get("command_args", [])
        name = args[0] if args else "NekoBot"
        await self.reply(f"Hello, {name}!")
```

## 命令参数

命令参数会被解析到 `payload["command_args"]`：

```python
@command(name="add", description="两个数字相加")
async def add(self, payload: dict) -> None:
    args = payload.get("command_args", [])
    if len(args) < 2:
        await self.reply("用法：/add 1 2")
        return

    try:
        left = float(args[0])
        right = float(args[1])
    except ValueError:
        await self.reply("参数必须是数字")
        return

    await self.reply(f"结果：{left + right}")
```

## 别名

`aliases` 用于配置命令别名：

```python
@command(name="weather", aliases=("w", "天气"), description="查询天气")
async def weather(self, payload: dict) -> None:
    ...
```

用户可以使用：

```text
/weather 北京
/w 北京
/天气 北京
```

## 常见 payload 字段

不同平台和事件携带字段可能不同。OneBot V11 消息常见字段包括：

| 字段 | 说明 |
|------|------|
| `plain_text` | 纯文本消息 |
| `command_name` | 匹配到的命令名 |
| `command_args` | 命令参数列表 |
| `message_id` | 消息 ID |
| `user_id` | 用户 ID |
| `group_id` | 群 ID，群聊时存在 |
| `raw_event` | 原始平台事件 |

## 权限检查

插件可以使用上下文权限能力：

```python
@command(name="admin", description="管理命令")
async def admin(self, payload: dict) -> None:
    if not self.check_permissions("command.invoke"):
        await self.reply("你没有权限执行该命令")
        return
    await self.reply("管理命令已执行")
```

实际权限规则由 `permission_config` 决定。

## 最佳实践

- 为每个命令写清晰的 `description`
- 对参数数量和类型做校验
- 错误时返回可操作的用法提示
- 耗时操作使用异步 I/O，避免阻塞事件循环
- 敏感操作调用 `check_permissions()`

## 相关文档

- [插件开发](../develop/plugin)
- [平台配置](./platform-configuration)
- [权限配置](./framework-configuration)
