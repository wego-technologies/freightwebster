'use client'

import original from 'react95/dist/themes/original'
import { ThemeProvider } from 'styled-components'

// import { ThemeProvider } from "@react95/core"

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={original}>{children}</ThemeProvider>
}
