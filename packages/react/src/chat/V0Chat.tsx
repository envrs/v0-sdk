'use client'

import { useChat as useAIChat } from '@ai-sdk/react'
import type { ChatStatus } from 'ai'
import { useMemo, useState, type ReactNode } from 'react'
import { V0Stream } from './V0Stream'
import { shouldResumeV0Chat } from './composition'
import { getPendingV0Task, type V0PendingTask } from './tasks'
import type { V0UIMessage } from './messages'
import { V0Transport, type V0TransportOptions } from './transport'

export interface V0ChatProps {
  transport: V0Transport | V0TransportOptions
  initialMessages?: V0UIMessage[]
  onChatCreated?: V0TransportOptions['onChatCreated']
  renderMessage?: (message: V0UIMessage) => ReactNode
  renderPendingTask?: (task: V0PendingTask, message: V0UIMessage) => ReactNode
  renderStatus?: (status: ChatStatus) => ReactNode
  renderError?: (error: Error) => ReactNode
  placeholder?: string
  disabled?: boolean
  className?: string
}

/** A composable chat UI backed by the v0 AI SDK transport. */
export function V0Chat({
  transport: transportOption,
  initialMessages = [],
  onChatCreated,
  renderMessage,
  renderPendingTask,
  renderStatus,
  renderError,
  placeholder = 'Ask v0 to build anything...',
  disabled = false,
  className,
}: V0ChatProps) {
  const transport = useMemo(
    () =>
      transportOption instanceof V0Transport
        ? transportOption
        : new V0Transport({ ...transportOption, onChatCreated }),
    [transportOption, onChatCreated],
  )
  const [input, setInput] = useState('')
  const chat = useAIChat<V0UIMessage>({
    id: transport.chatId,
    messages: initialMessages,
    resume: shouldResumeV0Chat([]),
    transport,
  })
  const busy = disabled || chat.status === 'submitted' || chat.status === 'streaming'

  return (
    <section className={className}>
      <div aria-live="polite">
        {chat.messages.map((message) => {
          const pendingTask = getPendingV0Task(message)
          return (
            <div key={message.id}>
              {renderMessage ? renderMessage(message) : <V0Stream message={message} />}
              {pendingTask && renderPendingTask ? renderPendingTask(pendingTask, message) : null}
            </div>
          )
        })}
      </div>
      {chat.error ? (
        renderError ? (
          renderError(chat.error)
        ) : (
          <p role="alert">{chat.error.message}</p>
        )
      ) : null}
      {renderStatus ? renderStatus(chat.status) : <output aria-live="polite">{chat.status}</output>}
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const text = input.trim()
          if (!text || busy) return
          setInput('')
          void chat.sendMessage({ text })
        }}
      >
        <textarea
          aria-label="Message"
          disabled={disabled}
          onChange={(event) => setInput(event.target.value)}
          placeholder={placeholder}
          value={input}
        />
        <button disabled={!input.trim() || busy} type="submit">
          Send
        </button>
        <button disabled={!busy || disabled} onClick={() => void chat.stop()} type="button">
          Stop
        </button>
      </form>
    </section>
  )
}
