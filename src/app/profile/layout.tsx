import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | CodeCrate',
  description: 'View your CodeCrate dashboard',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}