import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'

import 'prismjs/themes/prism-tomorrow.css'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: "Feng Wei's Frontend Technology Blog",
  description: "Welcome to Feng Wei's Frontend Technology Blog!"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header>
          <div className="mx-auto max-w-screen-sm px-3">
            <div className="flex flex-wrap justify-between gap-y-2">
              <Link
                href="/"
                target="_self"
                className="inline-block decoration-black/30  hover:decoration-black/50 focus-visible:decoration-black/50   text-current hover:text-black focus-visible:text-black  transition-colors duration-300 ease-in-out"
              >
                <div className="font-semibold"> Feng Wei&nbsp;🔬</div>{' '}
              </Link>{' '}
              <nav className="flex items-center gap-4 text-sm">
                {' '}
                <Link
                  href="/"
                  target="_self"
                  className="inline-block decoration-black/30  hover:decoration-black/50 focus-visible:decoration-black/50  text-current hover:text-black focus-visible:text-black  transition-colors duration-300 ease-in-out underline underline-offset-[3px]"
                >
                  {' '}
                  Home{' '}
                </Link>{' '}
                <Link
                  href="https://github.com/wfWebDever"
                  target="_self"
                  className="inline-block decoration-black/30  hover:decoration-black/50 focus-visible:decoration-black/50  text-current hover:text-black focus-visible:text-black  transition-colors duration-300 ease-in-out underline underline-offset-[3px]"
                >
                  {' '}
                  Github{' '}
                </Link>{' '}
                <Link
                  href="mailto:xinyilan2005@gmail.com"
                  target="_self"
                  className="inline-block decoration-black/30  hover:decoration-black/50 focus-visible:decoration-black/50  text-current hover:text-black focus-visible:text-black  transition-colors duration-300 ease-in-out underline underline-offset-[3px]"
                >
                  {' '}
                  Email{' '}
                </Link>{' '}
                <Link
                  href="/reflections"
                  className="inline-block decoration-black/30  hover:decoration-black/50 focus-visible:decoration-black/50  text-current hover:text-black focus-visible:text-black  transition-colors duration-300 ease-in-out underline underline-offset-[3px]"
                >
                  Reflections
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-screen-sm px-3">{children}</div>
        </main>
        <Analytics />
      </body>
    </html>
  )
}
