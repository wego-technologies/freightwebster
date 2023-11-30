"use client"

import { ThemeProvider } from "@react95/core"

export default function Provider({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={"win95"}>{children}</ThemeProvider>
}
