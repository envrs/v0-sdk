# v0-clone: Import & prompting feature plan

Source docs: https://v0.app/docs/text-prompting, /docs/screenshots, /docs/figma, /docs/paper

Status: Phase 0 complete; Phases 1-4 pending.

## Current state

- `apps/web/components/ai-elements/prompt-input.tsx` already ships attachments
  (blob URLs, per-form + global drag-drop, paste), a voice mic button
  (`PromptInputSpeechButton`, Web Speech API), the plus action menu, and
  blob->data-URL conversion on submit.
- SDK `V0Transport` (`packages/react/src/chat/transport.ts`) already maps
  `file` message parts to `attachments: [{ url }]` on send/create.
- v0 API supports URL/data-URI attachments and inline `{ name, content }` text
  attachments, plus `messages.sendAsync` for background queueing.
- Missing: `PromptBox` never renders attachments or a working plus menu,
  `submitMessage` drops files, and the API routes strip `attachments`.

## Phases

### Phase 0 - Screenshots & files plumbing
1. `chat-conversation.tsx`: `submitMessage(text, files)` -> `sendMessage({ text, files })`.
2. `prompt-box.tsx`: render `PromptInputAttachments` chips; wire
   `PromptInputActionAddAttachments` into the plus menu.
3. Routes `app/api/chats/route.ts` and `app/api/chats/[chatId]/messages/route.ts`:
   forward `attachments`.

### Phase 1 - Voice input
4. `prompt-box.tsx`: add `PromptInputSpeechButton` (mic -> checkmark ->
   transcript appended to the textarea). Gate on the app's sign-in/auth seam.

### Phase 2 - Prompt queuing
5. `usePromptQueue` hook (max 10): queue items `{ id, text, files }`, reorder/
   edit/remove; dequeue on idle after `onFinish`. Queue drawer above `PromptBox`.
   Optional follow-up: server-side queue via `messages.sendAsync` + poll
   `finishReason`.

### Phase 3 - Figma import
6. Env: `FIGMA_CLIENT_ID`, `FIGMA_CLIENT_SECRET`, `FIGMA_REDIRECT_URI`.
7. `/api/integrations/figma/connect` + `/oauth/callback` (refresh token in
   signed/partitioned cookie).
8. `/api/integrations/figma/import`: `GET /v1/files/:key` -> pages/frames list;
   `GET /v1/images/:key?ids=&format=png` -> export frames as image data URIs.
   Surface Figma rate-limit errors.
9. UI: "+ -> Import from... -> Figma" -> connect + link input -> frame picker ->
   attach frames as `FileUIPart[]` + prompt text -> `sendMessage({ text, files })`.
   Detect pasted `figma.com/file|design` links.

### Phase 4 - Paper import
10. Detect `app.paper.design/file/<id>` links (paste or "+ -> Import from... ->
    Paper").
11. Read via Paper's first-party MCP (`mcp.paper.design`) or the WebMCP
    embedded iframe (`document.modelContext`, e.g. `get_basic_info`,
    `list_nodes`, `export` PNG). The no-account path requires Paper partnership /
    origin-trial grant for the origin; until then fall back to sending the link
    as text.

### Cross-cutting
- Extend `V0Transport` to also attach inline `{ name, content }` text parts.
- Add new env vars to `.env.example` and `apps/*/turbo.json`.
- Tests: extend `packages/react/tests/messages.test.ts`; run `bun run lint`,
  `bun typecheck`, `bun test`.