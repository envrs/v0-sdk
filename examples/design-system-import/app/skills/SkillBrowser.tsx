'use client'

import { useState } from 'react'

export type Skill = {
  id: string
  name: string
  description: string
  sources: string[]
  createdAt: string
}

export function SkillBrowser() {
  const [skills] = useState<Skill[]>([
    {
      id: '1',
      name: 'Acme Design System',
      description: 'Acme Corp design system with React components and tokens',
      sources: ['github:acme/design-system', 'figma:acme/design-system'],
      createdAt: '2026-01-15',
    },
    {
      id: '2',
      name: 'Internal UI Kit',
      description: 'Internal component library and theme',
      sources: ['github:internal/ui-kit'],
      createdAt: '2026-03-22',
    },
  ])
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="skills">
      <section className="card">
        <h2>Your Design Systems</h2>
        <p className="description">
          Saved design system skills. Attach one to a chat or reference it in your prompt.
        </p>

        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search"
        />

        {filtered.length === 0 ? (
          <p className="empty">No skills found.</p>
        ) : (
          <div className="skills-list">
            {filtered.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        )}
      </section>

      <section className="card">
        <h2>How to use</h2>
        <ol className="instructions">
          <li>Attach a skill from the prompt toolbar, or</li>
          <li>Reference it directly in your prompt: "Build using the Acme Design System"</li>
          <li>Use built-in examples from the Design Systems page</li>
        </ol>

        <h3>Customize</h3>
        <ul className="instructions">
          <li>Upload a logo (PNG, up to 4MB) in skill settings</li>
          <li>Set appearance colors in SKILL.md frontmatter</li>
          <li>Set as team default (team owners on paid plans)</li>
        </ul>
      </section>
    </div>
  )
}

function SkillCard({ skill }: { skill: Skill }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="skill-card">
      <div className="skill-header">
        <div>
          <h4>{skill.name}</h4>
          <p className="skill-desc">{skill.description}</p>
        </div>
      </div>

      <button
        className="toggle"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        {expanded ? '▾' : '▸'} {expanded ? 'Less' : 'Details'}
      </button>

      {expanded && (
        <div className="skill-details">
          <div className="detail-row">
            <strong>Sources:</strong>
            <ul>
              {skill.sources.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="detail-row">
            <strong>Created:</strong> {skill.createdAt}
          </div>
          <div className="skill-actions">
            <button className="attach-button" type="button">
              Attach to chat
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
