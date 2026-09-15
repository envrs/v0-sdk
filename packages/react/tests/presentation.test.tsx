import { describe, expect, test } from 'bun:test'
import { create } from 'react-test-renderer'

import { V0Stream, type V0UIMessage } from '../src'

function message(parts: V0UIMessage['parts']): V0UIMessage {
  return { id: 'message_1', role: 'assistant', parts }
}

describe('V0Stream', () => {
  test('renders text and reasoning without owning transport state', () => {
    const tree = create(
      <V0Stream
        message={message([
          { type: 'text', text: 'Hello', state: 'done' },
          { type: 'reasoning', text: 'Thinking', state: 'done' },
        ])}
      />,
    )

    expect(tree.root.findByType('p').children).toEqual(['Hello'])
    expect(tree.root.findByType('summary').children).toEqual(['Reasoning'])
  })

  test('renders safe image files and accessible fallback for unsafe files', () => {
    const tree = create(
      <V0Stream
        message={message([
          { type: 'file', url: 'https://example.com/image.png', mediaType: 'image/png' },
          { type: 'file', url: 'javascript:alert(1)', mediaType: 'text/plain' },
        ])}
      />,
    )

    expect(tree.root.findByType('img').props['alt']).toBe('Generated image')
    expect(tree.root.findAllByProps({ role: 'status' })[0]?.children).toEqual(['File unavailable'])
  })

  test('allows host applications to render malformed data safely', () => {
    const tree = create(
      <V0Stream
        message={message([{ type: 'data-v0-agent-action', data: undefined } as never])}
        renderData={() => <span>Unsupported part</span>}
      />,
    )

    expect(tree.root.findByType('span').children).toEqual(['Unsupported part'])
  })
})
