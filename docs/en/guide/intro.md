# Introduction

NekoBot is an **event-driven chatbot framework** built with Python.

## What is NekoBot

NekoBot is a multi-platform intelligent chatbot framework designed to simplify the development, deployment, and management of chatbots. It adopts an event-driven asynchronous architecture, supports plugin extensions, and integrates multiple LLM service providers.

### Design Philosophy

- **Event-driven**: Asynchronous event processing for high-performance message response
- **Modular**: Plugin-based design for easy extension and maintenance
- **Fully decoupled**: Components communicate through clear interfaces, with platforms, plugins, and providers independent of each other
- **Cross-platform**: Support for multiple chat platform integrations
- **AI-native**: Deep integration with large language models and AI tools

## Architecture Overview

NekoBot uses a layered architecture design:

```
┌─────────────────────────────────────────────┐
│                Web UI (Quart)               │
├─────────────────────────────────────────────┤
│          NekoBotFramework (Core)            │
├─────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────┐│
│  │   Plugins   │ │  Providers  │ │  Tools  ││
│  └─────────────┘ └─────────────┘ └─────────┘│
├─────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────┐│
│  │  Platforms  │ │  Runtime    │ │  MCP    ││
│  └─────────────┘ └─────────────┘ └─────────┘│
└─────────────────────────────────────────────┘
```

### Core Components

1. **NekoBotFramework**: Main framework class coordinating all subsystems
2. **Platforms**: Platform adapters (currently supports OneBot V11/QQ)
3. **Providers**: LLM service provider integration (OpenAI, Anthropic, Gemini, etc.)
4. **Plugins**: Plugin system with hot-reload support
5. **Runtime**: Runtime registry and event dispatching
6. **Tools**: Tool registry with MCP protocol support
7. **Web UI**: Management interface based on Quart

### Fully Decoupled Architecture

NekoBot adopts a **fully decoupled** design philosophy where components communicate through clear interfaces and remain independent:

- **Platform Agnostic**: Platform adapters (`Platforms`) are decoupled from the core framework, communicating through the `PlatformEvent` interface
- **Plugin Independence**: Plugins (`Plugins`) register commands and event handlers via decorators without direct dependency on framework implementation
- **Provider Abstraction**: LLM providers (`Providers`) implement a unified `Provider` interface, allowing seamless switching
- **Tool Decoupling**: AI tools (`Tools`) are separated from execution logic, registered via MCP protocol or locally
- **Configuration Isolation**: Configuration system uses JSON Schema validation with isolated component configurations
- **Event Bus**: All communication flows through an event bus, eliminating direct dependencies between components

This design enables:
- Platform adapters to be developed and replaced independently
- Plugins to be hot-loaded/unloaded without affecting other components
- LLM providers to be switched on-demand (e.g., from OpenAI to Claude)
- Tools to be dynamically registered and unregistered
- Easy testing and maintenance of the system

## Core Features

### Event-Driven Architecture
- `PlatformEvent`-based event model
- Asynchronous message processing and dispatching
- Extensible event handler chain

### Plugin System
- Dynamic plugin loading/unloading
- Hot-reload support without restart
- Plugin communication and dependency management

### LLM Integration
- Support for OpenAI, Anthropic, Google Gemini
- Support for OpenAI-compatible APIs (DeepSeek, Ollama, etc.)
- Text-to-speech (TTS) and speech-to-text (STT)
- Unified Provider API interface

### Platform Support
- **OneBot V11 (QQ)**: Complete QQ bot support
- Supports WebSocket reverse connection and HTTP protocol

### Web Management Interface
- Built with Quart (async Flask)
- Visual configuration management
- Plugin management and log viewing
- Real-time status monitoring

### MCP Support
- Native Model Context Protocol support
- AI tool integration and management
- Skill management system

### Permission System
- Role-based permission control
- Fine-grained permission management
- Multi-level permissions (user, group, global)

### Conversation Management
- SQLite conversation storage
- Dialogue context management
- Automatic summarization and persistence

## Technology Stack

- **Backend**: Python 3.11+, Quart, SQLite, loguru
- **Frontend**: React 19, TypeScript, Vite, Material-UI (in development)
- **Communication**: WebSocket, HTTP, MCP protocol
- **Database**: SQLite (conversation storage)
- **Deployment**: Docker support

## Data Flow

```
User Message → Platform Adapter → PlatformEvent
    → BaseDispatcher → Event Dispatching
    → Command Handler / Event Handler
    → LLM Provider → Response Generation
    → Platform Adapter → User Reply
```

## Use Cases

### QQ Group Chatbot
- Intelligent Q&A and conversation
- Group management and automation
- Entertainment and gaming features

### AI Conversation Assistant
- Personal intelligent assistant
- Customer service and consulting bot
- Education and tutoring system

### Enterprise Applications
- Internal work assistant
- Automated workflows
- Data query and reporting

### Development Platform
- Rapid bot application development
- AI feature integration platform
- Plugin ecosystem building

## Project Status

NekoBot is currently in **active development** with stable core functionality.

### Completed Features
- Core framework and event-driven architecture
- Complete OneBot V11 platform support
- Multiple LLM provider integration
- Plugin system with hot-reload
- Basic Web management interface
- MCP protocol support
- Permission and conversation management

### Features in Development
- Additional platform adapters (when developed)
- Plugin marketplace and online installation
- Advanced knowledge base features
- Frontend Dashboard improvements

## Next Steps

- [Quick Start](./getting-started) - Start using NekoBot now
- Check [GitHub Project](https://github.com/OfficialNekoTeam/NekoBot) for latest code
- [Plugin Development](./plugin-development) - Learn how to develop NekoBot plugins