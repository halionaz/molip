import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'mol.ip',
  description: 'The most effective way to save ideas',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <h1><Link href="/">mol.ip</Link></h1>
        {children}
      </body>
    </html>
  )
}
