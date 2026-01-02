# 插件系统

NekoBot 提供了强大的插件系统，允许你轻松扩展机器人的功能。

## 插件概述

插件是 NekoBot 功能扩展的核心方式。通过插件，你可以：

- 添加自定义命令
- 处理消息事件
- 与平台交互
- 调用 LLM 进行对话
- 使用 Agent 工具
- 持久化数据
- 配置插件参数
- 使用权限过滤器

## 插件结构

一个基本的插件结构如下：

```
data/plugins/my_plugin/
├── __init__.py
├── main.py
├── _conf_schema.json (可选)
└── metadata.yaml (可选)
```

- `__init__.py`: Python 包标记文件
- `main.py`: 插件主文件，包含插件类
- `_conf_schema.json`: 插件配置 Schema（可选）
- `metadata.yaml`: 插件元数据（可选）

## 创建第一个插件

### 基础插件示例

创建 `data/plugins/hello/main.py`：

```python
from packages.plugins.base import BasePlugin
from packages.plugins.metadata import PluginMetadata

class HelloPlugin(BasePlugin):
    def __init__(self):
        super().__init__()
        self.metadata = PluginMetadata(
            name="HelloPlugin",
            version="1.0.0",
            description="一个简单的问候插件",
            author="Your Name"
        )

    async def on_load(self):
        """插件加载时调用"""
        print(f"{self.metadata.name} 已加载")

    async def on_unload(self):
        """插件卸载时调用"""
        print(f"{self.metadata.name} 已卸载")
```

## 命令注册

### 使用装饰器注册命令

```python
from packages.plugins.base import BasePlugin, command

class HelloPlugin(BasePlugin):
    @command(name="hello", description="打招呼", aliases=["hi", "你好"])
    async def hello_command(self, args, message):
        """响应 hello 命令"""
        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            f"你好, {message['sender_name']}!"
        )
```

### 命令参数解析

```python
@command(name="echo", description="重复消息")
async def echo_command(self, args, message):
    """args 是命令参数列表"""
    text = " ".join(args) if args else "没有输入内容"
    await self.send_group_message(
        message['group_id'],
        message['user_id'],
        text
    )
```

## 消息处理

### 监听所有消息

```python
from packages.plugins.base import on_message

class MyPlugin(BasePlugin):
    @on_message
    async def handle_message(self, message):
        """处理所有消息"""
        print(f"收到消息: {message['message']}")
```

### 监听群消息

```python
from packages.plugins.base import on_group_message

class MyPlugin(BasePlugin):
    @on_group_message
    async def handle_group_message(self, message):
        """只处理群消息"""
        group_id = message['group_id']
        print(f"群 {group_id} 收到消息")
```

### 监听私聊消息

```python
from packages.plugins.base import on_private_message

class MyPlugin(BasePlugin):
    @on_private_message
    async def handle_private_message(self, message):
        """只处理私聊消息"""
        user_id = message['user_id']
        print(f"用户 {user_id} 发来私聊消息")
```

## 发送消息

### 发送群消息

```python
await self.send_group_message(
    group_id=123456,
    user_id=789,
    message="Hello!",
    platform_id="aiocqhttp"
)
```

### 发送私聊消息

```python
await self.send_private_message(
    user_id=789,
    message="Hello!",
    platform_id="aiocqhttp"
)
```

### 指定平台发送

```python
# 发送到 QQ
await self.send_group_message(
    group_id=123456,
    user_id=789,
    message="QQ 消息",
    platform_id="aiocqhttp"
)

# 发送到 Telegram
await self.send_group_message(
    group_id=123456,
    user_id=789,
    message="Telegram 消息",
    platform_id="telegram"
)
```

## LLM 集成

### 基础对话

```python
class ChatPlugin(BasePlugin):
    @command(name="chat", description="与 AI 对话")
    async def chat_command(self, args, message):
        # 获取用户输入
        user_input = " ".join(args) if args else "你好"

        # 调用 LLM
        result = await self.llm_manager.text_chat(
            provider_id="openai",
            prompt=user_input,
            session_id=str(message['user_id'])
        )

        # 发送回复
        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            result.get("text", "抱歉，我没有理解。")
        )
```

### 流式对话

```python
@command(name="schat", description="流式对话")
async def stream_chat_command(self, args, message):
    user_input = " ".join(args) if args else "你好"

    # 流式响应
    async for chunk in self.llm_manager.text_chat_stream(
        provider_id="openai",
        prompt=user_input,
        session_id=str(message['user_id'])
    ):
        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            chunk
        )
```

### 多模态输入

```python
@command(name="vision", description="图像识别")
async def vision_command(self, args, message):
    # 假设消息包含图片 URL
    image_url = args[0] if args else None

    if image_url:
        result = await self.llm_manager.text_chat(
            provider_id="gemini",
            prompt="描述这张图片",
            image_urls=[image_url],
            session_id=str(message['user_id'])
        )

        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            result.get("text", "无法识别图片")
        )
```

## Agent 工具使用

### 注册工具

```python
from packages.agent.tools import register_tool
from packages.agent.tools.base import BaseTool, ToolParameter

class MyCalculator(BaseTool):
    name = "calculator"
    description = "执行数学计算"

    parameters = [
        ToolParameter(name="expression", type="string", description="数学表达式")
    ]

    async def execute(self, expression: str):
        try:
            result = eval(expression)
            return f"结果: {result}"
        except Exception as e:
            return f"计算错误: {e}"

# 注册工具
register_tool(MyCalculator())
```

### 在插件中使用工具

```python
class AgentPlugin(BasePlugin):
    @command(name="calc", description="计算器")
    async def calc_command(self, args, message):
        expression = " ".join(args)

        # 使用工具
        tool = self.agent_executor.get_tool("calculator")
        result = await tool.execute(expression)

        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            result
        )
```

## 权限控制

### 使用权限过滤器

```python
from packages.plugins.filters.base import BaseFilter
from packages.plugins.filters.permission_filter import PermissionFilter

class AdminOnlyFilter(BaseFilter):
    async def check(self, message):
        # 只允许管理员使用
        user_id = message['user_id']
        return user_id in [123456, 789012]  # 管理员 ID 列表

class AdminPlugin(BasePlugin):
    filters = [AdminOnlyFilter()]

    @command(name="admin", description="管理员命令")
    async def admin_command(self, args, message):
        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            "这是管理员命令"
        )
```

### 创建自定义过滤器

```python
from packages.plugins.filters.base import BaseFilter

class GroupOnlyFilter(BaseFilter):
    """只允许特定群使用"""

    def __init__(self, allowed_groups):
        self.allowed_groups = allowed_groups

    async def check(self, message):
        group_id = message.get('group_id')
        return group_id in self.allowed_groups

# 使用过滤器
class MyPlugin(BasePlugin):
    filters = [
        GroupOnlyFilter(allowed_groups=[123456, 789012])
    ]
```

## 插件配置

### 配置 Schema

创建 `_conf_schema.json` 定义插件配置：

```json
{
  "title": "Hello Plugin 配置",
  "type": "object",
  "properties": {
    "greeting": {
      "type": "string",
      "title": "问候语",
      "default": "你好"
    },
    "max_length": {
      "type": "integer",
      "title": "最大长度",
      "default": 100
    },
    "enabled": {
      "type": "boolean",
      "title": "启用插件",
      "default": true
    }
  }
}
```

### 读取配置

```python
class HelloPlugin(BasePlugin):
    async def on_load(self):
        # 加载插件配置
        config = self.get_config()
        greeting = config.get("greeting", "你好")
        max_length = config.get("max_length", 100)

        print(f"问候语: {greeting}, 最大长度: {max_length}")
```

### 更新配置

```python
@command(name="config", description="更新配置")
async def config_command(self, args, message):
    # 更新配置
    self.update_config({
        "greeting": "您好",
        "max_length": 200
    })

    await self.send_group_message(
        message['group_id'],
        message['user_id'],
        "配置已更新"
    )
```

## 数据持久化

### 保存数据

```python
import json
from pathlib import Path

async def save_data(self):
    """保存插件数据"""
    data_dir = self.get_plugin_data_dir()
    data_dir.mkdir(parents=True, exist_ok=True)

    config_file = data_dir / "data.json"
    data = {"key": "value"}

    with open(config_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
```

### 读取数据

```python
async def load_data(self):
    """加载插件数据"""
    data_dir = self.get_plugin_data_dir()
    config_file = data_dir / "data.json"

    if config_file.exists():
        with open(config_file, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}
```

### 使用插件数据管理器

```python
from packages.plugins.plugin_data_manager import PluginDataManager

class MyPlugin(BasePlugin):
    async def on_load(self):
        self.data_manager = PluginDataManager(self.metadata.name)

        # 保存数据
        await self.data_manager.set("user_count", 100)

        # 读取数据
        count = await self.data_manager.get("user_count", 0)
```

## 热重载

### 支持热重载

插件支持热重载，可以在不重启服务的情况下重新加载插件：

```python
class MyPlugin(BasePlugin):
    async def on_reload(self):
        """插件重载时调用"""
        print("插件正在重载...")
        # 重新加载配置
        await self.load_config()
        print("插件重载完成")
```

## 插件生命周期

| 方法 | 说明 |
|------|------|
| `on_load()` | 插件加载时调用 |
| `on_unload()` | 插件卸载时调用 |
| `on_enable()` | 插件启用时调用 |
| `on_disable()` | 插件禁用时调用 |
| `on_reload()` | 插件重载时调用 |

## 安装插件

### 本地安装

1. 将插件文件夹放入 `data/plugins/` 目录
2. 重启或重载插件

### 从 URL 安装

通过 Web 仪表盘安装：

1. 进入"插件管理"页面
2. 点击"从 URL 安装"
3. 输入插件 URL：
   - GitHub 仓库: `https://github.com/user/repo`
   - GitHub 分支: `https://github.com/user/repo/tree/branch`
   - 直接 ZIP 文件链接
4. 点击安装

### 支持的插件来源

- GitHub 仓库
- GitLab 仓库
- 直接 ZIP 文件链接
- 本地文件上传

## 插件依赖管理

### 声明依赖

在 `metadata.yaml` 中声明依赖：

```yaml
name: "MyPlugin"
version: "1.0.0"
description: "我的插件"
author: "Your Name"
dependencies:
  - "requests>=2.28.0"
  - "aiohttp>=3.8.0"
```

### 自动安装依赖

NekoBot 会在加载插件时自动安装声明的依赖。

## 完整插件示例

```python
from packages.plugins.base import BasePlugin, command, on_group_message
from packages.plugins.metadata import PluginMetadata
import json
from pathlib import Path

class CounterPlugin(BasePlugin):
    def __init__(self):
        super().__init__()
        self.metadata = PluginMetadata(
            name="CounterPlugin",
            version="1.0.0",
            description="群消息计数器",
            author="Your Name"
        )
        self.counters = {}

    async def on_load(self):
        """加载时读取计数"""
        await self.load_counters()

    async def on_unload(self):
        """卸载时保存计数"""
        await self.save_counters()

    async def load_counters(self):
        """加载计数数据"""
        data_dir = self.get_plugin_data_dir()
        data_file = data_dir / "counters.json"

        if data_file.exists():
            with open(data_file, "r", encoding="utf-8") as f:
                self.counters = json.load(f)

    async def save_counters(self):
        """保存计数数据"""
        data_dir = self.get_plugin_data_dir()
        data_dir.mkdir(parents=True, exist_ok=True)

        data_file = data_dir / "counters.json"
        with open(data_file, "w", encoding="utf-8") as f:
            json.dump(self.counters, f, ensure_ascii=False, indent=2)

    @on_group_message
    async def count_message(self, message):
        """统计群消息"""
        group_id = str(message["group_id"])

        if group_id not in self.counters:
            self.counters[group_id] = 0

        self.counters[group_id] += 1

        # 每收到 100 条消息保存一次
        if self.counters[group_id] % 100 == 0:
            await self.save_counters()

    @command(name="count", description="查看消息计数")
    async def count_command(self, args, message):
        """查看计数"""
        group_id = str(message["group_id"])
        count = self.counters.get(group_id, 0)

        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            f"本群已发送 {count} 条消息"
        )

    @command(name="resetcount", description="重置计数", aliases=["重置计数"])
    async def reset_count_command(self, args, message):
        """重置计数"""
        group_id = str(message["group_id"])
        self.counters[group_id] = 0
        await self.save_counters()

        await self.send_group_message(
            message['group_id'],
            message['user_id'],
            "计数已重置"
        )
```

## 插件最佳实践

1. **错误处理**: 在插件中添加适当的错误处理
2. **资源清理**: 在 `on_unload` 中清理资源
3. **异步操作**: 使用 `async/await` 处理异步操作
4. **数据验证**: 验证输入数据，防止注入攻击
5. **日志记录**: 使用日志记录插件活动
6. **配置管理**: 使用配置 Schema 管理插件配置
7. **权限控制**: 使用权限过滤器保护敏感命令
8. **热重载支持**: 支持热重载以方便开发

## 插件 API 参考

### BasePlugin 类

```python
class BasePlugin(ABC):
    metadata: PluginMetadata

    # 生命周期方法
    async def on_load(self): ...
    async def on_unload(self): ...
    async def on_enable(self): ...
    async def on_disable(self): ...
    async def on_reload(self): ...

    # 消息发送
    async def send_private_message(
        self, user_id: int,
        message: str,
        platform_id: str = "aiocqhttp"
    ) -> bool: ...

    async def send_group_message(
        self, group_id: int,
        user_id: int,
        message: str,
        platform_id: str = "aiocqhttp"
    ) -> bool: ...

    # 配置管理
    def get_config(self) -> dict: ...
    def update_config(self, config: dict): ...

    # 数据管理
    def get_plugin_data_dir(self) -> Path: ...
```

### 装饰器

```python
# 命令装饰器
@command(name, description, aliases=[])

# 消息监听器
@on_message
@on_group_message
@on_private_message
```

## 更多示例

更多插件示例请参考：[NekoBot Plugins Example](https://github.com/NekoBotTeam/NekoBot_Plugins_Example)

## 相关文档

- [架构设计](./architecture.md)
- [平台对接](./platforms.md)
- [LLM 配置](./llm.md)
- [Agent 系统](./agent.md)
