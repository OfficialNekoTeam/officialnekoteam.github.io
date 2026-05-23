# MCP Tool Integration

NekoBot natively supports the **Model Context Protocol (MCP)**, allowing plugins to expose functionality as AI-usable tools and integrate with external MCP servers.

## What is MCP?

Model Context Protocol (MCP) is an open protocol that allows AI applications to securely interact with external tools and services. Through MCP, NekoBot can:

1. **Expose plugin functionality** as AI-usable tools
2. **Integrate external tools** such as filesystem, search engines, databases, etc.
3. **Standardize tool calls** using a unified protocol format

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│    NekoBot      │◄──►│   MCP Manager   │◄──►│  MCP Servers    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Plugin Tools  │    │  Tool Registry  │    │ External Tools  │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Plugin Tool Development

Plugins can expose functions as AI tools using the `@agent_tool` decorator.

### Basic Example

```python
from nekobot.decorators import plugin, agent_tool
from nekobot.contracts import ToolResult

@plugin
class MyPlugin:
    @agent_tool(
        name="search_web",
        description="Search web information",
        parameters={
            "query": {
                "type": "string",
                "description": "Search keywords"
            },
            "limit": {
                "type": "integer",
                "description": "Number of results",
                "default": 5
            }
        }
    )
    async def search_web(self, query: str, limit: int = 5) -> ToolResult:
        """Execute web search and return results"""
        # Implement search logic
        results = await self._perform_search(query, limit)
        
        return ToolResult(
            content=f"Found {len(results)} results:\n" + "\n".join(results),
            is_error=False
        )
```

### Tool Parameter Types

MCP supports the following parameter types:

| Type | Description | Example |
|------|-------------|---------|
| `string` | String | `"hello"` |
| `integer` | Integer | `42` |
| `number` | Floating point number | `3.14` |
| `boolean` | Boolean | `true` |
| `array` | Array | `["a", "b", "c"]` |
| `object` | Object | `{"key": "value"}` |

### Tool Return Values

Tools should return `ToolResult` objects:

```python
from nekobot.contracts import ToolResult

# Success result
return ToolResult(
    content="Operation completed successfully",
    is_error=False
)

# Error result
return ToolResult(
    content="Operation failed: file does not exist",
    is_error=True
)
```

## Configuring MCP Servers

NekoBot can connect to external MCP servers to extend the available toolset.

### Configuration File

Add MCP server configuration to `data/config.json`:

```json
{
  "framework_config": {
    "mcp_servers": [
      {
        "name": "filesystem",
        "enabled": true,
        "transport": "stdio",
        "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."]
      },
      {
        "name": "search",
        "enabled": true,
        "transport": "http",
        "url": "http://localhost:3001"
      },
      {
        "name": "github",
        "enabled": false,
        "transport": "sse",
        "url": "http://localhost:3002"
      }
    ]
  }
}
```

### Transport Protocols

NekoBot supports three MCP transport protocols:

#### 1. stdio (Standard Input/Output)
- Launch MCP server as subprocess
- Communicate via stdin/stdout
- Suitable for local tool servers

```json
{
  "name": "filesystem",
  "transport": "stdio",
  "command": ["npx", "-y", "@modelcontextprotocol/server-filesystem", "."]
}
```

#### 2. HTTP (Streaming HTTP)
- Connect to remote server via HTTP
- Supports streaming responses
- Suitable for remote services

```json
{
  "name": "search",
  "transport": "http",
  "url": "http://localhost:3001"
}
```

#### 3. SSE (Server-Sent Events)
- Connect via Server-Sent Events
- Supports real-time updates
- Suitable for long-connection scenarios

```json
{
  "name": "github",
  "transport": "sse",
  "url": "http://localhost:3002"
}
```

## Available MCP Servers

### Official MCP Servers

1. **Filesystem Server**
   ```bash
   npx -y @modelcontextprotocol/server-filesystem .
   ```
   - Provides file read/write functionality
   - Supports directory listing, file reading, file writing

2. **GitHub Server**
   ```bash
   npx -y @modelcontextprotocol/server-github
   ```
   - Provides GitHub API access
   - Supports repository browsing, Issue management, PR operations

3. **PostgreSQL Server**
   ```bash
   npx -y @modelcontextprotocol/server-postgres
   ```
   - Provides database query functionality
   - Supports SQL execution, data querying

### Community MCP Servers

1. **Search Engine Server**
   - Provides web search functionality
   - Supports Google, Bing, and other search engines

2. **Weather Server**
   - Provides weather query functionality
   - Supports real-time weather, weather forecasts

3. **Calendar Server**
   - Provides calendar management functionality
   - Supports event creation, querying, updating

## Tool Usage Examples

### Using Tools in Plugins

Plugins can access all available tools through the tool registry:

```python
from nekobot.decorators import plugin, command
from nekobot.contracts import ExecutionContext

@plugin
class ToolUsingPlugin:
    @command("search")
    async def search_command(self, ctx: ExecutionContext) -> None:
        # Get tool registry
        tool_registry = ctx.framework.tool_registry
        
        # Call tool
        result = await tool_registry.call_tool(
            "search_web",
            {"query": "NekoBot documentation", "limit": 3}
        )
        
        if result.is_error:
            await ctx.reply(f"Search failed: {result.content}")
        else:
            await ctx.reply(f"Search results:\n{result.content}")
```

### AI Automatic Tool Calls

When AI integration is enabled, LLMs can automatically call available tools:

```
User: Help me search for today's news
AI: I'll use the search tool to find news for you
[Automatically calls search_web tool]
AI: Found the following news: ...
```

## Tool Management

### View Available Tools

View all available tools via Web UI or API:

```bash
# API endpoint
GET /api/tools
```

Response example:
```json
{
  "tools": [
    {
      "name": "search_web",
      "description": "Search web information",
      "parameters": {
        "query": {"type": "string", "description": "Search keywords"},
        "limit": {"type": "integer", "description": "Number of results"}
      },
      "source": "plugin:MyPlugin"
    },
    {
      "name": "read_file",
      "description": "Read file content",
      "parameters": {
        "path": {"type": "string", "description": "File path"}
      },
      "source": "mcp:filesystem"
    }
  ]
}
```

### Tool Permission Control

Control tool access through the permission system:

```json
{
  "permission_config": {
    "tool_permissions": {
      "search_web": ["user_123", "user_456"],
      "read_file": ["admin_users"],
      "write_file": ["admin_users"]
    }
  }
}
```

## Troubleshooting

### Tools Not Showing
1. Check if plugin is loaded correctly
2. Confirm `@agent_tool` decorator is used correctly
3. Check tool registration information in logs

### MCP Server Connection Failed
1. Check if server configuration is correct
2. Confirm server process is running
3. Check network connection and firewall settings

### Tool Call Failed
1. Check if tool parameters meet requirements
2. Confirm tool implementation has no errors
3. Check tool call logs

## Performance Optimization

### Tool Caching

For frequently called tools, enable caching:

```python
@agent_tool(
    name="expensive_operation",
    description="Perform expensive operation",
    cache_ttl=300  # Cache for 5 minutes
)
async def expensive_operation(self, param: str) -> ToolResult:
    # Expensive operation
    pass
```

### Concurrency Control

Limit the number of concurrent tool calls:

```json
{
  "framework_config": {
    "tool_concurrency": {
      "max_workers": 10,
      "timeout": 30
    }
  }
}
```

## Security Considerations

### 1. Tool Permission Isolation
- Different users have different tool access permissions
- Sensitive tools are restricted to administrators only

### 2. Input Validation
- All tool parameters must be validated
- Prevent injection attacks

### 3. Output Filtering
- Sensitive information should not be exposed in tool output
- Implement output content filtering

### 4. Audit Logging
- Log all tool calls
- Include caller, parameters, result information

## Best Practices

### 1. Tool Design Principles
- **Single Responsibility**: Each tool does only one thing
- **Clear Interface**: Parameters and return values are clearly defined
- **Error Handling**: Provide meaningful error messages
- **Complete Documentation**: Include detailed usage instructions

### 2. Performance Considerations
- Avoid long-blocking operations
- Implement appropriate timeout mechanisms
- Consider adding caching layer

### 3. Maintainability
- Keep tool code concise
- Add unit tests
- Follow code standards

## Example Projects

Refer to official plugin examples for complete implementations:

- [NekoBot Plugin Template](https://github.com/OfficialNekoTeam/nekobot_plugin_template)
- [MCP Tool Example Plugin](https://github.com/OfficialNekoTeam/nekobot_mcp_example)

## Next Steps

- [Plugin Development](./plugin-development.md) - Learn how to develop NekoBot plugins
- [Framework Configuration](./framework-configuration.md) - Configure NekoBot framework
- [LLM Provider Configuration](./llm-providers.md) - Configure AI service integration