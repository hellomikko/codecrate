import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'prismjs/themes/prism-tomorrow.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CodeCrate',
  description: 'An online community for testing and showcasing HTML, CSS, and JavaScript code snippets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}