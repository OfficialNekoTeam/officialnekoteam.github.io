---
layout: home
title: 首页

hero:
  name: NekoBot
  text: 多平台智能聊天机器人框架
  tagline: 基于 Quart + asyncio 的事件驱动框架，支持多平台与 LLM 集成
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
      text: Web 仪表盘
      link: https://github.com/OfficialNekoTeam/NekoBot-Dashboard

features:
  - title: 多平台支持
    icon: ✨
    details: 支持 QQ (OneBot V11)、Telegram、Discord、飞书、KOOK、QQ频道、Slack、企业微信等 8 个主流聊天平台，轻松实现跨平台消息同步和管理。
  - title: 多 LLM 集成
    icon: 🤖
    details: 集成 OpenAI、Google Gemini、Claude、DeepSeek、DashScope、Moonshot、ZhipuAI 等 10+ 个主流 LLM 服务商，提供强大的对话能力。
  - title: 插件系统
    icon: 🧩
    details: 完善的插件生态，支持热加载、热重载，通过插件快速扩展功能，支持本地和在线插件。
  - title: Web 仪表盘
    icon: 📊
    details: 基于 React + TypeScript + Vite + Material-UI 构建的现代化管理界面，提供友好的可视化操作体验。
  - title: Agent 系统
    icon: 🎯
    details: 支持 MCP 协议、函数调用和工具管理，构建强大的 AI Agent 能力。
  - title: 知识库系统
    icon: 📚
    details: 支持向量数据库、文档解析和检索增强（RAG），实现智能知识管理和问答。
  - title: 消息流水线
    icon: 🔄
    details: 洋葱模型的消息处理管道，支持多种处理阶段，灵活定制消息处理流程。
  - title: 高性能架构
    icon: ⚡
    details: 基于 Quart (异步 Flask) 的异步架构，高性能处理消息和请求，支持实时日志推送。
  - title: 安全可靠
    icon: 🔒
    details: JWT 认证、bcrypt 密码加密，确保数据和账户安全，支持会话隔离和权限管理。
---

## 开发进度

| 模块 | 状态 |
|------|------|
| 核心框架 (app.py) | ✅ 完成 |
| LLM Handler (handler.py) | ✅ 完成（已拆分为 mixin 模块） |
| 平台适配器 (OneBot V11) | ✅ 完成 |
| LLM Providers | ✅ 完成 |
| 后端 API | 🔨 开发中 |
| Web Dashboard 前端 | 🔨 开发中 |
| MCP 支持 | ✅ 完成 |
| 技能系统 (Skills) | ✅ 完成 |

## 最新提交

- `374b9e1` - refactor: 拆分 handler.py 为 7 个 mixin 模块 + B7 竞态修复
- `59d8e31` - Merge PR #3: 格式化修复 + @唤醒兼容性增强
- `514a244` - style: 修复 import 排序 (ruff)