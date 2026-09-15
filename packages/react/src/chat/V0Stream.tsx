'use client'

import type { ReactNode } from 'react'
import type { V0UIMessage } from './messages'

export interface V0StreamProps {
  message: V0UIMessage
  renderFile?: (part: Extract<V0UIMessage['parts'][number], { type: 'file' }>) => ReactNode
  renderData?: (part: { type: string; data: unknown }) => ReactNode
  showReasoning?: boolean
}

/** Renders the incremental text and data parts of a v0 UI message. */
export function V0Stream({ message, renderFile, renderData, showReasoning = true }: V0StreamProps) {
  return (
    <div aria-label={`${message.role} message`} className="v0-stream">
      {message.parts.map((part, index) => {
        if (part.type === 'text') return <p key={`${message.id}:text:${index}`}>{part.text}</p>
        if (part.type === 'reasoning') {
          if (!showReasoning) return null
          return (
            <details key={`${message.id}:reasoning:${index}`}>
              <summary>Reasoning</summary>
              <p>{part.text}</p>
            </details>
          )
        }
        if (part.type === 'file') {
          return renderFile ? (
            <span key={`${message.id}:file:${index}`}>{renderFile(part)}</span>
          ) : (
            <a href={part.url} key={`${message.id}:file:${index}`} rel="noreferrer" target="_blank">
              {part.filename ?? part.url}
            </a>
          )
        }
        if (!('data' in part)) return null
        return renderData ? (
          <span key={`${message.id}:data:${index}`}>{renderData(part)}</span>
        ) : (
          <pre key={`${message.id}:data:${index}`}>{JSON.stringify(part.data, null, 2)}</pre>
        )
      })}
    </div>
  )
}

export type { V0UIMessage }
