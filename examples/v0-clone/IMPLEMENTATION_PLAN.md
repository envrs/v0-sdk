# v0-clone: Import & prompting feature plan

Source docs: https://v0.app/docs/text-prompting, /docs/screenshots, /docs/figma, /docs/paper

Status: Phases 0-3 complete; Phase 4 (Paper) out of scope.

## Current state

- `apps/web/components/ai-elements/prompt-input.tsx` ships attachments
  (blob URLs, per-form + global drag-drop, paste), a voice mic button
  (`PromptInputSpeechButton`, Web Speech API), the plus action menu, and
  blob->data-URL conversion on submit.
- SDK `V0Transport` (`packages/react/src/chat/transport.ts`) maps
  `file` message parts to `attachments: [{ url }]` and merges
  inline `{ name, content }` attachments from `options.body.attachments`.
- v0 API supports URL/data-URI attachments and inline `{ name, content }`
  text attachments, plus `messages.sendAsync` for background queueing.
- `PromptBox` renders attachments chips and a working plus menu;
  `submitMessage(text, files)` forwards to `sendMessage({ text, files })`;
  API routes forward `attachments`.
- `usePromptQueue` hook wired into `chat-conversation.tsx` (enqueue when busy,
  dequeue on idle; queue drawer above PromptBox).

## Phases

### Phase 0 - Screenshots & files plumbing ✅
1. `chat-conversation.tsx`: `submitMessage(text, files)` -> `sendMessage({ text, files })`.
2. `prompt-box.tsx`: render `PromptInputAttachments` chips; wire
   `PromptInputActionAddAttachments` into the plus menu.
3. Routes `app/api/chats/route.ts` and `app/api/chats/[chatId]/messages/route.ts`:
   forward `attachments`.

### Phase 1 - Voice input ✅
4. `prompt-box.tsx`: add `PromptInputSpeechButton` (mic -> checkmark ->
   transcript appended to the textarea).

### Phase 2 - Prompt queuing ✅
5. `usePromptQueue` hook (max 10): queue items `{ id, text, files }`, reorder/
   edit/remove; dequeue on idle after `onFinish`. Queue drawer above `PromptBox`.

### Phase 3 - Figma import ✅
6. Env: `FIGMA_CLIENT_ID`, `FIGMA_CLIENT_SECRET`, `FIGMA_REDIRECT_URI`.
7. `/api/integrations/figma/connect` + `/oauth/callback` (token in
   signed/httpOnly cookie).
8. `/api/integrations/figma/import`: `GET /v1/files/:key` -> pages/frames list;
   `GET /v1/images/:key?ids=&format=png` -> export frames as image data URIs.
   Surface Figma rate-limit errors.
9. UI: "+ -> Import from... -> Figma" option in the plus action menu.

### Phase 4 - Paper import 🔒 out of scope
10. Requires Paper's first-party MCP/WebMCP (`mcp.paper.design`) which needs
    partnership/origin-trial access — skipped per user request.

### Cross-cutting ✅
- Extend `V0Transport` to also attach inline `{ name, content }` text parts.
- Add new env vars to `.env.example` and `apps/*/turbo.json`.
- Tests: extend `packages/react/tests/transport.test.ts`; `bun run lint`,
  `bun typecheck`, `bun test` all green.