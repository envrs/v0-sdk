# Plan: Analyze @docs & Implement Codebases

## Implementation Status: Complete ✅

### Completed

| Area | Details | Status |
|------|---------|--------|
| `@docs/` export | 23 docs + 7 assets exported from v0.app/docs | ✅ Done |
| `@docs/AGENTS.md` | Repo-level agent-facing documentation | ✅ Done |
| `@v0-sdk/react` | Added `AgentActions` component (`chat/AgentActions.tsx`), extraction utilities (`chat/agent.ts`: `extractAgentActions`, `extractToolCalls`, `extractPendingTask`) | ✅ Done |
| `examples/react-chat` | Enhanced with `AgentActions` rendering, reasoning/file/text parts | ✅ Enhanced |
| `examples/agent-chat` | New agent chat example with pending task banners, action rendering | ✅ New |
| Verification | 10/10 typechecks, 11/11 builds, 43/43 tests, lint clean | ✅ Done |
| `examples/v0-clone` | Already had full agent rendering (message-parts, task-resolution) — no changes needed | ✅ Already complete |

### v0-clone Reference Architecture (already implemented)

| Component | File | Purpose |
|-----------|------|---------|
| Message parts | `apps/web/components/chat/message-parts.tsx` | Renders all agent action types (search, bash, tool-call, agent-action, file ops) |
| Task resolution | `apps/web/components/chat/task-resolution.tsx` | UI for questions, plan, integration, permissions tasks |
| Conversation view | `apps/web/components/chat/conversation-view.tsx` | Orchestrates message rendering + task resolution |

### Unchanged packages (already complete)

| Package | Reason |
|---------|--------|
| `v0` (core SDK) | Generated SDK covers full API v2 |
| `@v0-sdk/ai-tools` | All endpoints exposed as AI SDK tools |
| `create-v0-sdk-app` | Scaffolding functional |
| `examples/basic` | Sync/stream scripts functional |
| `examples/v0-clone` | Full production app already implemented |

### Verification

```
bun run typecheck  → 10/10 pass
bun run build      → 11/11 pass
bun run test       → 43/43 pass
bun run lint       → clean
```

## Future Work (not yet started)

### Remaining doc-sourced items (from original plan)

The following items from the original plan remain as future work. Many were superseded by what's already implemented above.

#### Core SDK (v0) — mostly covered by generated SDK
The generated SDK (`packages/v0-sdk/src/generated/sdk.gen.ts`, 1970 lines) already covers:
- [x] Chat CRUD, streaming, preview, deploy, download, resolve, resume
- [x] Message CRUD, send, stream, resolve, stop
- [x] MCP server management
- [x] Webhooks
- [x] Usage reporting
- [x] Settings

#### React/UI Layer — already done where needed
- [x] `AgentActions` component — renders agent actions from message parts
- [x] `extractAgentActions`, `extractToolCalls`, `extractPendingTask` — data extraction utilities
- [ ] `<V0Chat />` — full-featured chat component (not yet built as standalone)
- [ ] `<V0Stream />` — streaming UI component (not yet built as standalone)
- [ ] `<DesignSystemPicker />` — design system picker (not yet built)

#### New examples
- [ ] `examples/design-system-import` — design system import wizard
- [ ] `examples/api-v2-client` — raw API v2 client examples

#### Agent chat example improvements
- [ ] Add `TaskResolution` component to agent-chat (requires API routes for task resolution)
- [ ] Terminal command approval UI
- [ ] Browser screenshot viewer

#### v0-clone enhancements
- [ ] Integrate design system picker
- [ ] Design system import wizard
- [ ] Enhanced AI SDK tools integration

### 1.1 Content Inventory
- [ ] Categorize all @docs pages by topic (guides, reference, conceptual, integration)
- [ ] Map cross-references between docs (prerequisites, related links)
- [ ] Identify API surface areas referenced (v0 API v1, v2, adapters, MCP)
- [ ] Extract all code examples, prompt templates, and workflow patterns

### 1.2 Key Themes to Extract
- [ ] **Prompting patterns** — text prompting best practices, prompt templates from text-prompting.md
- [ ] **Agent capabilities** — web search, browser use, terminal commands, error fixing (agentic-features.md)
- [ ] **Integrations** — databases, AI models, MCP, GitHub, external APIs (databases.md, ai-models.md, mcp.md, github.md)
- [ ] **Deployment workflows** — publish, preview, CI/CD, branch management (deployments.md, github.md)
- [ ] **Design systems** — Design Systems 2.0 workflow, skill creation, v0.json schema (design-systems-2.md)
- [ ] **API patterns** — v0 SDK usage, streaming, chat management (from sitemap API reference sections)

### 1.3 Gap Analysis
- [ ] Compare @docs content against existing codebase (packages/*, examples/*)
- [ ] Identify undocumented features in current SDK
- [ ] Find missing integration examples
- [ ] Map doc features to SDK capabilities (coverage matrix)

## Phase 2: Codebase Implementation Roadmap

### 2.1 SDK Extensions (packages/*)

#### `@v0-sdk/v0-sdk` — Core SDK
- [ ] Implement chat session management (create, list, get, update, delete)
- [ ] Implement streaming response handling (readV0Stream, chat stream)
- [ ] Implement project management (create, assign, list projects)
- [ ] Implement deployment triggers (create, list, get deployment)
- [ ] Implement environment variable management (CRUD for env vars)
- [ ] Implement MCP server management (create, list, get, update, delete)
- [ ] Implement webhook management
- [ ] Implement usage/billing reporting
- [ ] Add TypeScript types for all API v2 endpoints (from sitemap reference)

#### `@v0-sdk/react` — React/UI Layer
- [ ] Implement `useChat` hook with streaming support
- [ ] Implement `useV0` hook for project/chat context
- [ ] Create `<V0Chat />` component with preview iframe
- [ ] Create `<V0Stream />` component for streaming UI
- [ ] Implement message rendering with @v0-sdk/react patterns
- [ ] Add design system integration hooks (attach skill, update skill)
- [ ] Create `<DesignSystemPicker />` component

#### `@v0-sdk/ai-tools` — AI SDK Adapters
- [ ] Implement AI SDK tool definitions for v0 API
- [ ] Create tool wrappers for: createChat, sendMessage, getPreview, deploy
- [ ] Implement agent integration tools (MCP server, terminal commands)
- [ ] Add streaming tool call support
- [ ] Create example: AI SDK app-generation interface

#### `create-v0-sdk-app` — Scaffolding
- [ ] Implement CLI scaffold with Next.js + AI SDK + v0 SDK
- [ ] Add templates for: chat app, dashboard, full-stack app
- [ ] Add design system import workflow
- [ ] Add TypeScript strict mode config

### 2.2 Example Implementations (examples/*)

#### React Chat (examples/react-chat) — Enhanced
- [ ] Full chat UI with V0Transport (existing, enhance)
- [ ] Design system attachment UI
- [ ] MCP server configuration panel
- [ ] Project/chat browser sidebar
- [ ] Streaming message rendering with code blocks
- [ ] Preview iframe with error handling (Fix with v0 integration)
- [ ] Agent action progress indicators
- [ ] Branch/deploy status display

#### Basic Scripts (examples/basic)
- [ ] Sync chat example (create + wait)
- [ ] Stream chat example (SSE handling)
- [ ] Deploy and preview example
- [ ] File upload + chat init example
- [ ] MCP server create + use example

### 2.3 New Example Codebases

#### `examples/agent-chat` — Agent-Focused Chat
- [ ] Chat UI with agent action visibility (web search, browser, terminal)
- [ ] Terminal command approval/auto-continue controls
- [ ] Browser screenshot viewer
- [ ] Fix with v0 integration panel
- [ ] MCP tool call display

#### `examples/design-system-import` — Design System Workflow
- [ ] Design system import wizard UI
- [ ] v0.json editor/previewer
- [ ] Skill browser and attach UI
- [ ] Starter app preview

#### `examples/api-v2-client` — API v2 Direct Usage
- [ ] Raw API v2 client (chats, messages, deployments, MCP)
- [ ] Streaming chat client (SSE)
- [ ] Async task polling utility
- [ ] Webhook setup utility

## Phase 3: Integration & Testing

### 3.1 Test Coverage
- [ ] Unit tests for all SDK methods (packages/*)
- [ ] Integration tests for streaming flows
- [ ] E2E tests for react-chat example
- [ ] Agent flow tests (terminal commands, MCP calls)
- [ ] Design system import/export tests

### 3.2 Documentation Code Samples
- [ ] Embed working code samples from @docs into READMEs
- [ ] Validate all code examples compile and run
- [ ] Add Quickstart guide using new SDK features

### 3.3 Quality Gates
- [ ] `bun run typecheck` — all packages pass
- [ ] `bun run test` — all packages pass
- [ ] `bun run lint` — no errors
- [ ] `bun run build` — all packages build
- [ ] All prompt templates from text-prompting.md produce working generations

## Phase 4: Delivery

### 4.1 Prioritization
| Priority | Item | Doc Source |
|----------|------|------------|
| P0 | Core SDK CRUD operations | sitemap API v2 reference |
| P0 | Streaming chat support | quickstart, faqs |
| P0 | React chat hook (useChat) | api/v2/guides/custom-chat-interface |
| P1 | MCP server management | mcp.md, api/v2/guides/mcp-server |
| P1 | Agent capabilities (terminal, browser) | agentic-features.md |
| P1 | Deploy/publish workflow | deployments.md |
| P2 | Design Systems 2.0 integration | design-systems-2.md |
| P2 | AI SDK tools adapter | ai-tools |
| P3 | Examples and edge cases | All docs |

### 4.2 Milestones
- **Milestone 1**: Core SDK + streaming chat (2-3 weeks)
- **Milestone 2**: React hooks + react-chat example (1-2 weeks)
- **Milestone 3**: Agent features + MCP integration (2-3 weeks)
- **Milestone 4**: Design systems + AI SDK tools (2 weeks)
- **Milestone 5**: Examples, tests, polish (1-2 weeks)

### 4.3 Success Criteria
- All @docs features have corresponding SDK methods
- All examples from docs are runnable
- Type coverage matches API reference completeness
- Agent workflows (prompt → iterate → deploy) fully supported
