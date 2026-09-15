import type { ReactNode } from 'react'

import './styles.css'

export const description = 'Design System Import workflow'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

