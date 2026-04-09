import type { Metadata } from 'next'
import './globals.css'
import { TRPCProvider } from '@/server/api/provider'

export const metadata: Metadata = {
  title: 'My App',
  description: 'Built with pkstack',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
