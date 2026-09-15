'use client'

import { useState } from 'react'
import { ImportWizard } from './import/ImportWizard'
import { V0JsonEditor } from './editor/V0JsonEditor'
import { SkillBrowser } from './skills/SkillBrowser'

type Tab = 'import' | 'editor' | 'skills'

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('import')

  return (
    <main className="shell">
      <header>
        <h1>Design System Import</h1>
        <p className="subtitle">Import a design system, preview v0.json, and manage skills</p>
      </header>

      <nav className="tabs">
        {[
          { id: 'import', label: 'Import' },
          { id: 'editor', label: 'v0.json Editor' },
          { id: 'skills', label: 'Skills' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as Tab)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'import' && <ImportWizard />}
      {activeTab === 'editor' && <V0JsonEditor />}
      {activeTab === 'skills' && <SkillBrowser />}
    </main>
  )
}
