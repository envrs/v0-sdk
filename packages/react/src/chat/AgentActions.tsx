import type { V0UIMessage } from './messages'
import type { AgentAction } from './agent'
import { extractAgentActions } from './agent'

export function AgentActions({ message }: { message: V0UIMessage }) {
  const actions = extractAgentActions(message)
  if (actions.length === 0) return null

  return (
    <div className="agent-actions">
      {actions.map((action, index) => (
        <AgentActionCard key={index} action={action} />
      ))}
    </div>
  )
}

function AgentActionCard({ action }: { action: AgentAction }) {
  switch (action.type) {
    case 'web-search':
      return (
        <div className="agent-action web-search">
          <h4>
            <span className="icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            Web Search
          </h4>
          <p className="query">{action.title}</p>
          {action.content && <div className="content">{action.content}</div>}
        </div>
      )

    case 'browser':
      return (
        <div className="agent-action browser">
          <h4>
            <span className="icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </span>
            Browser
          </h4>
          <a href={action.url} target="_blank" rel="noopener noreferrer" className="url">
            {action.url}
          </a>
        </div>
      )

    case 'terminal':
      return (
        <div className="agent-action terminal">
          <h4>
            <span className="icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </span>
            Terminal
          </h4>
          <code className="command">{action.command}</code>
          {action.output && <pre className="output">{action.output}</pre>}
        </div>
      )

    case 'tool-call':
      return (
        <div className="agent-action tool-call">
          <h4>
            <span className="icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </span>
            {action.name}
          </h4>
          {action.input != null && (
            <pre className="input">{JSON.stringify(action.input as Record<string, unknown>, null, 2)}</pre>
          )}
          {action.output != null && (
            <pre className="output">{JSON.stringify(action.output as Record<string, unknown>, null, 2)}</pre>
          )}
        </div>
      )

    case 'question':
      return (
        <div className="agent-action question">
          <h4>
            <span className="icon">?</span>
            Questions
          </h4>
          <ul>
            {action.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )

    case 'plan':
      return (
        <div className="agent-action plan">
          <h4>
            <span className="icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </span>
            Plan
          </h4>
          <ol>
            {action.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )

    case 'integration':
      return (
        <div className="agent-action integration">
          <h4>
            <span className="icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </span>
            Integrations
          </h4>
          <ul>
            {action.integrations.map((integration, i) => (
              <li key={i}>{integration}</li>
            ))}
          </ul>
        </div>
      )

    case 'error':
      return (
        <div className="agent-action error">
          <h4>
            <span className="icon">!</span>
            Error
          </h4>
          <p>{action.message}</p>
        </div>
      )

    case 'info':
      return (
        <div className="agent-action info">
          <h4>
            <span className="icon">i</span>
            Info
          </h4>
          <p>{action.message}</p>
        </div>
      )

    default:
      return null
  }
}
