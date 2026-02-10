import{_ as a,c as n,o as p,az as i}from"./chunks/framework.OpiqYVxT.js";const d=JSON.parse('{"title":"架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"guide/architecture.md","filePath":"guide/architecture.md","lastUpdated":1767345782000}'),l={name:"guide/architecture.md"};function e(t,s,h,c,o,r){return p(),n("div",null,[...s[0]||(s[0]=[i(`<h1 id="架构设计" tabindex="-1">架构设计 <a class="header-anchor" href="#架构设计" aria-label="Permalink to &quot;架构设计&quot;">​</a></h1><p>本文档详细介绍 NekoBot 的系统架构设计。</p><h2 id="整体架构" tabindex="-1">整体架构 <a class="header-anchor" href="#整体架构" aria-label="Permalink to &quot;整体架构&quot;">​</a></h2><p>NekoBot 采用分层架构设计，分为以下几个核心层次：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Web Dashboard                       │</span></span>
<span class="line"><span>│              (React 19 + TypeScript + Vite)           │</span></span>
<span class="line"><span>│                 独立部署或集成部署                     │</span></span>
<span class="line"><span>└─────────────────────┬───────────────────────────────────┘</span></span>
<span class="line"><span>                      │ HTTP / WebSocket</span></span>
<span class="line"><span>                      ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    Quart 应用层                         │</span></span>
<span class="line"><span>│                   (app.py / routes/)                    │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  - 路由管理 (动态路由管理器)                            │</span></span>
<span class="line"><span>│  - JWT 认证中间件                                       │</span></span>
<span class="line"><span>│  - WebSocket 实时日志                                   │</span></span>
<span class="line"><span>│  - 静态文件服务                                         │</span></span>
<span class="line"><span>└─────────────────────┬───────────────────────────────────┘</span></span>
<span class="line"><span>                      │</span></span>
<span class="line"><span>                      ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    核心服务层                           │</span></span>
<span class="line"><span>│                  (packages/core/)                       │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  - 插件管理器 (plugin_manager.py)                      │</span></span>
<span class="line"><span>│  - 平台管理器 (platform/manager.py)                     │</span></span>
<span class="line"><span>│  - 消息流水线 (pipeline/scheduler_new.py)              │</span></span>
<span class="line"><span>│  - 事件总线 (event_bus.py)                              │</span></span>
<span class="line"><span>│  - 会话管理 (session_manager.py)                        │</span></span>
<span class="line"><span>│  - 知识库管理 (knowledge_base.py)                       │</span></span>
<span class="line"><span>│  - LLM 管理 (llm/)                                      │</span></span>
<span class="line"><span>│  - Agent 系统 (agent/)                                  │</span></span>
<span class="line"><span>└─────────────────────┬───────────────────────────────────┘</span></span>
<span class="line"><span>                      │</span></span>
<span class="line"><span>          ┌───────────┴───────────┐</span></span>
<span class="line"><span>          ▼                       ▼</span></span>
<span class="line"><span>┌─────────────────────┐  ┌─────────────────────┐</span></span>
<span class="line"><span>│    平台适配层       │  │     LLM 服务层      │</span></span>
<span class="line"><span>│  (packages/platform/)│  │   (packages/llm/)   │</span></span>
<span class="line"><span>├─────────────────────┤  ├─────────────────────┤</span></span>
<span class="line"><span>│ - QQ (OneBot V11)  │  │ - OpenAI            │</span></span>
<span class="line"><span>│ - Discord          │  │ - Google Gemini     │</span></span>
<span class="line"><span>│ - Telegram         │  │ - Claude            │</span></span>
<span class="line"><span>│ - 飞书              │  │ - DeepSeek          │</span></span>
<span class="line"><span>│ - KOOK             │  │ - DashScope         │</span></span>
<span class="line"><span>│ - QQ频道            │  │ - Moonshot          │</span></span>
<span class="line"><span>│ - Slack            │  │ - ZhipuAI           │</span></span>
<span class="line"><span>│ - 企业微信          │  │ - Ollama (本地)     │</span></span>
<span class="line"><span>└─────────────────────┘  └─────────────────────┘</span></span>
<span class="line"><span>                      │</span></span>
<span class="line"><span>                      ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                    插件层                               │</span></span>
<span class="line"><span>│                (packages/plugins/)                      │</span></span>
<span class="line"><span>├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│  - 插件基类 (base.py)                                   │</span></span>
<span class="line"><span>│  - 权限过滤器 (filters/)                                │</span></span>
<span class="line"><span>│  - 热重载 (hot_reload.py)                               │</span></span>
<span class="line"><span>│  - 用户插件 (data/plugins/)                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="项目目录结构" tabindex="-1">项目目录结构 <a class="header-anchor" href="#项目目录结构" aria-label="Permalink to &quot;项目目录结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>NekoBot/</span></span>
<span class="line"><span>├── packages/                    # 核心后端代码</span></span>
<span class="line"><span>│   ├── agent/                   # Agent 系统</span></span>
<span class="line"><span>│   │   ├── mcp/                 # MCP 协议支持</span></span>
<span class="line"><span>│   │   │   ├── client.py        # MCP 客户端</span></span>
<span class="line"><span>│   │   │   └── server.py        # MCP 服务端</span></span>
<span class="line"><span>│   │   ├── tools/               # 工具注册和管理</span></span>
<span class="line"><span>│   │   │   ├── base.py          # 工具基类</span></span>
<span class="line"><span>│   │   │   ├── function_tool.py # 函数工具</span></span>
<span class="line"><span>│   │   │   ├── handoff_tool.py  # 交接工具</span></span>
<span class="line"><span>│   │   │   └── registry.py      # 工具注册表</span></span>
<span class="line"><span>│   │   ├── base.py              # Agent 基类</span></span>
<span class="line"><span>│   │   ├── base_new.py          # 新版 Agent 基类</span></span>
<span class="line"><span>│   │   ├── executor.py          # Agent 执行引擎</span></span>
<span class="line"><span>│   │   ├── hooks.py             # 生命周期钩子</span></span>
<span class="line"><span>│   │   └── tool_system.py       # 工具系统</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── auth/                    # JWT 认证系统</span></span>
<span class="line"><span>│   │   ├── hash.py              # 密码哈希</span></span>
<span class="line"><span>│   │   ├── jwt.py               # JWT 令牌</span></span>
<span class="line"><span>│   │   └── user.py              # 用户模型</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── config/                  # 配置管理</span></span>
<span class="line"><span>│   │   └── manager.py           # 配置管理器</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── conversation/            # 对话管理</span></span>
<span class="line"><span>│   │   └── manager.py           # 对话管理器</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── core/                    # 核心模块</span></span>
<span class="line"><span>│   │   ├── knowledge_base/      # 知识库系统</span></span>
<span class="line"><span>│   │   │   ├── chunking/        # 文档分块策略</span></span>
<span class="line"><span>│   │   │   │   ├── base.py      # 分块基类</span></span>
<span class="line"><span>│   │   │   │   ├── fixed_size.py# 固定大小分块</span></span>
<span class="line"><span>│   │   │   │   └── recursive.py # 递归分块</span></span>
<span class="line"><span>│   │   │   ├── parsers/         # 文档解析器</span></span>
<span class="line"><span>│   │   │   │   ├── base.py      # 解析器基类</span></span>
<span class="line"><span>│   │   │   │   ├── markdown_parser.py</span></span>
<span class="line"><span>│   │   │   │   ├── pdf_parser.py</span></span>
<span class="line"><span>│   │   │   │   ├── text_parser.py</span></span>
<span class="line"><span>│   │   │   │   └── url_parser.py</span></span>
<span class="line"><span>│   │   │   ├── retrieval/       # 检索和排序</span></span>
<span class="line"><span>│   │   │   │   ├── manager.py</span></span>
<span class="line"><span>│   │   │   │   ├── parse_retriever.py</span></span>
<span class="line"><span>│   │   │   │   ├── rank_fusion.py</span></span>
<span class="line"><span>│   │   │   │   └── sparse_retriever.py</span></span>
<span class="line"><span>│   │   │   └── kb_manager.py    # 知识库管理器</span></span>
<span class="line"><span>│   │   ├── pipeline/            # 消息处理流水线</span></span>
<span class="line"><span>│   │   │   ├── scheduler_new.py # 新版调度器（洋葱模型）</span></span>
<span class="line"><span>│   │   │   ├── stage.py         # 阶段基类</span></span>
<span class="line"><span>│   │   │   ├── context.py       # 上下文管理</span></span>
<span class="line"><span>│   │   │   └── [各处理阶段]</span></span>
<span class="line"><span>│   │   ├── vector_db/           # 向量数据库</span></span>
<span class="line"><span>│   │   │   ├── base.py          # 向量库基类</span></span>
<span class="line"><span>│   │   │   └── in_memory.py     # 内存向量库</span></span>
<span class="line"><span>│   │   ├── command_management.py      # 命令管理</span></span>
<span class="line"><span>│   │   ├── config_reload_manager.py   # 配置重载管理</span></span>
<span class="line"><span>│   │   ├── context_manager.py         # 上下文管理器</span></span>
<span class="line"><span>│   │   ├── database.py                # 数据库管理</span></span>
<span class="line"><span>│   │   ├── event_bus.py               # 事件总线</span></span>
<span class="line"><span>│   │   ├── hot_reload_manager.py      # 热重载管理</span></span>
<span class="line"><span>│   │   ├── plugin_manager.py          # 插件管理器</span></span>
<span class="line"><span>│   │   ├── prompt_manager.py          # 提示词管理</span></span>
<span class="line"><span>│   │   ├── server.py                  # 服务器</span></span>
<span class="line"><span>│   │   ├── session_manager.py         # 会话管理</span></span>
<span class="line"><span>│   │   └── version.py                 # 版本信息</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── llm/                     # LLM 服务商集成</span></span>
<span class="line"><span>│   │   ├── sources/             # 各 LLM 提供商实现</span></span>
<span class="line"><span>│   │   │   ├── claude_provider.py</span></span>
<span class="line"><span>│   │   │   ├── dashscope_provider.py</span></span>
<span class="line"><span>│   │   │   ├── deepseek_provider.py</span></span>
<span class="line"><span>│   │   │   ├── gemini_provider.py</span></span>
<span class="line"><span>│   │   │   ├── glm_provider.py</span></span>
<span class="line"><span>│   │   │   ├── lm_studio_provider.py</span></span>
<span class="line"><span>│   │   │   ├── moonshot_provider.py</span></span>
<span class="line"><span>│   │   │   ├── ollama_provider.py</span></span>
<span class="line"><span>│   │   │   ├── openai_provider.py</span></span>
<span class="line"><span>│   │   │   └── zhipu_provider.py</span></span>
<span class="line"><span>│   │   ├── base.py              # LLM 基类</span></span>
<span class="line"><span>│   │   ├── context_manager.py   # 上下文管理</span></span>
<span class="line"><span>│   │   ├── register.py          # LLM 注册</span></span>
<span class="line"><span>│   │   └── [其他 LLM 相关模块]</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── platform/                # 平台适配器</span></span>
<span class="line"><span>│   │   ├── sources/             # 各平台实现</span></span>
<span class="line"><span>│   │   │   ├── aiocqhttp/       # QQ (OneBot V11)</span></span>
<span class="line"><span>│   │   │   ├── discord/</span></span>
<span class="line"><span>│   │   │   ├── kook/</span></span>
<span class="line"><span>│   │   │   ├── lark/            # 飞书</span></span>
<span class="line"><span>│   │   │   ├── qqchannel/       # QQ频道</span></span>
<span class="line"><span>│   │   │   ├── slack/</span></span>
<span class="line"><span>│   │   │   ├── telegram/</span></span>
<span class="line"><span>│   │   │   └── wecom/           # 企业微信</span></span>
<span class="line"><span>│   │   ├── base.py              # 平台基类</span></span>
<span class="line"><span>│   │   ├── manager.py           # 平台管理器</span></span>
<span class="line"><span>│   │   └── register.py          # 平台注册</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── plugins/                 # 插件系统</span></span>
<span class="line"><span>│   │   ├── filters/             # 权限过滤器</span></span>
<span class="line"><span>│   │   │   ├── base.py          # 过滤器基类</span></span>
<span class="line"><span>│   │   │   └── permission_filter.py</span></span>
<span class="line"><span>│   │   ├── base.py              # 插件基类</span></span>
<span class="line"><span>│   │   ├── dependency_manager.py# 依赖管理</span></span>
<span class="line"><span>│   │   ├── hot_reload.py        # 热重载</span></span>
<span class="line"><span>│   │   └── metadata.py          # 插件元数据</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   └── routes/                  # API 路由</span></span>
<span class="line"><span>│       ├── agent_route.py       # Agent 路由</span></span>
<span class="line"><span>│       ├── auth_route.py        # 认证路由</span></span>
<span class="line"><span>│       ├── backup_route.py      # 备份路由</span></span>
<span class="line"><span>│       ├── bot_config.py        # 机器人配置</span></span>
<span class="line"><span>│       ├── chat_route.py        # 聊天路由</span></span>
<span class="line"><span>│       ├── command_route.py     # 命令路由</span></span>
<span class="line"><span>│       ├── conversation_route.py# 对话路由</span></span>
<span class="line"><span>│       ├── hot_reload_route.py  # 热重载路由</span></span>
<span class="line"><span>│       ├── knowledge_base_route.py# 知识库路由</span></span>
<span class="line"><span>│       ├── llm_route.py         # LLM 路由</span></span>
<span class="line"><span>│       ├── log_route.py         # 日志路由</span></span>
<span class="line"><span>│       ├── mcp_route.py         # MCP 路由</span></span>
<span class="line"><span>│       ├── plugin_route.py      # 插件路由</span></span>
<span class="line"><span>│       └── [其他路由模块]</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── main.py                      # 主入口</span></span>
<span class="line"><span>├── app.py                       # Quart 应用</span></span>
<span class="line"><span>├── pyproject.toml               # 项目配置</span></span>
<span class="line"><span>├── Dockerfile                   # Docker 构建文件</span></span>
<span class="line"><span>├── docker-compose.yaml          # Docker 部署配置</span></span>
<span class="line"><span>├── compose.yaml                 # Compose 配置</span></span>
<span class="line"><span>└── LICENSE                      # AGPL-3.0 许可证</span></span></code></pre></div><h2 id="核心组件详解" tabindex="-1">核心组件详解 <a class="header-anchor" href="#核心组件详解" aria-label="Permalink to &quot;核心组件详解&quot;">​</a></h2><h3 id="quart-应用层" tabindex="-1">Quart 应用层 <a class="header-anchor" href="#quart-应用层" aria-label="Permalink to &quot;Quart 应用层&quot;">​</a></h3><p>Quart 应用层是整个系统的入口点，基于异步 Flask 框架。</p><p><strong>主要职责:</strong></p><ul><li>管理所有 HTTP 路由</li><li>处理 WebSocket 连接</li><li>实现 JWT 认证中间件</li><li>提供静态文件服务</li></ul><p><strong>动态路由管理:</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> packages.routes.dynamic_route_manager </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DynamicRouteManager</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">route_manager </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DynamicRouteManager()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">route_manager.register_routes(app)</span></span></code></pre></div><h3 id="核心服务层" tabindex="-1">核心服务层 <a class="header-anchor" href="#核心服务层" aria-label="Permalink to &quot;核心服务层&quot;">​</a></h3><h4 id="插件管理器-plugin-manager-py" tabindex="-1">插件管理器 (plugin_manager.py) <a class="header-anchor" href="#插件管理器-plugin-manager-py" aria-label="Permalink to &quot;插件管理器 (plugin_manager.py)&quot;">​</a></h4><p>负责插件的加载、启用、禁用和消息分发。</p><p><strong>主要方法:</strong></p><ul><li><code>load_plugins()</code> - 加载所有插件</li><li><code>enable_plugin()</code> - 启用指定插件</li><li><code>disable_plugin()</code> - 禁用指定插件</li><li><code>reload_plugin()</code> - 重载指定插件</li><li><code>dispatch_message()</code> - 分发消息到插件</li></ul><p><strong>插件生命周期:</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Plugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> on_load</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;插件加载时调用&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> on_unload</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;插件卸载时调用&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> on_enable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;插件启用时调用&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> on_disable</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;插件禁用时调用&quot;&quot;&quot;</span></span></code></pre></div><h4 id="平台管理器-platform-manager-py" tabindex="-1">平台管理器 (platform/manager.py) <a class="header-anchor" href="#平台管理器-platform-manager-py" aria-label="Permalink to &quot;平台管理器 (platform/manager.py)&quot;">​</a></h4><p>管理所有平台适配器。</p><p><strong>主要方法:</strong></p><ul><li><code>load_platforms()</code> - 加载平台配置</li><li><code>start_all()</code> - 启动所有平台</li><li><code>stop_all()</code> - 停止所有平台</li><li><code>send_message()</code> - 发送消息到指定平台</li></ul><h4 id="消息流水线-pipeline" tabindex="-1">消息流水线 (pipeline/) <a class="header-anchor" href="#消息流水线-pipeline" aria-label="Permalink to &quot;消息流水线 (pipeline/)&quot;">​</a></h4><p>基于洋葱模型的消息处理管道，支持多个处理阶段。</p><p><strong>流水线阶段:</strong></p><ol><li><code>WhitelistCheckStage</code> - 白名单检查</li><li><code>ContentSafetyCheckStage</code> - 内容安全检查</li><li><code>RateLimitStage</code> - 频率限制</li><li><code>SessionStatusCheckStage</code> - 会话状态检查</li><li><code>WakingCheckStage</code> - 唤醒检查</li><li><code>ProcessStage</code> - 处理阶段（调用插件）</li><li><code>ResultDecorateStage</code> - 结果装饰</li><li><code>RespondStage</code> - 响应发送</li><li><code>RAGEnhanceStage</code> - RAG 增强</li><li><code>SessionSummaryStage</code> - 会话摘要</li></ol><p><strong>洋葱模型示意图:</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────┐</span></span>
<span class="line"><span>│     SessionSummaryStage             │</span></span>
<span class="line"><span>│   ┌───────────────────────────────┐ │</span></span>
<span class="line"><span>│   │     RespondStage              │ │</span></span>
<span class="line"><span>│   │   ┌─────────────────────────┐ │ │</span></span>
<span class="line"><span>│   │   │   ProcessStage          │ │ │</span></span>
<span class="line"><span>│   │   │ ┌─────────────────────┐ │ │ │</span></span>
<span class="line"><span>│   │   │ │  [其他阶段...]      │ │ │ │</span></span>
<span class="line"><span>│   │   │ └─────────────────────┘ │ │ │</span></span>
<span class="line"><span>│   │   └─────────────────────────┘ │ │</span></span>
<span class="line"><span>│   └───────────────────────────────┘ │</span></span>
<span class="line"><span>└─────────────────────────────────────┘</span></span></code></pre></div><h4 id="事件总线-event-bus-py" tabindex="-1">事件总线 (event_bus.py) <a class="header-anchor" href="#事件总线-event-bus-py" aria-label="Permalink to &quot;事件总线 (event_bus.py)&quot;">​</a></h4><p>实现发布-订阅模式的事件系统。</p><p><strong>使用示例:</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> packages.core.event_bus </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event_bus</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 发布事件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event_bus.publish(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;message_received&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, message)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 订阅事件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">@event_bus.subscribe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;message_received&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> handle_message</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(message):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;收到消息: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">message</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h3 id="agent-系统" tabindex="-1">Agent 系统 <a class="header-anchor" href="#agent-系统" aria-label="Permalink to &quot;Agent 系统&quot;">​</a></h3><h4 id="mcp-协议支持" tabindex="-1">MCP 协议支持 <a class="header-anchor" href="#mcp-协议支持" aria-label="Permalink to &quot;MCP 协议支持&quot;">​</a></h4><p>支持 Model Context Protocol (MCP)，实现 Agent 与外部工具的交互。</p><p><strong>组件:</strong></p><ul><li><code>mcp/client.py</code> - MCP 客户端实现</li><li><code>mcp/server.py</code> - MCP 服务端实现</li></ul><h4 id="工具系统" tabindex="-1">工具系统 <a class="header-anchor" href="#工具系统" aria-label="Permalink to &quot;工具系统&quot;">​</a></h4><ul><li><code>tools/base.py</code> - 工具基类</li><li><code>tools/function_tool.py</code> - 函数工具</li><li><code>tools/handoff_tool.py</code> - 交接工具</li><li><code>tools/registry.py</code> - 工具注册表</li></ul><h3 id="知识库系统" tabindex="-1">知识库系统 <a class="header-anchor" href="#知识库系统" aria-label="Permalink to &quot;知识库系统&quot;">​</a></h3><h4 id="文档解析" tabindex="-1">文档解析 <a class="header-anchor" href="#文档解析" aria-label="Permalink to &quot;文档解析&quot;">​</a></h4><p>支持多种文档格式的解析：</p><ul><li>Markdown 解析器</li><li>PDF 解析器</li><li>文本解析器</li><li>URL 解析器</li></ul><h4 id="文档分块策略" tabindex="-1">文档分块策略 <a class="header-anchor" href="#文档分块策略" aria-label="Permalink to &quot;文档分块策略&quot;">​</a></h4><ul><li><code>fixed_size.py</code> - 固定大小分块</li><li><code>recursive.py</code> - 递归分块</li></ul><h4 id="检索系统" tabindex="-1">检索系统 <a class="header-anchor" href="#检索系统" aria-label="Permalink to &quot;检索系统&quot;">​</a></h4><ul><li><code>sparse_retriever.py</code> - 稀疏检索</li><li><code>parse_retriever.py</code> - 解析检索</li><li><code>rank_fusion.py</code> - 排序融合</li></ul><h3 id="平台适配层" tabindex="-1">平台适配层 <a class="header-anchor" href="#平台适配层" aria-label="Permalink to &quot;平台适配层&quot;">​</a></h3><p>每个平台适配器需要实现以下接口：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> packages.platform.base </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> BasePlatform</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyPlatform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BasePlatform</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @abstractmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> connect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;连接到平台&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @abstractmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> send_message</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, message_type, target_id, message):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;发送消息&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @abstractmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> disconnect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;断开连接&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @abstractmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_stats</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;获取统计信息&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        pass</span></span></code></pre></div><h3 id="llm-服务层" tabindex="-1">LLM 服务层 <a class="header-anchor" href="#llm-服务层" aria-label="Permalink to &quot;LLM 服务层&quot;">​</a></h3><p>支持 10+ 个 LLM 提供商，每个提供商实现统一接口：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> packages.llm.base </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> BaseLLMProvider</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyLLMProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BaseLLMProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> text_chat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, prompt, session_id, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">kwargs):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;文本对话&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> text_chat_stream</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, prompt, session_id, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">**</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">kwargs):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;流式对话&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        pass</span></span></code></pre></div><h2 id="数据流" tabindex="-1">数据流 <a class="header-anchor" href="#数据流" aria-label="Permalink to &quot;数据流&quot;">​</a></h2><h3 id="消息接收流程" tabindex="-1">消息接收流程 <a class="header-anchor" href="#消息接收流程" aria-label="Permalink to &quot;消息接收流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>平台适配器接收消息</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>转换为统一消息模型</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>发布到事件总线</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>流水线调度器处理</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>执行各个流水线阶段（洋葱模型）</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>ProcessStage 调用插件处理</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>RespondStage 发送响应</span></span></code></pre></div><h3 id="命令处理流程" tabindex="-1">命令处理流程 <a class="header-anchor" href="#命令处理流程" aria-label="Permalink to &quot;命令处理流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户发送命令</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>平台适配器接收</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>转换为统一消息模型</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>命令管理器匹配命令</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>调用对应插件的命令处理函数</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>返回响应</span></span></code></pre></div><h3 id="agent-执行流程" tabindex="-1">Agent 执行流程 <a class="header-anchor" href="#agent-执行流程" aria-label="Permalink to &quot;Agent 执行流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户消息</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>LLM 理解意图</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>Agent 执行引擎</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>工具调用（通过 MCP 或函数工具）</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>结果返回给 LLM</span></span>
<span class="line"><span>    ↓</span></span>
<span class="line"><span>生成最终响应</span></span></code></pre></div><h2 id="异步处理" tabindex="-1">异步处理 <a class="header-anchor" href="#异步处理" aria-label="Permalink to &quot;异步处理&quot;">​</a></h2><p>NekoBot 全面采用异步架构：</p><ul><li><strong>Quart</strong> - 异步版本的 Flask</li><li><strong>asyncio</strong> - Python 异步 I/O 库</li><li><strong>aiohttp</strong> - 异步 HTTP 客户端</li></ul><p>所有插件方法和平台适配器方法都应该是异步的：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> my_command</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, args, message):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    await</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.send_group_message(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="配置管理" tabindex="-1">配置管理 <a class="header-anchor" href="#配置管理" aria-label="Permalink to &quot;配置管理&quot;">​</a></h2><p>配置文件位于 <code>data/</code> 目录：</p><ul><li><code>config.json</code> - 主配置文件</li><li><code>platforms_sources.json</code> - 平台配置</li><li><code>llm_providers.json</code> - LLM 提供商配置</li><li><code>users.json</code> - 用户数据</li></ul><h2 id="事件驱动架构" tabindex="-1">事件驱动架构 <a class="header-anchor" href="#事件驱动架构" aria-label="Permalink to &quot;事件驱动架构&quot;">​</a></h2><p>NekoBot 使用事件驱动架构：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> packages.core.event_bus </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event_bus</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 发布事件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> event_bus.publish(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plugin_loaded&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, plugin_info)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 订阅事件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">@event_bus.subscribe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;plugin_loaded&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> on_plugin_loaded</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(plugin_info):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;插件已加载: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">plugin_info[</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;name&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>这种设计使得：</p><ul><li>平台适配器和插件解耦</li><li>支持异步消息处理</li><li>可以方便地添加新的事件处理阶段</li></ul><h2 id="扩展性" tabindex="-1">扩展性 <a class="header-anchor" href="#扩展性" aria-label="Permalink to &quot;扩展性&quot;">​</a></h2><h3 id="添加新平台" tabindex="-1">添加新平台 <a class="header-anchor" href="#添加新平台" aria-label="Permalink to &quot;添加新平台&quot;">​</a></h3><ol><li>在 <code>packages/platform/sources/</code> 下创建新的平台适配器</li><li>继承 <code>BasePlatform</code> 并实现必需方法</li><li>在 <code>packages/platform/register.py</code> 中注册</li></ol><h3 id="添加新-llm-提供商" tabindex="-1">添加新 LLM 提供商 <a class="header-anchor" href="#添加新-llm-提供商" aria-label="Permalink to &quot;添加新 LLM 提供商&quot;">​</a></h3><ol><li>在 <code>packages/llm/sources/</code> 下创建新的 LLM 提供商</li><li>继承基类并实现接口</li><li>在 <code>packages/llm/register.py</code> 中注册</li></ol><h3 id="添加流水线阶段" tabindex="-1">添加流水线阶段 <a class="header-anchor" href="#添加流水线阶段" aria-label="Permalink to &quot;添加流水线阶段&quot;">​</a></h3><ol><li>在 <code>packages/core/pipeline/</code> 下创建新的阶段类</li><li>继承 <code>Stage</code> 并实现 <code>execute()</code> 方法</li><li>在流水线初始化时添加</li></ol><h2 id="性能考虑" tabindex="-1">性能考虑 <a class="header-anchor" href="#性能考虑" aria-label="Permalink to &quot;性能考虑&quot;">​</a></h2><ul><li>使用异步 I/O 提高并发性能</li><li>使用连接池管理数据库连接</li><li>使用缓存减少重复计算</li><li>使用队列缓冲事件处理</li><li>支持分布式部署</li></ul><h2 id="安全考虑" tabindex="-1">安全考虑 <a class="header-anchor" href="#安全考虑" aria-label="Permalink to &quot;安全考虑&quot;">​</a></h2><ul><li>JWT 认证保护 API 端点</li><li>bcrypt 加密用户密码</li><li>输入验证防止注入攻击</li><li>频率限制防止滥用</li><li>权限过滤器控制插件访问</li></ul><h2 id="相关文档" tabindex="-1">相关文档 <a class="header-anchor" href="#相关文档" aria-label="Permalink to &quot;相关文档&quot;">​</a></h2><ul><li><a href="./../develop/plugin.html">插件开发</a></li><li><a href="./../develop/platform-adapter.html">平台适配器开发</a></li><li><a href="./../develop/llm-provider.html">LLM 提供商开发</a></li><li><a href="./agent.html">Agent 系统</a></li><li><a href="./knowledge-base.html">知识库系统</a></li></ul>`,89)])])}const g=a(l,[["render",e]]);export{d as __pageData,g as default};
