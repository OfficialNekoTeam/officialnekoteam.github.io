---
layout: home
title: 首页

hero:
  name: NekoBot
  text: 多平台智能聊天机器人框架
  tagline: 基于 Quart + asyncio 的事件驱动框架，插件化架构，多 LLM 集成
  image:
    src: /logo.svg
    alt: NekoBot Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/OfficialNekoTeam/NekoBot
    - theme: alt
      text: 仪表盘
      link: https://github.com/OfficialNekoTeam/Nekobot-Dashboard

features:
  - title: OneBot V11 支持
    icon: 💬
    details: 当前内置 OneBot V11 适配器，可通过 NapCatQQ 等实现接入 QQ 私聊和群聊。
  - title: 多 LLM Provider
    icon: 🤖
    details: 内置 OpenAI、Anthropic、Gemini、OpenAI Compatible、TTS/STT 等 Provider。
  - title: 插件系统
    icon: 🧩
    details: 基于装饰器注册插件、命令和事件处理器，支持启动扫描和热重载。
  - title: WebUI 管理
    icon: 📊
    details: 通过 WebUI 管理 Provider、平台配置、插件配置、MCP、日志和会话数据。
  - title: MCP 工具支持
    icon: 🔧
    details: 集成 Model Context Protocol，可接入外部工具服务扩展 LLM 能力。
  - title: 权限与会话
    icon: 🔐
    details: 支持权限引擎、SQLite 会话持久化和多维度会话隔离。
  - title: 配置热重载
    icon: ⚙️
    details: 支持配置文件监听、SIGUSR1 热重载和插件热重载。
  - title: 完全异步架构
    icon: ⚡
    details: 基于 asyncio 的平台连接、消息分发、Provider 调用和 Web API。
---

## 当前状态

> NekoBot 仍处于快速迭代阶段。文档以当前重构版实现为准，旧版 `nekobot-old` 仅作为历史参考。

| 模块 | 状态 |
|------|------|
| 核心框架 | ✅ 已实现 |
| OneBot V11 适配器 | ✅ 已实现 |
| LLM Provider | ✅ 已实现 |
| 插件加载 / 热重载 | ✅ 已实现 |
| WebUI/API | ✅ 已实现 |
| MCP 支持 | ✅ 已实现 |
| 知识库接口 | 🚧 插槽已预留，具体能力依赖实现/插件 |
| 插件上传安装 | 🗓️ 规划中 |
| 插件市场 | 🗓️ 规划中 |
| 更多平台适配器 | 🗓️ 规划中 |
