# 插件系统

插件是 NekoBot 扩展业务逻辑的主要方式。框架负责平台接入、消息分发、权限检查、Provider 调用和 WebUI 管理；具体聊天功能可以通过插件实现。

## 当前能力

在当前版本中，插件系统支持：

- 启动时扫描 `data/plugins/` 并加载插件
- 基于 `@plugin`、`@command`、`@event_handler` 装饰器注册插件能力
- 在 WebUI 中查看插件、启用/禁用插件、编辑插件配置
- 对单个插件执行热重载
- 可选读取插件的 `metadata.yaml`
- 可选安装插件目录中的 `requirements.txt`

::: warning 安全说明
插件是 Python 代码，会在 NekoBot 进程中执行。请只安装可信来源的插件。远程 URL / Git 仓库安装能力会在上传校验、权限确认和依赖安装提示完善后再正式开放。
:::

## 插件目录结构

推荐插件目录如下：

```text
data/plugins/
└── my_plugin/
    ├── __init__.py       # 框架发现入口，导出插件类
    ├── main.py           # 插件逻辑
    ├── metadata.yaml     # 插件元信息，可选但推荐
    ├── requirements.txt  # 第三方依赖，可选
    └── README.md         # 插件说明，可选
```

`__init__.py` 示例：

```python
from .main import MyPlugin

__all__ = ["MyPlugin"]
```

## metadata.yaml

`metadata.yaml` 用于 WebUI 展示插件信息：

```yaml
name: my_plugin
display_name: 我的插件
version: 1.0.0
description: 插件描述
author: yourname
repository: https://github.com/you/my_plugin
tags:
  - utility
nekobot_version: ">=0.1.0"
support_platforms:
  - onebot_v11
```

必填字段：

- `name`
- `version`
- `description`
- `author`

## 最小插件示例

`main.py`：

```python
from packages.decorators import command, event_handler, plugin
from packages.plugins import BasePlugin


@plugin(name="my_plugin", version="1.0.0", description="示例插件")
class MyPlugin(BasePlugin):
    @command(name="hello", aliases=("hi",), description="打招呼")
    async def hello(self, payload: dict) -> None:
        args = payload.get("command_args", [])
        name = args[0] if args else "NekoBot"
        await self.reply(f"Hello, {name}!")

    @event_handler(event="message.group", description="群消息处理")
    async def on_group_message(self, payload: dict) -> None:
        text = payload.get("plain_text", "")
        if isinstance(text, str) and text.strip().lower() == "ping":
            await self.reply("pong")
```

## 加载与热重载

启动时，NekoBot 会扫描 `data/plugins/` 下包含 `__init__.py` 的目录。

运行中可以在 WebUI 的「插件管理」页面执行热重载。热重载会卸载旧注册项，重新导入插件模块并绑定新的命令、事件处理器和工具。

## 插件配置

插件配置存放在主配置文件的 `plugin_configs` 字段中，并通过 `PluginContext` 注入：

```json
{
  "plugin_configs": {
    "my_plugin": {
      "enabled_feature": true,
      "message": "hello"
    }
  }
}
```

插件中读取配置：

```python
message = self.get_config("message", "hello")
```

## 启用与禁用

插件启用状态存放在 `plugin_bindings` 中。WebUI 修改启用状态后会写入配置；后续事件处理会根据绑定关系决定插件是否参与处理。

## 依赖安装

如果插件目录中存在 `requirements.txt`，当前加载器会尝试使用 `uv pip install -r requirements.txt`，失败后回退到 `pip install -r requirements.txt`。

::: warning
依赖安装可能执行第三方包的安装脚本。生产环境建议只安装可信插件，并在后续版本中使用 WebUI 确认、日志记录或隔离环境。
:::

## 手动安装插件

当前推荐方式是手动安装：

1. 将插件目录放入 `data/plugins/`
2. 确认包含 `__init__.py`
3. 启动 NekoBot，或在 WebUI 中执行热重载
4. 在 WebUI 中配置和启用插件

## 后续规划

以下能力属于规划或预留方向：

- WebUI 上传 zip 安装插件
- 远程 URL / GitHub / Gitee 安装
- 插件市场
- 插件签名或 hash 校验
- 依赖安装确认和回滚

这些能力会优先保证登录鉴权、文件结构校验、zip 路径穿越检查和失败回滚后再开放。

## 相关文档

- [插件开发](../develop/plugin)
- [框架配置](./framework-configuration)
- [平台对接](./platforms)
