'use client'

import { useState, type ReactNode } from 'react'

import {
  getPendingV0Task,
  type V0PendingTask,
  type V0UIMessage,
} from '@v0-sdk/react'
import type { MessagesResolveStreamData } from 'v0'

export type ResolveTask = MessagesResolveStreamData['body']['task']

function Btn({
  disabled,
  onClick,
  variant = 'default',
  children,
}: {
  disabled?: boolean
  onClick: () => void | Promise<void>
  variant?: 'default' | 'outline' | 'ghost'
  children: React.ReactNode
}) {
  const variantClass =
    variant === 'outline'
      ? 'border border-border bg-white'
      : variant === 'ghost'
        ? 'bg-transparent'
        : 'border border-[#171717] bg-[#171717] text-white'
  return (
    <button
      className={`px-3 py-1.5 text-xs rounded-md ${variantClass}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

type QuestionsData = Extract<V0PendingTask, { type: 'questions' }>['data']
type PlanData = Extract<V0PendingTask, { type: 'plan' }>['data']
type IntegrationData = Extract<V0PendingTask, { type: 'integration' }>['data']
type Permission = Extract<V0PendingTask, { type: 'permissions' }>['permissions'][number]


const MCP_PRESETS = [
  'Linear',
  'Notion',
  'Context7',
  'Sentry',
  'Zapier',
  'Glean',
  'Hex',
  'Sanity',
  'Granola',
  'PostHog',
  'Contentful',
  'Slack',
] as const satisfies readonly string[]

export function TaskResolution({
  message,
  disabled = false,
  onResolve,
  onRejectPermission,
}: {
  message: V0UIMessage
  disabled?: boolean
  onResolve: (task: ResolveTask) => void | Promise<void>
  onRejectPermission: () => void | Promise<void>
}) {
  const task = getPendingV0Task(message)
  if (!task) return null

  switch (task.type) {
    case 'questions':
      return (
        <QuestionsTask data={task.data} disabled={disabled} onResolve={onResolve} />
      )
    case 'plan':
      return (
        <PlanTask data={task.data} disabled={disabled} onResolve={onResolve} />
      )
    case 'integration':
      return (
        <IntegrationTask
          data={task.data}
          disabled={disabled}
          onResolve={onResolve}
        />
      )
    case 'permissions':
      return (
        <PermissionsTask
          disabled={disabled}
          onReject={onRejectPermission}
          onResolve={onResolve}
          permissions={task.permissions}
        />
      )
  }
}

function QuestionsTask({
  data,
  disabled,
  onResolve,
}: {
  data: QuestionsData
  disabled: boolean
  onResolve: (task: ResolveTask) => void | Promise<void>
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [customText, setCustomText] = useState<Record<string, string>>({})
  const canSubmit =
    data.questions.length > 0 &&
    data.questions.every(
      (question) =>
        (selected[question.id]?.length ?? 0) > 0 || Boolean(customText[question.id]?.trim()),
    )

  const selectOption = (question: QuestionsData['questions'][number], label: string) => {
    setSelected((current) => {
      if (!question.multiSelect) {
        return { ...current, [question.id]: [label] }
      }

      const values = current[question.id] ?? []
      return {
        ...current,
        [question.id]: values.includes(label)
          ? values.filter((value) => value !== label)
          : [...values, label],
      }
    })
  }

  const submit = () =>
    onResolve({
      type: 'answered-questions',
      answers: data.questions.map((question) => ({
        questionId: question.id,
        questionText: question.question,
        selectedLabels: selected[question.id] ?? [],
        ...(customText[question.id]?.trim() ? { customText: customText[question.id].trim() } : {}),
      })),
    })

  return (
    <TaskCard description="Answer each question so v0 can continue." title="Questions">
      <div className="grid gap-4">
        {data.questions.map((question) => (
          <fieldset className="grid gap-2" disabled={disabled} key={question.id}>
            <legend className="font-medium">{question.header}</legend>
            <p className="text-muted-foreground">{question.question}</p>
            <div className="grid gap-1.5">
              {question.options.map((option) => {
                const checked = Boolean(selected[question.id]?.includes(option.label))

                return (
                  <label
                    className="flex cursor-pointer gap-2 rounded-md border border-border px-2.5 py-2 hover:bg-muted/50"
                    key={option.id}
                  >
                    <input
                      checked={checked}
                      className="mt-0.5"
                      name={question.id}
                      onChange={() => selectOption(question, option.label)}
                      type={question.multiSelect ? 'checkbox' : 'radio'}
                    />
                    <span className="min-w-0">
                      <span className="block font-medium">{option.label}</span>
                      {option.description ? (
                        <span className="block text-muted-foreground">{option.description}</span>
                      ) : null}
                    </span>
                  </label>
                )
              })}
            </div>
            <input
              className="min-h-8 text-xs rounded-md border border-border px-2.5 py-2"
              disabled={disabled}
              onChange={(event) =>
                setCustomText((current) => ({
                  ...current,
                  [question.id]: event.target.value,
                }))
              }
              placeholder="Other or additional context"
              value={customText[question.id] ?? ''}
            />
          </fieldset>
        ))}
        <Btn disabled={disabled || !canSubmit} onClick={submit}>
          Submit answers
        </Btn>
      </div>
    </TaskCard>
  )
}

function PlanTask({
  data,
  disabled,
  onResolve,
}: {
  data: PlanData
  disabled: boolean
  onResolve: (task: ResolveTask) => void | Promise<void>
}) {
  const [feedback, setFeedback] = useState('')
  const trimmedFeedback = feedback.trim()

  const respond = (status: Extract<ResolveTask, { type: 'plan-exit-response' }>['status']) =>
    onResolve({
      type: 'plan-exit-response',
      status,
      content:
        trimmedFeedback ||
        (status === 'approved' ? 'Proceed with this plan.' : 'Do not proceed with this plan.'),
    })

  return (
    <TaskCard description={data.summary ?? `Proposed changes for ${data.path}`} title="Review plan">
      <div className="max-h-72 overflow-y-auto rounded-md border border-border bg-background p-3">
        <pre>{data.plan}</pre>
      </div>
      <input
        className="min-h-8 w-full text-xs rounded-md border border-border px-2.5 py-2"
        disabled={disabled}
        onChange={(event) => setFeedback(event.target.value)}
        placeholder="Feedback or requested changes"
        value={feedback}
      />
      <div className="flex flex-wrap gap-2">
        <Btn disabled={disabled} onClick={() => respond('approved')}>
          Approve
        </Btn>
        <Btn disabled={disabled || !trimmedFeedback} onClick={() => respond('request-changes')} variant="outline">
          Request changes
        </Btn>
        <Btn disabled={disabled} onClick={() => respond('rejected')} variant="ghost">
          Reject
        </Btn>
      </div>
    </TaskCard>
  )
}

function IntegrationTask({
  data,
  disabled,
  onResolve,
}: {
  data: IntegrationData
  disabled: boolean
  onResolve: (task: ResolveTask) => void | Promise<void>
}) {
  const requested = [...(data.requestedIntegrations ?? []), ...(data.requestedMcpPresets ?? [])]

  const resolve = (connected: boolean) =>
    onResolve({
      type: 'confirmed-steps',
      connectedIntegrationNames: connected ? (data.requestedIntegrations ?? []) : [],
      connectedMcpPresetNames: connected
        ? (data.requestedMcpPresets ?? []).filter(isMcpPreset) as Array<'Linear' | 'Notion' | 'Context7' | 'Sentry' | 'Zapier' | 'Glean' | 'Hex' | 'Sanity' | 'Granola' | 'PostHog' | 'Contentful' | 'Slack'>
        : [],
      appliedScripts: [],
      addedEnvVars: [],
    })

  return (
    <TaskCard
      description="Connect the requested services outside this app, then confirm to continue."
      title="Connect services"
    >
      {requested.length > 0 ? (
        <ul className="list-disc space-y-1 pl-5">
          {requested.map((name, index) => (
            <li key={`${name}-${index}`}>{name}</li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <Btn disabled={disabled} onClick={() => resolve(true)}>
          I connected these
        </Btn>
        <Btn disabled={disabled} onClick={() => resolve(false)} variant="outline">
          Skip
        </Btn>
      </div>
    </TaskCard>
  )
}

function PermissionsTask({
  permissions,
  disabled,
  onResolve,
  onReject,
}: {
  permissions: Permission[]
  disabled: boolean
  onResolve: (task: ResolveTask) => void | Promise<void>
  onReject: () => void | Promise<void>
}) {
  const allow = () =>
    onResolve({
      type: 'confirmed-permissions',
      permissions: permissions.map((permission) => ({
        type: permission.type,
        toolName: permission.toolName,
        input: permission.input,
        taskNameActive: permission.taskNameActive,
        taskNameComplete: permission.taskNameComplete,
        userMessage: permission.userMessage,
      })),
    })

  return (
    <TaskCard
      description="Review the requested tool access before allowing it."
      title="Permission required"
    >
      <div className="grid gap-2">
        {permissions.map((permission, index) => (
          <div
            className="rounded-md border border-border bg-background p-2.5"
            key={`${permission.toolName}-${index}`}
          >
            <p className="font-medium">{permission.toolName}</p>
            {permission.userMessage ? (
              <p className="mt-1 text-muted-foreground">{permission.userMessage}</p>
            ) : null}
            {permission.input !== undefined ? (
              <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap text-[11px] text-muted-foreground">
                {JSON.stringify(permission.input, null, 2)}
              </pre>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Btn disabled={disabled} onClick={allow}>
          Allow
        </Btn>
        <Btn disabled={disabled} onClick={onReject} variant="outline">
          Deny
        </Btn>
      </div>
    </TaskCard>
  )
}

function TaskCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-3 rounded-lg border border-border bg-muted/30 p-3 text-xs">
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}

function isMcpPreset(value: string): value is string {
  return (MCP_PRESETS as readonly string[]).includes(value)
}
