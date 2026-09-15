'use client'

import { useChat as useAIChat } from '@ai-sdk/react'
import {
  AgentActions,
  shouldResumeV0Chat,
  toV0UIMessages,
  V0Transport,
  extractAgentActions,
  getPendingV0Task,
  type MessagesListResponse,
  type V0UIMessage,
} from '@v0-sdk/react'
import { TaskResolution } from './components/chat/TaskResolution'
import { useMessages, useStopMessage } from '@v0-sdk/react/swr'
import { useEffect, useMemo, useRef, useState } from 'react'

export function ChatPage({ chatId }: { chatId?: string }) {
  const history = useMessages(chatId ? `/api/v0/chats/${chatId}/messages` : null, {
    limit: 50,
  })

  if (chatId && history.isLoading) return <main className="shell">Loading chat…</main>
  if (history.error) return <main className="shell error">Unable to load this chat.</main>

  return (
    <ChatRuntime
      key={chatId ?? 'new'}
      initialChatId={chatId}
      history={history.data?.messages ?? []}
    />
  )
}

function ChatRuntime({
  initialChatId,
  history,
}: {
  initialChatId?: string
  history: MessagesListResponse['messages']
}) {
  const [input, setInput] = useState('')
  const [createdChatId, setCreatedChatId] = useState<string>()
  const navigated = useRef(false)
  const transport = useMemo(
    () =>
      new V0Transport({
        chatId: initialChatId,
        messages: history,
        urls: {
          create: '/api/v0/chats/stream',
          send: (id) => `/api/v0/chats/${id}/messages/stream`,
          resume: (id) => `/api/v0/chats/${id}/resume`,
        },
        onChatCreated: setCreatedChatId,
      }),
    [history, initialChatId],
  )
  const chat = useAIChat<V0UIMessage>({
    id: initialChatId,
    messages: toV0UIMessages(history),
    resume: shouldResumeV0Chat(history),
    transport,
  })

  useEffect(() => {
    if (!initialChatId && createdChatId && !navigated.current) {
      navigated.current = true
      window.history.pushState(null, '', `/chat/${createdChatId}`)
    }
  }, [createdChatId, initialChatId])

  const latestAssistant = [...chat.messages]
    .reverse()
    .find((message) => message.role === 'assistant')
  const activeAssistant = chat.status === 'streaming' ? latestAssistant : undefined
  const activeChatId = activeAssistant?.metadata?.chatId ?? createdChatId ?? transport.chatId
  const stopServer = useStopMessage(
    activeChatId && activeAssistant
      ? `/api/v0/chats/${activeChatId}/messages/${activeAssistant.id}/stop`
      : '/api/v0/disabled',
  )
  const generating = chat.status === 'submitted' || chat.status === 'streaming'

  const handleResolve = async (task: unknown) => {
    if (!activeChatId || !activeAssistant) return
    await fetch(`/api/v0/chats/${activeChatId}/messages/${activeAssistant.id}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    })
  }

  const handleRejectPermission = async () => {
    if (!activeChatId || !activeAssistant) return
    await fetch(`/api/v0/chats/${activeChatId}/messages/${activeAssistant.id}/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: { type: 'confirmed-permissions', permissions: [] } }),
    })
  }

  return (
    <main className="shell">
      <header>
        <div>
          <p className="eyebrow">@v0-sdk/react + AI SDK</p>
          <h1>v0 agent chat</h1>
        </div>
        {initialChatId ? <a href="/">New chat</a> : null}
      </header>

      <section className="messages" aria-live="polite">
        {chat.messages.length === 0 ? (
          <p className="empty">Ask v0 to build or change an application.</p>
        ) : (
          chat.messages.map((message) => {
            const hasAgentActions = extractAgentActions(message).length > 0
            const task = getPendingV0Task(message)
            return (
              <article className={`message ${message.role}`} key={message.id}>
                <strong>{message.role}</strong>
                {hasAgentActions ? (
                  <>
                    {message.parts
                      .filter(
                        (part): part is Extract<V0UIMessage['parts'][number], { type: 'text' | 'reasoning' }> =>
                          part.type === 'text' || part.type === 'reasoning',
                      )
                      .map((part, index) => (
                        <MessagePart key={`${message.id}:${index}`} part={part} />
                      ))}
                    <AgentActions message={message} />
                  </>
                ) : (
                  message.parts.map((part, index) => (
                    <MessagePart key={`${message.id}:${index}`} part={part} />
                  ))
                )}
                {task && !generating && (
                  <TaskResolution
                    message={message}
                    onResolve={handleResolve}
                    onRejectPermission={handleRejectPermission}
                  />
                )}

              </article>
            )
          })
        )}
      </section>

      {chat.error ? <p className="error">{chat.error.message}</p> : null}

      <form
        onSubmit={(event) => {
          event.preventDefault()
          const text = input.trim()
          if (!text || generating) return
          setInput('')
          void chat.sendMessage({ text })
        }}
      >
        <textarea
          aria-label="Message"
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask v0 to build anything..."
          rows={3}
          value={input}
        />
        <div className="actions">
          <button disabled={!input.trim() || generating} type="submit">
            Send
          </button>
          <button
            disabled={!generating || !activeChatId || !activeAssistant || stopServer.isMutating}
            onClick={() => {
              void (async () => {
                try {
                  await stopServer.trigger()
                } finally {
                  await chat.stop()
                }
              })()
            }}
            type="button"
          >
            Stop
          </button>
          <span>{chat.status}</span>
        </div>
      </form>
    </main>
  )
}

function MessagePart({ part }: { part: V0UIMessage['parts'][number] }) {
  switch (part.type) {
    case 'text':
      return <div className="text">{part.text}</div>
    case 'reasoning':
      return (
        <details>
          <summary>Reasoning</summary>
          <div className="text">{part.text}</div>
        </details>
      )
    case 'file':
      return <a href={part.url}>{part.filename ?? part.url}</a>
    default:
      return <pre>{JSON.stringify((part as { data?: unknown }).data, null, 2)}</pre>
  }
}
