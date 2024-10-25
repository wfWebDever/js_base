export const metadata = {
  title: `Feng Wei's Frontend Tech Blog - Build Dev Environment`,
  description: `Feng Wei's Frontend Tech Blog - Build Dev Environment`
}

export default function BuildDevEnvironmentLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <article>{children}</article>
}
