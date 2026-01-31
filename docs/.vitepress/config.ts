import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NekoBot',
  titleTemplate: 'NekoBot - :title',
  description: '多平台智能聊天机器人框架',
  base: '/',

  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      title: 'NekoBot',
      description: '多平台智能聊天机器人框架',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/getting-started' },
          { text: '配置', link: '/config/basic' },
          { text: '开发', link: '/develop/plugin' },
          { text: 'API', link: '/api/overview' },
          {
            text: '相关项目',
            items: [
              { text: 'NekoBot', link: 'https://github.com/OfficialNekoTeam/NekoBot' },
              { text: 'NekoBot Dashboard', link: 'https://github.com/OfficialNekoTeam/Nekobot-Dashboard' },
              { text: '插件示例', link: 'https://github.com/OfficialNekoTeam/nekobot_plugin_template' }
            ]
          }
        ],
        sidebar: {
          '/guide/': [
            {
              text: '快速开始',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/guide/getting-started' },
                { text: '什么是 NekoBot', link: '/guide/what-is-nekobot' },
                { text: '安装和配置', link: '/guide/installation' },
                { text: '启动方式', link: '/guide/startup' }
              ]
            },
            {
              text: '核心功能',
              collapsed: false,
              items: [
                { text: '架构设计', link: '/guide/architecture' },
                { text: '插件系统', link: '/guide/plugins' },
                { text: '命令系统', link: '/guide/commands' },
                { text: 'LLM 配置', link: '/guide/llm' },
                { text: 'Agent 系统', link: '/guide/agent' },
                { text: '知识库系统', link: '/guide/knowledge-base' },
                { text: '消息流水线', link: '/guide/pipeline' },
                { text: '日志管理', link: '/guide/logging' }
              ]
            },
            {
              text: '平台对接',
              collapsed: false,
              items: [
                { text: '平台对接', link: '/guide/platforms' },
                { text: 'QQ (OneBot V11)', link: '/guide/platforms/qq' },
                { text: 'Discord', link: '/guide/platforms/discord' },
                { text: 'Telegram', link: '/guide/platforms/telegram' },
                { text: '飞书', link: '/guide/platforms/feishu' },
                { text: 'KOOK', link: '/guide/platforms/kook' },
                { text: 'QQ频道', link: '/guide/platforms/qqchannel' },
                { text: 'Slack', link: '/guide/platforms/slack' },
                { text: '企业微信', link: '/guide/platforms/wecom' }
              ]
            },
            {
              text: 'Web 仪表盘',
              collapsed: false,
              items: [
                { text: '仪表盘介绍', link: '/guide/dashboard' },
                { text: '仪表盘部署', link: '/guide/dashboard-deployment' },
                { text: '功能概览', link: '/guide/dashboard-features' }
              ]
            }
          ],
          '/config/': [
            {
              text: '配置',
              collapsed: false,
              items: [
                { text: '基础配置', link: '/config/basic' },
                { text: '高级配置', link: '/config/advanced' },
                { text: 'LLM 提供商配置', link: '/config/llm-providers' },
                { text: '平台源配置', link: '/config/platform-sources' }
              ]
            }
          ],
          '/use/': [
            {
              text: '使用',
              collapsed: false,
              items: [
                { text: '接入框架', link: '/use/integration' },
                { text: '社区资源', link: '/use/community' },
                { text: '常见问题', link: '/use/faq' }
              ]
            }
          ],
          '/develop/': [
            {
              text: '开发',
              collapsed: false,
              items: [
                { text: '插件开发', link: '/develop/plugin' },
                { text: '插件 API', link: '/develop/plugin-api' },
                { text: '事件处理', link: '/develop/events' },
                { text: '消息类型', link: '/develop/messages' },
                { text: '平台适配器开发', link: '/develop/platform-adapter' },
                { text: 'LLM 提供商开发', link: '/develop/llm-provider' },
                { text: '开发规范', link: '/develop/coding-standards' }
              ]
            }
          ],
          '/api/': [
            {
              text: 'API 参考',
              collapsed: false,
              items: [
                { text: 'API 概览', link: '/api/overview' },
                { text: '认证 API', link: '/api/auth' },
                { text: '机器人配置 API', link: '/api/bot' },
                { text: '系统监控 API', link: '/api/system' },
                { text: '插件管理 API', link: '/api/plugin' },
                { text: '平台管理 API', link: '/api/platform' },
                { text: 'LLM 管理 API', link: '/api/llm' },
                { text: '会话管理 API', link: '/api/session' },
                { text: '知识库 API', link: '/api/knowledge-base' },
                { text: 'Agent API', link: '/api/agent' },
                { text: 'MCP API', link: '/api/mcp' }
              ]
            }
          ],
          '/other/': [
            {
              text: '其他',
              collapsed: false,
              items: [
                { text: '关于项目', link: '/other/about' },
                { text: '安全说明', link: '/other/security' },
                { text: '贡献指南', link: '/other/contributing' },
                { text: '许可证', link: '/other/license' },
                { text: '致谢', link: '/other/acknowledgments' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'NekoBot',
      description: 'Multi-platform intelligent chatbot framework',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/getting-started' },
          { text: 'Config', link: '/en/config/basic' },
          { text: 'Develop', link: '/en/develop/plugin' },
          { text: 'API', link: '/en/api/overview' },
          {
            text: 'Related Projects',
            items: [
              { text: 'NekoBot', link: 'https://github.com/OfficialNekoTeam/NekoBot' },
              { text: 'NekoBot Dashboard', link: 'https://github.com/OfficialNekoTeam/Nekobot-Dashboard' },
              { text: 'Plugin Examples', link: 'https://github.com/OfficialNekoTeam/nekobot_plugin_template' }
            ]
          }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Quick Start',
              collapsed: false,
              items: [
                { text: 'Quick Start', link: '/en/guide/getting-started' },
                { text: 'What is NekoBot', link: '/en/guide/what-is-nekobot' },
                { text: 'Installation', link: '/en/guide/installation' },
                { text: 'Startup', link: '/en/guide/startup' }
              ]
            },
            {
              text: 'Core Features',
              collapsed: false,
              items: [
                { text: 'Architecture', link: '/en/guide/architecture' },
                { text: 'Plugin System', link: '/en/guide/plugins' },
                { text: 'Command System', link: '/en/guide/commands' },
                { text: 'LLM Configuration', link: '/en/guide/llm' },
                { text: 'Agent System', link: '/en/guide/agent' },
                { text: 'Knowledge Base', link: '/en/guide/knowledge-base' },
                { text: 'Message Pipeline', link: '/en/guide/pipeline' },
                { text: 'Logging', link: '/en/guide/logging' }
              ]
            },
            {
              text: 'Platform Integration',
              collapsed: false,
              items: [
                { text: 'Platforms', link: '/en/guide/platforms' },
                { text: 'QQ (OneBot V11)', link: '/en/guide/platforms/qq' },
                { text: 'Discord', link: '/en/guide/platforms/discord' },
                { text: 'Telegram', link: '/en/guide/platforms/telegram' },
                { text: 'Feishu', link: '/en/guide/platforms/feishu' },
                { text: 'KOOK', link: '/en/guide/platforms/kook' },
                { text: 'QQ Channels', link: '/en/guide/platforms/qqchannel' },
                { text: 'Slack', link: '/en/guide/platforms/slack' },
                { text: 'WeCom', link: '/en/guide/platforms/wecom' }
              ]
            },
            {
              text: 'Web Dashboard',
              collapsed: false,
              items: [
                { text: 'Dashboard Introduction', link: '/en/guide/dashboard' },
                { text: 'Dashboard Deployment', link: '/en/guide/dashboard-deployment' },
                { text: 'Features Overview', link: '/en/guide/dashboard-features' }
              ]
            }
          ],
          '/en/config/': [
            {
              text: 'Configuration',
              collapsed: false,
              items: [
                { text: 'Basic Config', link: '/en/config/basic' },
                { text: 'Advanced Config', link: '/en/config/advanced' },
                { text: 'LLM Providers', link: '/en/config/llm-providers' },
                { text: 'Platform Sources', link: '/en/config/platform-sources' }
              ]
            }
          ],
          '/en/use/': [
            {
              text: 'Usage',
              collapsed: false,
              items: [
                { text: 'Integration', link: '/en/use/integration' },
                { text: 'Community', link: '/en/use/community' },
                { text: 'FAQ', link: '/en/use/faq' }
              ]
            }
          ],
          '/en/develop/': [
            {
              text: 'Development',
              collapsed: false,
              items: [
                { text: 'Plugin Development', link: '/en/develop/plugin' },
                { text: 'Plugin API', link: '/en/develop/plugin-api' },
                { text: 'Events', link: '/en/develop/events' },
                { text: 'Message Types', link: '/en/develop/messages' },
                { text: 'Platform Adapter', link: '/en/develop/platform-adapter' },
                { text: 'LLM Provider', link: '/en/develop/llm-provider' },
                { text: 'Coding Standards', link: '/en/develop/coding-standards' }
              ]
            }
          ],
          '/en/api/': [
            {
              text: 'API Reference',
              collapsed: false,
              items: [
                { text: 'API Overview', link: '/en/api/overview' },
                { text: 'Auth API', link: '/en/api/auth' },
                { text: 'Bot Config API', link: '/en/api/bot' },
                { text: 'System Monitor API', link: '/en/api/system' },
                { text: 'Plugin API', link: '/en/api/plugin' },
                { text: 'Platform API', link: '/en/api/platform' },
                { text: 'LLM API', link: '/en/api/llm' },
                { text: 'Session API', link: '/en/api/session' },
                { text: 'Knowledge Base API', link: '/en/api/knowledge-base' },
                { text: 'Agent API', link: '/en/api/agent' },
                { text: 'MCP API', link: '/en/api/mcp' }
              ]
            }
          ],
          '/en/other/': [
            {
              text: 'Other',
              collapsed: false,
              items: [
                { text: 'About', link: '/en/other/about' },
                { text: 'Security', link: '/en/other/security' },
                { text: 'Contributing', link: '/en/other/contributing' },
                { text: 'License', link: '/en/other/license' },
                { text: 'Acknowledgments', link: '/en/other/acknowledgments' }
              ]
            }
          ]
        }
      }
    }
  },

  themeConfig: {
    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search Docs',
                buttonAriaLabel: 'Search Docs'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear query',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate'
                }
              }
            }
          }
        }
      }
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/OfficialNekoTeam/NekoBot' }
    ],

    // 页脚
    footer: {
      message: '基于 AGPL-3.0 与 MIT 许可发布',
      copyright: 'Copyright © 2025-present OfficialNekoTeam'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/OfficialNekoTeam/officialnekoteam.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 大纲
    outline: {
      level: [2, 3],
      label: '页面大纲'
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // 侧边栏菜单
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // 头部配置
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: '多平台智能聊天机器人框架，支持 QQ、Telegram、Discord 等主流平台，集成 OpenAI、Gemini、Claude 等 LLM 服务商' }],
    ['meta', { name: 'keywords', content: 'NekoBot, 机器人, AI, 聊天机器人, 插件, 框架, QQ, Telegram, Discord, OpenAI, Gemini, Claude' }],
    ['meta', { property: 'og:title', content: 'NekoBot - 多平台智能聊天机器人框架' }],
    ['meta', { property: 'og:description', content: '支持多个聊天平台和 LLM 服务商的智能机器人框架' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://docs.nekobot.dev' }]
  ],

  vite: {
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'canvas-confetti',
        'vue'
      ]
    }
  }
})
