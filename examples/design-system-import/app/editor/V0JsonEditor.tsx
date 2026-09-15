'use client'

import { useState } from 'react'

export type V0Json = {
  version: 1
  referenceWorkspace: {
    sources: Array<{
      id: string
      type: string
      repo?: { org: string; name: string }
      ref: string
      mountPath: string
    }>
  }
  environment: {
    providers: Array<{ type: string; ids: string[] }>
  }
  starter: {
    source: string
    path: string
  }
}

const DEFAULT_V0_JSON: V0Json = {
  version: 1,
  referenceWorkspace: {
    sources: [
      {
        id: 'github-repo:owner/repo:main',
        type: 'github-repo',
        repo: { org: 'owner', name: 'repo' },
        ref: 'main',
        mountPath: '/vercel/share/v0-reference-workspace-sources/owner/repo/main',
      },
    ],
  },
  environment: {
    providers: [{ type: 'shared-env-vars', ids: ['env_var_id'] }],
  },
  starter: {
    source: 'skill-directory',
    path: 'assets/starter',
  },
}

export function V0JsonEditor() {
  const [v0Json, setV0Json] = useState<V0Json>(DEFAULT_V0_JSON)
  const [copied, setCopied] = useState(false)

  const jsonString = JSON.stringify(v0Json, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateSource = (index: number, updates: Partial<V0Json['referenceWorkspace']['sources'][number]>) => {
    setV0Json((prev) => {
      const sources = prev.referenceWorkspace.sources.map((s, i) =>
        i === index ? { ...s, ...updates } : s,
      )
      return { ...prev, referenceWorkspace: { ...prev.referenceWorkspace, sources } }
    })
  }

  const addSource = () => {
    setV0Json((prev) => ({
      ...prev,
      referenceWorkspace: {
        ...prev.referenceWorkspace,
        sources: [
          ...prev.referenceWorkspace.sources,
          {
            id: 'github-repo:new/new:main',
            type: 'github-repo',
            repo: { org: 'new', name: 'new' },
            ref: 'main',
            mountPath: '/vercel/share/v0-reference-workspace-sources/new/new/main',
          },
        ],
      },
    }))
  }

  const removeSource = (index: number) => {
    setV0Json((prev) => ({
      ...prev,
      referenceWorkspace: {
        ...prev.referenceWorkspace,
        sources: prev.referenceWorkspace.sources.filter((_, i) => i !== index),
      },
    }))
  }

  const updateProvider = (index: number, ids: string[]) => {
    setV0Json((prev) => {
      const providers = prev.environment.providers.map((p, i) =>
        i === index ? { ...p, ids } : p,
      )
      return { ...prev, environment: { ...prev.environment, providers } }
    })
  }

  const addProvider = () => {
    setV0Json((prev) => ({
      ...prev,
      environment: {
        ...prev.environment,
        providers: [...prev.environment.providers, { type: 'shared-env-vars', ids: [] }],
      },
    }))
  }

  return (
    <div className="editor">
      <section className="card">
        <h2>v0.json Preview</h2>
        <p className="description">
          v0.json is the source of truth for your design system skill. Edit the fields below to preview the generated JSON.
        </p>

        <div className="editor-grid">
          <div className="editor-field">
            <label>Starter Source</label>
            <select
              value={v0Json.starter.source}
              onChange={(e) =>
                setV0Json((prev) => ({
                  ...prev,
                  starter: { ...prev.starter, source: e.target.value },
                }))
              }
            >
              <option value="skill-directory">skill-directory</option>
              <option value="empty">empty</option>
              <option value="v0-default">v0-default</option>
            </select>
          </div>

          <div className="editor-field">
            <label>Starter Path</label>
            <input
              type="text"
              value={v0Json.starter.path}
              onChange={(e) =>
                setV0Json((prev) => ({
                  ...prev,
                  starter: { ...prev.starter, path: e.target.value },
                }))
              }
            />
          </div>
        </div>
      </section>

      <section className="card">
        <h3>Reference Sources ({v0Json.referenceWorkspace.sources.length}/3 max)</h3>
        {v0Json.referenceWorkspace.sources.map((source, index) => (
          <div className="source-editor" key={index}>
            <div className="editor-row">
              <input
                type="text"
                placeholder="org"
                value={source.repo?.org ?? ''}
                onChange={(e) =>
                  updateSource(index, {
                    repo: { org: e.target.value, name: source.repo?.name ?? '' },
                  })
                }
              />
              <span>/</span>
              <input
                type="text"
                placeholder="repo"
                value={source.repo?.name ?? ''}
                onChange={(e) =>
                  updateSource(index, {
                    repo: { org: source.repo?.org ?? '', name: e.target.value },
                  })
                }
              />
              <button
                className="remove"
                onClick={() => removeSource(index)}
                type="button"
              >
                ×
              </button>
            </div>
            <div className="editor-row">
              <label>Ref:</label>
              <input
                type="text"
                placeholder="main"
                value={source.ref}
                onChange={(e) => updateSource(index, { ref: e.target.value })}
              />
            </div>
          </div>
        ))}
        <button
          className="add-button"
          onClick={addSource}
          disabled={v0Json.referenceWorkspace.sources.length >= 3}
          type="button"
        >
          + Add source
        </button>
      </section>

      <section className="card">
        <h3>Environment Providers</h3>
        {v0Json.environment.providers.map((provider, index) => (
          <div className="provider-editor" key={index}>
            <span className="provider-type">{provider.type}</span>
            <input
              type="text"
              placeholder="env_var_id (comma separated)"
              value={provider.ids.join(', ')}
              onChange={(e) =>
                updateProvider(index, e.target.value.split(',').map((s) => s.trim()).filter(Boolean))
              }
            />
          </div>
        ))}
        <button className="add-button" onClick={addProvider} type="button">
          + Add provider
        </button>
      </section>

      <section className="card">
        <h3>Generated JSON</h3>
        <pre className="json-output">{jsonString}</pre>
        <button className="copy-button" onClick={handleCopy} type="button">
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
      </section>
    </div>
  )
}
