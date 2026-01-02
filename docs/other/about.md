# 关于 NekoBot

## 项目简介

NekoBot 是一个功能强大、易于扩展的多平台智能聊天机器人框架。它支持多个主流聊天平台和 LLM 服务商，提供完善的插件系统和现代化的 Web 管理界面。

## 核心特性

### 多平台支持

支持 8 个主流聊天平台，轻松实现跨平台消息同步和管理：

- **QQ** (OneBot V11) - 通过 NapCatQQ/NapCat 对接
- **Telegram** - 支持流式消息
- **Discord** - 功能丰富的 Discord Bot API
- **飞书** - 企业协作平台
- **KOOK** - 开黑平台，支持流式消息
- **QQ频道** - QQ 频道官方 API
- **Slack** - 工作区协作
- **企业微信** - 企业内部通讯

### 多 LLM 集成

支持 10+ 个主流 LLM 服务商：

- OpenAI (GPT-4o, GPT-4o-mini, GPT-3.5-turbo)
- Google Gemini (Gemini 2.0 Flash, Gemini 1.5 Pro)
- Claude (Claude 3.5 Sonnet, Claude 3.5 Haiku)
- DeepSeek (DeepSeek Chat, DeepSeek Coder)
- DashScope (阿里云通义千问)
- Moonshot (Kimi)
- ZhipuAI (智谱 GLM)
- Ollama (本地部署)
- LM Studio (本地部署)

### 插件系统

完善的插件生态，支持热加载、热重载：

- 本地插件安装
- 在线插件安装
- 插件配置管理
- 权限过滤器
- 依赖管理

### Agent 系统

强大的 AI Agent 能力：

- MCP 协议支持
- 函数调用
- 工具管理和注册
- 生命周期钩子
- Agent 执行引擎

### 知识库系统

智能知识管理和 RAG 支持：

- 向量数据库
- 文档解析（Markdown、PDF、文本、URL）
- 文档分块策略
- 检索和排序
- 检索增强生成（RAG）

### 消息流水线

灵活的消息处理机制：

- 洋葱模型调度器
- 多种处理阶段：
  - 白名单检查
  - 内容安全检查
  - 频率限制
  - 会话状态检查
  - 唤醒检查
  - 处理阶段
  - 结果装饰
  - 响应发送
  - 会话摘要

### Web 仪表盘

基于 React 19 + TypeScript + Vite + Material-UI 的现代化管理界面：

- 13 个主要功能模块
- 系统监控
- 插件管理
- 平台管理
- LLM 管理
- 会话管理
- 日志查看
- 实时更新

## 技术架构

### 后端

- **框架**: Quart (异步 Flask)
- **数据库**: SQLite + aiosqlite
- **认证**: JWT + bcrypt
- **异步处理**: asyncio
- **依赖管理**: uv

### 前端（Web 仪表盘）

- **框架**: React 19.2.0
- **类型系统**: TypeScript 5.9
- **构建工具**: Vite 7.2
- **UI 组件**: Material-UI 7.3
- **路由**: React Router DOM 7.11
- **HTTP 客户端**: Axios 1.13
- **样式**: TailwindCSS 4.1

## 项目结构

```
NekoBot/
├── packages/              # 核心后端代码
│   ├── agent/            # Agent 系统
│   ├── auth/             # 认证系统
│   ├── config/           # 配置管理
│   ├── core/             # 核心模块
│   │   ├── knowledge_base/  # 知识库系统
│   │   ├── pipeline/        # 消息流水线
│   │   └── vector_db/       # 向量数据库
│   ├── llm/              # LLM 服务商集成
│   ├── platform/         # 平台适配器
│   └── plugins/          # 插件系统
├── main.py               # 主入口
└── pyproject.toml        # 项目配置
```

## 相关项目

- **[NekoBot](https://github.com/NekoBotTeam/NekoBot)** - 主项目，后端框架
- **[NekoBot Dashboard](https://github.com/NekoBotTeam/NekoBot-Dashboard)** - Web 管理后台
- **[NekoBot Plugins Example](https://github.com/NekoBotTeam/NekoBot_Plugins_Example)** - 插件开发示例
- **[NekoBot 文档](https://docs.nekobot.dev)** - 项目文档（本站点）

## 开源协议

- **NekoBot**: [AGPL-3.0](https://github.com/NekoBotTeam/NekoBot/blob/main/LICENSE)
- **NekoBot Dashboard**: [MIT](https://github.com/NekoBotTeam/NekoBot-Dashboard/blob/main/LICENSE)
- **NekoBot 文档**: [MIT](https://github.com/NekoBotTeam/nekobotteam.github.io/blob/main/LICENSE)

## 路线图

### 已完成

- [x] QQ (OneBot V11) 支持
- [x] Discord 支持
- [x] Telegram 支持
- [x] 飞书 支持
- [x] KOOK 支持
- [x] QQ频道 支持
- [x] Slack 支持
- [x] 企业微信 支持
- [x] Agent 系统
- [x] 知识库系统
- [x] Pipeline 流水线
- [x] CLI 命令行工具
- [x] Web 仪表盘

### 计划中

- [ ] 更多平台适配器
- [ ] 插件市场
- [ ] 多语言完整支持
- [ ] 更多 LLM 提供商
- [ ] 性能优化
- [ ] 分布式部署支持

## 贡献指南

我们欢迎任何形式的贡献！

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 贡献规范

- 遵循项目代码风格
- 添加必要的测试
- 更新相关文档
- 使用中文编写注释和文档

详见 [贡献指南](./contributing.md)

## 联系方式

- **GitHub Issues**: [提交问题](https://github.com/NekoBotTeam/NekoBot/issues)
- **GitHub Discussions**: [参与讨论](https://github.com/NekoBotTeam/NekoBot/discussions)

## 致谢

感谢以下开源项目的启发和帮助：

- [AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [NapCatQQ/NapCat](https://github.com/NapNeko/NapCatQQ)

感谢所有贡献者的支持！

## 许可证

本项目采用 AGPL-3.0 许可证 - 查看 [LICENSE](https://github.com/NekoBotTeam/NekoBot/blob/main/LICENSE) 文件了解详情

---

**如果这个项目对你有帮助，请给个 Star ⭐**

Made with ❤️ by NekoBotTeam