# 架构设计

本文档详细介绍 NekoBot 的系统架构设计。

## 整体架构

NekoBot 采用分层架构设计，分为以下几个核心层次：

```
┌─────────────────────────────────────────────────────────┐
│                    Web Dashboard                       │
│              (React 19 + TypeScript + Vite)           │
│                 独立部署或集成部署                     │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP / WebSocket
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    Quart 应用层                         │
│                   (app.py / routes/)                    │
├─────────────────────────────────────────────────────────┤
│  - 路由管理 (动态路由管理器)                            │
│  - JWT 认证中间件                                       │
│  - WebSocket 实时日志                                   │
│  - 静态文件服务                                         │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    核心服务层                           │
│                  (packages/core/)                       │
├─────────────────────────────────────────────────────────┤
│  - 插件管理器 (plugin_manager.py)                      │
│  - 平台管理器 (platform/manager.py)                     │
│  - 消息流水线 (pipeline/scheduler_new.py)              │
│  - 事件总线 (event_bus.py)                              │
│  - 会话管理 (session_manager.py)                        │
│  - 知识库管理 (knowledge_base.py)                       │
│  - LLM 管理 (llm/)                                      │
│  - Agent 系统 (agent/)                                  │
└─────────────────────┬───────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌─────────────────────┐  ┌─────────────────────┐
│    平台适配层       │  │     LLM 服务层      │
│  (packages/platform/)│  │   (packages/llm/)   │
├─────────────────────┤  ├─────────────────────┤
│ - QQ (OneBot V11)  │  │ - OpenAI            │
│ - Discord          │  │ - Google Gemini     │
│ - Telegram         │  │ - Claude            │
│ - 飞书              │  │ - DeepSeek          │
│ - KOOK             │  │ - DashScope         │
│ - QQ频道            │  │ - Moonshot          │
│ - Slack            │  │ - ZhipuAI           │
│ - 企业微信          │  │ - Ollama (本地)     │
└─────────────────────┘  └─────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    插件层                               │
│                (packages/plugins/)                      │
├─────────────────────────────────────────────────────────┤
│  - 插件基类 (base.py)                                   │
│  - 权限过滤器 (filters/)                                │
│  - 热重载 (hot_reload.py)                               │
│  - 用户插件 (data/plugins/)                             │
└─────────────────────────────────────────────────────────┘
```

## 项目目录结构

```
NekoBot/
├── packages/                    # 核心后端代码
│   ├── agent/                   # Agent 系统
│   │   ├── mcp/                 # MCP 协议支持
│   │   │   ├── client.py        # MCP 客户端
│   │   │   └── server.py        # MCP 服务端
│   │   ├── tools/               # 工具注册和管理
│   │   │   ├── base.py          # 工具基类
│   │   │   ├── function_tool.py # 函数工具
│   │   │   ├── handoff_tool.py  # 交接工具
│   │   │   └── registry.py      # 工具注册表
│   │   ├── base.py              # Agent 基类
│   │   ├── base_new.py          # 新版 Agent 基类
│   │   ├── executor.py          # Agent 执行引擎
│   │   ├── hooks.py             # 生命周期钩子
│   │   └── tool_system.py       # 工具系统
│   │
│   ├── auth/                    # JWT 认证系统
│   │   ├── hash.py              # 密码哈希
│   │   ├── jwt.py               # JWT 令牌
│   │   └── user.py              # 用户模型
│   │
│   ├── config/                  # 配置管理
│   │   └── manager.py           # 配置管理器
│   │
│   ├── conversation/            # 对话管理
│   │   └── manager.py           # 对话管理器
│   │
│   ├── core/                    # 核心模块
│   │   ├── knowledge_base/      # 知识库系统
│   │   │   ├── chunking/        # 文档分块策略
│   │   │   │   ├── base.py      # 分块基类
│   │   │   │   ├── fixed_size.py# 固定大小分块
│   │   │   │   └── recursive.py # 递归分块
│   │   │   ├── parsers/         # 文档解析器
│   │   │   │   ├── base.py      # 解析器基类
│   │   │   │   ├── markdown_parser.py
│   │   │   │   ├── pdf_parser.py
│   │   │   │   ├── text_parser.py
│   │   │   │   └── url_parser.py
│   │   │   ├── retrieval/       # 检索和排序
│   │   │   │   ├── manager.py
│   │   │   │   ├── parse_retriever.py
│   │   │   │   ├── rank_fusion.py
│   │   │   │   └── sparse_retriever.py
│   │   │   └── kb_manager.py    # 知识库管理器
│   │   ├── pipeline/            # 消息处理流水线
│   │   │   ├── scheduler_new.py # 新版调度器（洋葱模型）
│   │   │   ├── stage.py         # 阶段基类
│   │   │   ├── context.py       # 上下文管理
│   │   │   └── [各处理阶段]
│   │   ├── vector_db/           # 向量数据库
│   │   │   ├── base.py          # 向量库基类
│   │   │   └── in_memory.py     # 内存向量库
│   │   ├── command_management.py      # 命令管理
│   │   ├── config_reload_manager.py   # 配置重载管理
│   │   ├── context_manager.py         # 上下文管理器
│   │   ├── database.py                # 数据库管理
│   │   ├── event_bus.py               # 事件总线
│   │   ├── hot_reload_manager.py      # 热重载管理
│   │   ├── plugin_manager.py          # 插件管理器
│   │   ├── prompt_manager.py          # 提示词管理
│   │   ├── server.py                  # 服务器
│   │   ├── session_manager.py         # 会话管理
│   │   └── version.py                 # 版本信息
│   │
│   ├── llm/                     # LLM 服务商集成
│   │   ├── sources/             # 各 LLM 提供商实现
│   │   │   ├── claude_provider.py
│   │   │   ├── dashscope_provider.py
│   │   │   ├── deepseek_provider.py
│   │   │   ├── gemini_provider.py
│   │   │   ├── glm_provider.py
│   │   │   ├── lm_studio_provider.py
│   │   │   ├── moonshot_provider.py
│   │   │   ├── ollama_provider.py
│   │   │   ├── openai_provider.py
│   │   │   └── zhipu_provider.py
│   │   ├── base.py              # LLM 基类
│   │   ├── context_manager.py   # 上下文管理
│   │   ├── register.py          # LLM 注册
│   │   └── [其他 LLM 相关模块]
│   │
│   ├── platform/                # 平台适配器
│   │   ├── sources/             # 各平台实现
│   │   │   ├── aiocqhttp/       # QQ (OneBot V11)
│   │   │   ├── discord/
│   │   │   ├── kook/
│   │   │   ├── lark/            # 飞书
│   │   │   ├── qqchannel/       # QQ频道
│   │   │   ├── slack/
│   │   │   ├── telegram/
│   │   │   └── wecom/           # 企业微信
│   │   ├── base.py              # 平台基类
│   │   ├── manager.py           # 平台管理器
│   │   └── register.py          # 平台注册
│   │
│   ├── plugins/                 # 插件系统
│   │   ├── filters/             # 权限过滤器
│   │   │   ├── base.py          # 过滤器基类
│   │   │   └── permission_filter.py
│   │   ├── base.py              # 插件基类
│   │   ├── dependency_manager.py# 依赖管理
│   │   ├── hot_reload.py        # 热重载
│   │   └── metadata.py          # 插件元数据
│   │
│   └── routes/                  # API 路由
│       ├── agent_route.py       # Agent 路由
│       ├── auth_route.py        # 认证路由
│       ├── backup_route.py      # 备份路由
│       ├── bot_config.py        # 机器人配置
│       ├── chat_route.py        # 聊天路由
│       ├── command_route.py     # 命令路由
│       ├── conversation_route.py# 对话路由
│       ├── hot_reload_route.py  # 热重载路由
│       ├── knowledge_base_route.py# 知识库路由
│       ├── llm_route.py         # LLM 路由
│       ├── log_route.py         # 日志路由
│       ├── mcp_route.py         # MCP 路由
│       ├── plugin_route.py      # 插件路由
│       └── [其他路由模块]
│
├── main.py                      # 主入口
├── app.py                       # Quart 应用
├── pyproject.toml               # 项目配置
├── Dockerfile                   # Docker 构建文件
├── docker-compose.yaml          # Docker 部署配置
├── compose.yaml                 # Compose 配置
└── LICENSE                      # AGPL-3.0 许可证
```

## 核心组件详解

### Quart 应用层

Quart 应用层是整个系统的入口点，基于异步 Flask 框架。

**主要职责:**
- 管理所有 HTTP 路由
- 处理 WebSocket 连接
- 实现 JWT 认证中间件
- 提供静态文件服务

**动态路由管理:**

```python
from packages.routes.dynamic_route_manager import DynamicRouteManager

route_manager = DynamicRouteManager()
route_manager.register_routes(app)
```

### 核心服务层

#### 插件管理器 (plugin_manager.py)

负责插件的加载、启用、禁用和消息分发。

**主要方法:**
- `load_plugins()` - 加载所有插件
- `enable_plugin()` - 启用指定插件
- `disable_plugin()` - 禁用指定插件
- `reload_plugin()` - 重载指定插件
- `dispatch_message()` - 分发消息到插件

**插件生命周期:**
```python
class Plugin:
    async def on_load(self):
        """插件加载时调用"""

    async def on_unload(self):
        """插件卸载时调用"""

    async def on_enable(self):
        """插件启用时调用"""

    async def on_disable(self):
        """插件禁用时调用"""
```

#### 平台管理器 (platform/manager.py)

管理所有平台适配器。

**主要方法:**
- `load_platforms()` - 加载平台配置
- `start_all()` - 启动所有平台
- `stop_all()` - 停止所有平台
- `send_message()` - 发送消息到指定平台

#### 消息流水线 (pipeline/)

基于洋葱模型的消息处理管道，支持多个处理阶段。

**流水线阶段:**
1. `WhitelistCheckStage` - 白名单检查
2. `ContentSafetyCheckStage` - 内容安全检查
3. `RateLimitStage` - 频率限制
4. `SessionStatusCheckStage` - 会话状态检查
5. `WakingCheckStage` - 唤醒检查
6. `ProcessStage` - 处理阶段（调用插件）
7. `ResultDecorateStage` - 结果装饰
8. `RespondStage` - 响应发送
9. `RAGEnhanceStage` - RAG 增强
10. `SessionSummaryStage` - 会话摘要

**洋葱模型示意图:**
```
┌─────────────────────────────────────┐
│     SessionSummaryStage             │
│   ┌───────────────────────────────┐ │
│   │     RespondStage              │ │
│   │   ┌─────────────────────────┐ │ │
│   │   │   ProcessStage          │ │ │
│   │   │ ┌─────────────────────┐ │ │ │
│   │   │ │  [其他阶段...]      │ │ │ │
│   │   │ └─────────────────────┘ │ │ │
│   │   └─────────────────────────┘ │ │
│   └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### 事件总线 (event_bus.py)

实现发布-订阅模式的事件系统。

**使用示例:**
```python
from packages.core.event_bus import event_bus

# 发布事件
await event_bus.publish("message_received", message)

# 订阅事件
@event_bus.subscribe("message_received")
async def handle_message(message):
    print(f"收到消息: {message}")
```

### Agent 系统

#### MCP 协议支持

支持 Model Context Protocol (MCP)，实现 Agent 与外部工具的交互。

**组件:**
- `mcp/client.py` - MCP 客户端实现
- `mcp/server.py` - MCP 服务端实现

#### 工具系统

- `tools/base.py` - 工具基类
- `tools/function_tool.py` - 函数工具
- `tools/handoff_tool.py` - 交接工具
- `tools/registry.py` - 工具注册表

### 知识库系统

#### 文档解析

支持多种文档格式的解析：
- Markdown 解析器
- PDF 解析器
- 文本解析器
- URL 解析器

#### 文档分块策略

- `fixed_size.py` - 固定大小分块
- `recursive.py` - 递归分块

#### 检索系统

- `sparse_retriever.py` - 稀疏检索
- `parse_retriever.py` - 解析检索
- `rank_fusion.py` - 排序融合

### 平台适配层

每个平台适配器需要实现以下接口：

```python
from packages.platform.base import BasePlatform

class MyPlatform(BasePlatform):
    @abstractmethod
    async def connect(self):
        """连接到平台"""
        pass

    @abstractmethod
    async def send_message(self, message_type, target_id, message):
        """发送消息"""
        pass

    @abstractmethod
    async def disconnect(self):
        """断开连接"""
        pass

    @abstractmethod
    def get_stats(self):
        """获取统计信息"""
        pass
```

### LLM 服务层

支持 10+ 个 LLM 提供商，每个提供商实现统一接口：

```python
from packages.llm.base import BaseLLMProvider

class MyLLMProvider(BaseLLMProvider):
    async def text_chat(self, prompt, session_id, **kwargs):
        """文本对话"""
        pass

    async def text_chat_stream(self, prompt, session_id, **kwargs):
        """流式对话"""
        pass
```

## 数据流

### 消息接收流程

```
平台适配器接收消息
    ↓
转换为统一消息模型
    ↓
发布到事件总线
    ↓
流水线调度器处理
    ↓
执行各个流水线阶段（洋葱模型）
    ↓
ProcessStage 调用插件处理
    ↓
RespondStage 发送响应
```

### 命令处理流程

```
用户发送命令
    ↓
平台适配器接收
    ↓
转换为统一消息模型
    ↓
命令管理器匹配命令
    ↓
调用对应插件的命令处理函数
    ↓
返回响应
```

### Agent 执行流程

```
用户消息
    ↓
LLM 理解意图
    ↓
Agent 执行引擎
    ↓
工具调用（通过 MCP 或函数工具）
    ↓
结果返回给 LLM
    ↓
生成最终响应
```

## 异步处理

NekoBot 全面采用异步架构：

- **Quart** - 异步版本的 Flask
- **asyncio** - Python 异步 I/O 库
- **aiohttp** - 异步 HTTP 客户端

所有插件方法和平台适配器方法都应该是异步的：

```python
async def my_command(self, args, message):
    await self.send_group_message(...)
```

## 配置管理

配置文件位于 `data/` 目录：

- `config.json` - 主配置文件
- `platforms_sources.json` - 平台配置
- `llm_providers.json` - LLM 提供商配置
- `users.json` - 用户数据

## 事件驱动架构

NekoBot 使用事件驱动架构：

```python
from packages.core.event_bus import event_bus

# 发布事件
await event_bus.publish("plugin_loaded", plugin_info)

# 订阅事件
@event_bus.subscribe("plugin_loaded")
async def on_plugin_loaded(plugin_info):
    print(f"插件已加载: {plugin_info['name']}")
```

这种设计使得：
- 平台适配器和插件解耦
- 支持异步消息处理
- 可以方便地添加新的事件处理阶段

## 扩展性

### 添加新平台

1. 在 `packages/platform/sources/` 下创建新的平台适配器
2. 继承 `BasePlatform` 并实现必需方法
3. 在 `packages/platform/register.py` 中注册

### 添加新 LLM 提供商

1. 在 `packages/llm/sources/` 下创建新的 LLM 提供商
2. 继承基类并实现接口
3. 在 `packages/llm/register.py` 中注册

### 添加流水线阶段

1. 在 `packages/core/pipeline/` 下创建新的阶段类
2. 继承 `Stage` 并实现 `execute()` 方法
3. 在流水线初始化时添加

## 性能考虑

- 使用异步 I/O 提高并发性能
- 使用连接池管理数据库连接
- 使用缓存减少重复计算
- 使用队列缓冲事件处理
- 支持分布式部署

## 安全考虑

- JWT 认证保护 API 端点
- bcrypt 加密用户密码
- 输入验证防止注入攻击
- 频率限制防止滥用
- 权限过滤器控制插件访问

## 相关文档

- [插件开发](../develop/plugin.md)
- [平台适配器开发](../develop/platform-adapter.md)
- [LLM 提供商开发](../develop/llm-provider.md)
- [Agent 系统](./agent.md)
- [知识库系统](./knowledge-base.md)
