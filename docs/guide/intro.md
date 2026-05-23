# 什么是 NekoBot

NekoBot 是一个基于 Python 3.13+ 的多平台智能聊天机器人框架，采用完全异步架构（asyncio + Quart），以插件化设计为核心，支持接入多个 LLM 服务商。

## 设计理念

- **插件优先**：所有业务逻辑均通过插件实现，框架本身只提供基础设施。
- **平台无关**：消息抽象层屏蔽平台差异，同一插件可在不同平台运行。
- **可观测**：内置结构化日志（loguru），WebUI 实时查看，无需 SSH 即可管理。
- **配置驱动**：JSON 配置文件，WebUI 可视化编辑，无需重启即可热更新。

## 当前支持平台

| 平台 | 协议 | 状态 |
|------|------|------|
| QQ | OneBot V11（`onebot_v11`） | ✅ 可用 |
| 更多平台 | — | 🗓️ 规划中 |

## 当前支持 LLM 提供商

| 提供商 | 类型标识 | 特性 |
|--------|----------|------|
| OpenAI | `openai` | 聊天、函数调用、TTS、STT |
| Anthropic | `anthropic` | 聊天、函数调用 |
| Google Gemini | `gemini` | 聊天、多模态 |
| OpenAI Compatible | `openai_compatible` | 自定义端点，兼容本地模型 |
| Edge TTS | `edge_tts` | 免费文字转语音 |

## 项目结构

```
NekoBot/
├── main.py                  # 启动入口
├── pyproject.toml           # 项目元数据与依赖
├── data/
│   ├── config.json          # 主配置文件
│   ├── plugins/             # 已安装插件
│   └── dist/                # WebUI 前端静态文件
└── packages/
    ├── app.py               # 核心框架 (NekoBotFramework)
    ├── platforms/           # 平台适配器
    │   └── onebot_v11/      # OneBot V11 实现
    ├── providers/           # LLM 提供商
    ├── plugins/             # 插件管理器
    ├── routers/             # Web API 路由
    └── ...
```

## 许可证

NekoBot 采用 [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) 许可证开源。
