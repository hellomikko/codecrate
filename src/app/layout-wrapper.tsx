import RootLayout from './layout'
import { metadata } from './metadata'

export { metadata }

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>
}