import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Solar System Explorer - Educational Simulation',
  description: 'Interactive 3D solar system simulation for middle and high school students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}