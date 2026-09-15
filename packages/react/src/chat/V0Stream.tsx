'use client'

import type { ReactNode } from 'react'
import type { V0UIMessage } from './messages'

export interface V0StreamProps {
  message: V0UIMessage
  renderFile?: (part: Extract<V0UIMessage['parts'][number], { type: 'file' }>) => ReactNode
  renderData?: (part: { type: string; data: unknown }) => ReactNode
  showReasoning?: boolean
  /** Render a fallback when a file part has no safe, usable URL. */
  renderInvalidFile?: (part: Extract<V0UIMessage['parts'][number], { type: 'file' }>) => ReactNode
}

/**
 * Presentation-only rendering for an AI SDK UI message.
 * Transport, stream parsing, and chat state remain owned by V0Transport/useChat.
 */
export function V0Stream({
  message,
  renderFile,
  renderData,
  renderInvalidFile,
  showReasoning = true,
}: V0StreamProps) {
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
        if (part.type === 'file') return renderFilePart(part, index, renderFile, renderInvalidFile)
        if (!('data' in part)) return null
        return renderData ? (
          <span key={`${message.id}:data:${index}`}>{renderData(part)}</span>
        ) : (
          <pre key={`${message.id}:data:${index}`}>{safeJson(part.data)}</pre>
        )
      })}
    </div>
  )
}

function renderFilePart(
  part: Extract<V0UIMessage['parts'][number], { type: 'file' }>,
  index: number,
  renderFile: V0StreamProps['renderFile'],
  renderInvalidFile: V0StreamProps['renderInvalidFile'],
) {
  const key = `${part.url || 'file'}:${index}`
  if (renderFile) return <span key={key}>{renderFile(part)}</span>
  if (!isSafeUrl(part.url)) {
    return (
      <span key={key} role="status">
        {renderInvalidFile ? renderInvalidFile(part) : 'File unavailable'}
      </span>
    )
  }

  const label = part.filename || 'Open attached file'
  if (part.mediaType?.startsWith('image/')) {
    return (
      <figure key={key}>
        <img alt={part.filename || 'Generated image'} src={part.url} />
        <a href={part.url} rel="noreferrer" target="_blank">
          {label}
        </a>
      </figure>
    )
  }
  return (
    <a href={part.url} key={key} rel="noreferrer" target="_blank">
      {label}
    </a>
  )
}

function isSafeUrl(value: string): boolean {
  try {
    const url = new URL(value, 'https://v0.invalid')
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2) ?? 'Unable to display this part.'
  } catch {
    return 'Unable to display this part.'
  }
}

export type { V0UIMessage }
