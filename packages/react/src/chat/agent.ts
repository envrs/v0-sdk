import type { V0UIMessage } from './messages'
import type { V0PendingTask } from './tasks'

export type AgentAction =
  | { type: 'web-search'; title: string; content?: string }
  | { type: 'browser'; url: string; screenshot?: string }
  | { type: 'terminal'; command: string; output?: string; status?: 'running' | 'completed' | 'error' }
  | { type: 'tool-call'; name: string; input?: unknown; output?: unknown }
  | { type: 'question'; questions: string[] }
  | { type: 'plan'; steps: string[] }
  | { type: 'integration'; integrations: string[] }
  | { type: 'error'; message: string }
  | { type: 'info'; message: string }

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString)
}

export function extractAgentActions(message: V0UIMessage): AgentAction[] {
  const actions: AgentAction[] = []

  for (const part of message.parts) {
    if (part.type !== 'data-v0-agent-action') continue
    const partData = part.data as { data?: Record<string, unknown> } | undefined
    const data = partData?.data
    if (!data) continue

    const name = isString(data['name']) ? data['name'] : ''

    switch (name) {
      case 'search':
      case 'web_search': {
        actions.push({
          type: 'web-search',
          title: isString(data['query']) ? data['query'] : 'Web search',
          content: isString(data['results']) ? data['results'] : undefined,
        })
        break
      }

      case 'visit_page':
      case 'browser_use': {
        actions.push({
          type: 'browser',
          url: isString(data['url']) ? data['url'] : 'unknown',
          screenshot: isString(data['screenshot']) ? data['screenshot'] : undefined,
        })
        break
      }

      case 'run_command':
      case 'terminal': {
        actions.push({
          type: 'terminal',
          command: isString(data['command']) ? data['command'] : 'unknown',
          output: isString(data['output']) ? data['output'] : undefined,
          status: 'completed',
        })
        break
      }

      case 'ask_user_questions': {
        if (isStringArray(data['questions'])) {
          actions.push({ type: 'question', questions: data['questions'] })
        }
        break
      }

      case 'exit_plan_mode': {
        if (isStringArray(data['plan'])) {
          actions.push({ type: 'plan', steps: data['plan'] })
        }
        break
      }

      case 'get_or_request_integration': {
        const integrations = data['requestedIntegrations']
        if (integrations) {
          const list = isStringArray(integrations) ? integrations : [String(integrations)]
          actions.push({ type: 'integration', integrations: list })
        }
        break
      }

      case 'error': {
        actions.push({ type: 'error', message: isString(data['message']) ? data['message'] : 'Unknown error' })
        break
      }

      default: {
        actions.push({ type: 'info', message: `${name}: ${JSON.stringify(data).slice(0, 200)}` })
      }
    }
  }

  return actions
}

export function extractToolCalls(message: V0UIMessage): Array<{ name: string; input?: unknown; output?: unknown }> {
  const calls: Array<{ name: string; input?: unknown; output?: unknown }> = []

  for (const part of message.parts) {
    if (part.type !== 'data-v0-tool-call') continue
    const toolData = part.data as { name?: string; input?: unknown; output?: unknown }
    calls.push({
      name: toolData.name ?? 'unknown',
      input: toolData.input,
      output: toolData.output,
    })
  }

  return calls
}

export function extractPendingTask(message: V0UIMessage): V0PendingTask | null {
  for (let i = message.parts.length - 1; i >= 0; i--) {
    const part = message.parts[i]
    if (!part) continue
    if (part.type === 'data-v0-tool-call') {
      const toolCall = part as {
        data: { suggestedPermissions?: Array<{ action: string; description?: string }> }
      }
      if (toolCall.data?.suggestedPermissions?.length) {
        const permissions = toolCall.data.suggestedPermissions.map((p) => ({
          action: p.action,
          description: p.description,
        }))
        return { type: 'permissions', permissions: permissions as never }
      }
    }
    if (part.type === 'data-v0-agent-action') {
      const action = part as { data: { data?: { name?: string; [key: string]: unknown } } }
      const data = action.data?.data
      if (!data || !data.name) continue

      if (data.name === 'ask_user_questions' && 'questions' in data) {
        return { type: 'questions', data: data as never }
      }

      if (data.name === 'exit_plan_mode' && 'plan' in data) {
        return { type: 'plan', data: data as never }
      }

      if (data.name === 'get_or_request_integration' && 'requestedIntegrations' in data) {
        return { type: 'integration', data: data as never }
      }
    }
  }

  return null
}
