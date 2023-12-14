import type { Metadata } from "next";
import Provider from "@/components/provider";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "Freight Webster",
  description: "Digital guide to freight terminology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <Provider>{children}</Provider>
        <Analytics />
      </body>
    </html>
  );
}