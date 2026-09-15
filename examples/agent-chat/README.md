# Agent Chat

Enhanced chat example showcasing v0 agent capabilities:

- Web search results rendering
- Browser use (URL visits, screenshots)
- Terminal command execution
- Tool calls
- Permission requests
- Plan mode visualization
- Integration requests

## Run

```bash
bun install
bun dev
```

The example keeps v0 credentials on the server in its `/api/v0` proxy routes. The browser uses `V0Transport` with the AI SDK `useChat` hook, renders agent actions through `@v0-sdk/react`, and resolves the typed `questions`, `plan`, `integration`, and `permissions` task states through the existing resolve route. The reusable package components are presentation-only; application routes remain owned by this example.
