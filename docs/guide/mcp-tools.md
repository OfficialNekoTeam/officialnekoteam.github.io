# MCP 工具

NekoBot 集成了 **Model Context Protocol (MCP)**，允许 LLM 在对话中调用外部工具服务。

## 什么是 MCP

MCP 是 Anthropic 提出的开放协议，定义了 AI 模型与外部工具服务之间的通信标准。通过 MCP Server，LLM 可以执行文件读写、网络请求、数据库查询等操作。

## 在 WebUI 中管理 MCP 服务器

1. 打开 WebUI → **MCP 服务器**
2. 点击「添加服务器」
3. 填写服务器连接信息
4. 启用后 LLM 即可在对话中调用该服务器提供的工具

## 配置示例

以 stdio 方式启动一个本地 MCP 服务器：

```json
{
  "name": "filesystem",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"],
  "transport": "stdio"
}
```

以 SSE 方式连接远程 MCP 服务器：

```json
{
  "name": "remote_tools",
  "url": "http://localhost:8080/sse",
  "transport": "sse"
}
```

## 工作原理

1. NekoBot 启动时加载已配置的 MCP 服务器并获取工具列表
2. LLM 调用时，框架将工具描述注入 system prompt 或 tools 参数
3. LLM 决定调用某个工具时，框架转发请求到对应 MCP 服务器
4. 工具执行结果返回给 LLM 继续对话

## 注意事项

- MCP 工具调用会消耗额外的 LLM token
- 确保 MCP 服务器进程保持运行，否则对应工具不可用
- stdio 类型服务器由框架负责启动子进程
