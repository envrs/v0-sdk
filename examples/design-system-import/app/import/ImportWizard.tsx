'use client'

import { useState } from 'react'

export type SourceType = 'github-repo' | 'figma' | 'link' | 'attachment'

export type Source = {
  id: string
  type: SourceType
  url: string
  label: string
}

export type EnvVar = {
  id: string
  name: string
  value: string
}

export type ImportForm = {
  sources: Source[]
  envVars: EnvVar[]
  notes: string
}

export function ImportWizard() {
  const [sources, setSources] = useState<Source[]>([
    { id: '1', type: 'github-repo', url: '', label: 'Design system repo' },
  ])
  const [envVars, setEnvVars] = useState<EnvVar[]>([])
  const [notes, setNotes] = useState('')
  const [isImporting, setIsImporting] = useState(false)

  const addSource = () => {
    const id = String(Date.now())
    setSources((prev) => [
      ...prev,
      { id, type: 'github-repo', url: '', label: '' },
    ])
  }

  const updateSource = (id: string, updates: Partial<Source>) => {
    setSources((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const removeSource = (id: string) => {
    setSources((prev) => prev.filter((s) => s.id !== id))
  }

  const addEnvVar = () => {
    const id = String(Date.now())
    setEnvVars((prev) => [...prev, { id, name: '', value: '' }])
  }

  const updateEnvVar = (id: string, updates: Partial<EnvVar>) => {
    setEnvVars((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    )
  }

  const removeEnvVar = (id: string) => {
    setEnvVars((prev) => prev.filter((v) => v.id !== id))
  }

  const handleImport = async () => {
    setIsImporting(true)
    try {
      const response = await fetch('/api/design-systems/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sources, envVars, notes }),
      })
      const data = await response.json()
      console.log('Import started:', data)
    } finally {
      setIsImporting(false)
    }
  }

  const isValid = sources.some((s) => s.url.trim())

  return (
    <div className="wizard">
      <section className="card">
        <h2>1. Add your sources</h2>
        <p className="description">
          Point v0 at the sources that define your design system.
        </p>

        {sources.map((source) => (
          <div className="source-row" key={source.id}>
            <select
              value={source.type}
              onChange={(e) =>
                updateSource(source.id, { type: e.target.value as SourceType })
              }
            >
              <option value="github-repo">GitHub Repository</option>
              <option value="figma">Figma</option>
              <option value="link">Link</option>
              <option value="attachment">Attachment</option>
            </select>
            <input
              type="text"
              placeholder={`${source.type === 'github-repo' ? 'Owner/repo' : 'URL or path'}`}
              value={source.url}
              onChange={(e) => updateSource(source.id, { url: e.target.value })}
            />
            <input
              type="text"
              placeholder="Label (optional)"
              value={source.label}
              onChange={(e) => updateSource(source.id, { label: e.target.value })}
            />
            <button
              className="remove"
              onClick={() => removeSource(source.id)}
              type="button"
            >
              ×
            </button>
          </div>
        ))}

        <button className="add-button" onClick={addSource} type="button">
          + Add source
        </button>
      </section>

      <section className="card">
        <h2>2. Environment variables</h2>
        <p className="description">
          Add credentials for private packages (e.g., NPM_TOKEN).
        </p>

        {envVars.map((envVar) => (
          <div className="env-row" key={envVar.id}>
            <input
              type="text"
              placeholder="Name (e.g., NPM_TOKEN)"
              value={envVar.name}
              onChange={(e) =>
                updateEnvVar(envVar.id, { name: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Value"
              value={envVar.value}
              onChange={(e) =>
                updateEnvVar(envVar.id, { value: e.target.value })
              }
            />
            <button
              className="remove"
              onClick={() => removeEnvVar(envVar.id)}
              type="button"
            >
              ×
            </button>
          </div>
        ))}

        <button className="add-button" onClick={addEnvVar} type="button">
          + Add environment variable
        </button>
      </section>

      <section className="card">
        <h2>3. Notes</h2>
        <p className="description">
          Optional notes about global styles, deprecated components, or conventions.
        </p>
        <textarea
          placeholder="Global styles, providers, fonts, deprecated components, conventions..."
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </section>

      <div className="actions">
        <button
          className="import-button"
          disabled={!isValid || isImporting}
          onClick={handleImport}
          type="button"
        >
          {isImporting ? 'Importing…' : 'Start Import'}
        </button>
      </div>
    </div>
  )
}
