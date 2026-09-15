# v0 Documentation Coverage

Audit baseline: 2026-09-15. The repository contains the exported current documentation tree under `@docs/`; the public index was also fetched from `https://v0.app/docs/`. The SDK-specific API surface is defined by `packages/v0-sdk/openapi.json`, generated sources, and the handwritten React/AI-tool adapters.

## Reachable documentation inventory

| URL                      | Feature / area                           | API/version          | Relevant package         | Existing implementation                    | PLAN.md status   | Tests/examples    | Status         |
| ------------------------ | ---------------------------------------- | -------------------- | ------------------------ | ------------------------------------------ | ---------------- | ----------------- | -------------- |
| `/docs/`                 | Product overview                         | Product              | N/A                      | Product docs only                          | Completed export | N/A               | NOT_APPLICABLE |
| `/docs/quickstart`       | Getting started                          | SDK/API guidance     | `v0`, `@v0-sdk/react`    | SDK and examples                           | Completed        | basic, react-chat | VERIFIED       |
| `/docs/agentic-features` | Search, browser, terminal, agent actions | Agent workflow       | `@v0-sdk/react`          | extraction and AgentActions                | Future UI gaps   | agent-chat        | PARTIAL        |
| `/docs/ai-models`        | Model selection                          | Platform             | `v0`                     | Generated request types                    | Completed SDK    | basic             | VERIFIED       |
| `/docs/code-editing`     | Code editing                             | Product workflow     | N/A                      | UI/product docs                            | Completed export | v0-clone          | NOT_APPLICABLE |
| `/docs/custom-domain`    | Domains                                  | Product/Vercel       | N/A                      | No SDK-specific operation                  | Completed export | N/A               | NOT_APPLICABLE |
| `/docs/databases`        | Database integrations                    | Product/integration  | N/A                      | App-owned integration                      | Completed export | N/A               | NOT_APPLICABLE |
| `/docs/deployments`      | Publish, preview, deploy                 | API v2/product       | `v0`                     | Generated chat preview/deploy operations   | Completed SDK    | basic, v0-clone   | VERIFIED       |
| `/docs/design-mode`      | Design mode                              | Product/UI           | N/A                      | UI-only                                    | Completed export | v0-clone          | NOT_APPLICABLE |
| `/docs/design-systems`   | Design systems                           | Product/UI           | N/A                      | No confirmed SDK contract                  | Future example   | N/A               | NOT_APPLICABLE |
| `/docs/design-systems-2` | Design Systems 2.0, v0.json, skills      | Product/UI           | N/A                      | UI-only documentation                      | Future work      | N/A               | NOT_APPLICABLE |
| `/docs/faqs`             | API, plans, limits, workflows            | Product/API guidance | `v0`                     | Existing SDK behavior                      | Completed export | package tests     | VERIFIED       |
| `/docs/github`           | GitHub-backed projects                   | Platform API         | `v0`                     | Generated project/chat fields              | Completed SDK    | v0-clone          | VERIFIED       |
| `/docs/index`            | Documentation index                      | Product              | N/A                      | Documentation export                       | Completed        | N/A               | VERIFIED       |
| `/docs/mcp`              | MCP servers and tools                    | Platform API v2      | `v0`, `@v0-sdk/ai-tools` | Generated MCP operations and tool adapters | Completed SDK    | package tests     | VERIFIED       |
| `/docs/pricing`          | Pricing                                  | Product              | N/A                      | Product docs only                          | Completed export | N/A               | NOT_APPLICABLE |
| `/docs/projects`         | Projects                                 | Platform API v2      | `v0`                     | Generated project/chat operations          | Completed SDK    | v0-clone          | VERIFIED       |
| `/docs/text-prompting`   | Prompting patterns                       | Product guidance     | N/A                      | Not an SDK contract                        | Completed export | N/A               | NOT_APPLICABLE |
| `/docs/account`          | Account                                  | Product              | N/A                      | UI-only account docs                       | Completed export | N/A               | NOT_APPLICABLE |
| `/docs/assets/README`    | Documentation assets                     | Docs                 | N/A                      | Static assets                              | Completed export | N/A               | NOT_APPLICABLE |
| `/docs/AGENTS`           | Repository agent guidance                | Repository           | All                      | Process guidance                           | Completed export | N/A               | VERIFIED       |
| `/docs/README`           | Export notes                             | Repository           | All                      | Process guidance                           | Completed export | N/A               | VERIFIED       |
| `/docs/sitemap`          | Documentation/API navigation             | API v1/v2 references | `v0`                     | Generated OpenAPI is source of truth       | Completed export | surface tests     | PARTIAL        |
| `/docs/llms.txt`         | LLM documentation index                  | Docs                 | N/A                      | Static index                               | Completed export | N/A               | VERIFIED       |

## Prioritized gaps found

1. Public `V0Chat` must remain a thin, route-agnostic presentation/orchestration layer over AI SDK 7 and `V0Transport`; its current implementation needs resilient stop/resume/error behavior and no duplicated parsing.
2. `V0Stream` must be justified as presentation-only. The audit confirms a focused message-part renderer is useful, but it must safely handle malformed file/data parts and supported agent parts without inventing transport behavior.
3. Reusable task-resolution primitives are required for the existing `questions`, `plan`, `integration`, and `permissions` task model; terminal approval is only an example specialization.
4. `examples/agent-chat` needs to use the shared primitives while preserving its existing proxy routes and current streaming lifecycle.
5. Public exports, package/example documentation, focused tests, and final validation need to be reconciled with the exact installed AI SDK version.

## Scope decisions

- Generated core SDK code, completed API operations, extraction utilities, and unrelated packages are preserved.
- Product/UI-only docs are recorded but are not forced into the SDK.
- No undocumented stream events, task states, endpoints, or integrations are added.
- This matrix is refreshed after implementation and validation; a feature is `VERIFIED` only when implementation, types, tests, and relevant examples/docs pass.
