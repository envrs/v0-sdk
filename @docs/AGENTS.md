---
title: Agents
description: Agent-facing discovery for v0 SDK, API, and MCP surfaces.
product: v0
type: reference
---

# v0 SDK Agents

This repository contains the v0 SDK and related tools.

## SDK Packages

- **v0** — TypeScript SDK for the v0 API. Generated from OpenAPI schema. Supports streaming responses and Vercel OIDC auth.
- **@v0-sdk/react** — React hooks and AI SDK transport for browser clients.
- **@v0-sdk/ai-tools** — AI SDK tools for autonomous agents.
- **create-v0-sdk-app** — Scaffold a new project with v0 SDK integration.

## API Reference

### Streaming

```ts
import { v0, readV0Stream } from 'v0'

const result = await v0.chats.createStream({ message: 'Build a todo app' })

for await (const update of readV0Stream(result).stream) {
  console.log(update)
}
```

### Chat Operations

```ts
import { v0 } from 'v0'

// Create chat
const chat = await v0.chats.create({ message: 'Build me a website' })

// List chats
const chats = await v0.chats.list({ limit: 10 })

// Send message (streaming)
const stream = await v0.messages.sendStream({ chatId, message: 'Add a nav bar' })

// Get preview
const preview = await v0.chats.getPreview({ chatId })

// Deploy
await v0.chats.deploy({ chatId, versionId })
```

### MCP Servers

```ts
import { v0 } from 'v0'

// Create MCP server
const mcp = await v0.mcpServers.create({ url: 'https://example.com/mcp', auth: { type: 'none' } })

// List MCP servers
const servers = await v0.mcpServers.list()

// Update MCP server
await v0.mcpServers.update({ mcpServerId: mcp.id, enabled: true })

// Delete MCP server
await v0.mcpServers.delete({ mcpServerId: mcp.id })
```

### Projects

```ts
import { v0 } from 'v0'

// Create project
const project = await v0.projects.create({ name: 'My Project' })

// Assign chat to project
await v0.projects.assign({ chatId, projectId })

// List projects
const projects = await v0.projects.list()
```

### Usage & Billing

```ts
import { v0 } from 'v0'

const usage = await v0.usage.getSummary()
const activity = await v0.usage.getActivity()
const events = await v0.usage.listEvents({ limit: 100 })
```

## Agent Capabilities

v0 agents can perform these capabilities:

- **Web search** — Search the web for current information
- **Browser use** — Open URLs, take screenshots, interact with pages
- **Terminal commands** — Run bash commands with Ask/Auto/Full permission modes
- **Tool calls** — Use tools like file edit, search, code execution
- **Error fixing** — Automatically fix build errors and code issues
- **MCP integration** — Connect to external MCP servers for extended capabilities

## Task Resolution

v0 may request user input during agent execution via tasks:

- **Questions** — v0 asks multiple-choice or open-ended questions
- **Plan review** — v0 proposes a plan and asks for approval/rejection
- **Integration setup** — v0 requests connecting external services (databases, APIs)
- **Permissions** — v0 requests permission for tool actions (file edit, bash, etc.)

Handle these using `getPendingV0Task()` from `@v0-sdk/react` or `TaskResolution` component in v0-clone example.

## Design Systems

Design Systems 2.0 allows teaching v0 your design system:

1. Create a design system skill from sources (package, app, Figma, docs)
2. Save as a `v0.json` + `SKILL.md` skill
3. Attach to chats for component-aware generation

## SDK Design

The core SDK (`v0`) is:

- **Generated** from `packages/v0-sdk/openapi.json` via `@hey-api/openapi-ts`
- **Typed** with full TypeScript types for all API operations
- **Streaming-first** — native support for SSE streams via `V0StreamResult`
- **Auth-flexible** — Supports API keys, Vercel OIDC, or custom auth

The React package (`@v0-sdk/react`) provides:

- **V0Transport** — AI SDK-compatible transport layer
- **AgentActions** — React component for rendering agent actions
- **useV0Query/Mutation/Cursor** — SWR-based data fetching
- **Message conversion** — v0 message ↔ AI SDK UI message conversion
