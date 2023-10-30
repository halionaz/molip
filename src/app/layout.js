import './globals.css'

export const metadata = {
  title: 'mol.ip',
  description: 'The most effective way to save ideas',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <h1>mol.ip</h1>
        {children}
      </body>
    </html>
  )
}
