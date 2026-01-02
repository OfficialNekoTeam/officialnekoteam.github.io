# Web 仪表盘

NekoBot Dashboard 是基于 React 19 + TypeScript + Vite + Material-UI 构建的现代化管理后台系统，为 NekoBot 提供友好的可视化操作体验。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 19.2.0 | UI 框架 |
| TypeScript | 5.9 | 类型安全 |
| Vite | 7.2 | 构建工具 |
| Material-UI | 7.3 | UI 组件库 |
| React Router | 7.11 | 路由管理 |
| Axios | 1.13 | HTTP 客户端 |
| TailwindCSS | 4.1 | CSS 框架 |

## 功能概览

Web 仪表盘提供以下主要功能模块：

### 1. 认证模块
- 用户登录/登出
- 密码修改
- Token 管理
- 权限验证

### 2. 仪表盘
- 系统概览
- 插件统计
- 平台统计
- 消息统计
- 资源使用率监控
- 版本信息展示

### 3. 系统监控
- CPU 使用率监控
- 内存使用率监控
- 磁盘使用率监控
- 网络连接状态
- 进程信息监控
- 实时数据刷新（5秒间隔）

### 4. 插件管理
- 插件列表展示
- 启用/禁用插件
- 插件重载
- 上传插件
- 删除插件
- 插件配置编辑

### 5. 平台管理
- 平台列表展示
- 添加/删除平台
- 更新平台配置
- 平台状态管理

### 6. 设置管理
- 系统设置查看/编辑
- 机器人配置管理
- WebUI 版本管理
- 服务重启
- 更新检查

### 7. 日志查看
- 日志文件列表
- 日志内容查看
- 日志类型筛选
- 实时日志更新

### 8. 人设管理
- 人设列表
- 创建/编辑/删除人设
- 人设启用/禁用

### 9. 提示词管理
- 系统提示词管理
- 工具提示词管理
- 创建/编辑/删除提示词

### 10. 命令管理
- 命令列表
- 启用/禁用命令
- 命令重命名
- 冲突检测

### 11. LLM 管理
- LLM 提供商列表
- 添加/编辑/删除提供商
- 支持的提供商类型
- API 密钥管理

### 12. 会话管理
- 会话列表
- 创建新会话
- 查看会话详情
- 删除会话
- 会话总结

### 13. 热重载
- 热重载统计
- 插件热重载
- 配置热重载
- 动态路由管理

## 项目结构

```
nekobot-dashboard/
├── src/
│   ├── api/                 # API 服务层
│   │   ├── auth.ts          # 认证 API
│   │   ├── bot.ts           # 机器人配置 API
│   │   ├── system.ts        # 系统监控 API
│   │   ├── stat.ts          # 统计数据 API
│   │   ├── plugin.ts        # 插件管理 API
│   │   ├── platform.ts      # 平台管理 API
│   │   ├── llm.ts           # LLM 管理 API
│   │   ├── session.ts       # 会话管理 API
│   │   └── ...
│   ├── components/          # 通用组件
│   ├── contexts/            # React Context
│   │   └── AuthContext.tsx  # 认证上下文
│   ├── layout/              # 布局组件
│   ├── menu-items/          # 菜单配置
│   ├── routes/              # 路由配置
│   ├── themes/              # 主题配置
│   ├── types/               # TypeScript 类型
│   ├── utils/               # 工具函数
│   └── views/               # 页面组件
│       ├── dashboard/       # 仪表盘
│       ├── system-monitor/  # 系统监控
│       ├── plugin-management/# 插件管理
│       └── ...
├── public/                  # 静态资源
├── package.json             # 项目配置
└── vite.config.ts           # Vite 配置
```

## API 接口对接

仪表盘通过后端 API 获取所有数据，主要接口包括：

- `/api/auth/*` - 认证相关
- `/api/bot/*` - 机器人配置
- `/api/system/*` - 系统监控
- `/api/stat/*` - 统计数据
- `/api/plugins/*` - 插件管理
- `/api/platforms/*` - 平台管理
- `/api/llm/*` - LLM 管理
- `/api/sessions/*` - 会话管理

## 设计原则

1. **模块化设计** - 各功能模块独立，降低耦合
2. **类型安全** - 全面使用 TypeScript 确保类型安全
3. **组件复用** - 提取通用组件，提高开发效率
4. **API 抽象** - 统一的 API 调用接口
5. **响应式设计** - 支持多种屏幕尺寸
6. **主题支持** - 深色/浅色主题切换
7. **国际化** - 支持多语言切换（计划中）
8. **错误处理** - 统一的错误处理机制
9. **状态管理** - 使用 React Context 进行全局状态管理

## 浏览器支持

- Chrome（推荐）
- Firefox
- Safari
- Edge

## 相关链接

- [GitHub 仓库](https://github.com/NekoBotTeam/NekoBot-Dashboard)
- [仪表盘部署](./dashboard-deployment.md)
- [功能详细说明](./dashboard-features.md)