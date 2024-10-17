export const metadata = {
  title: `Feng Wei's Frontend Tech Blog - Performance`,
  description: `Feng Wei's Frontend Tech Blog - Performance`
}

export default function PerformanceLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <article>{children}</article>
}
