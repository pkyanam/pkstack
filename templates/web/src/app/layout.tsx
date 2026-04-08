import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/server/api/provider'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

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
      <body className={`${geist.variable} font-sans antialiased`}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  )
}
