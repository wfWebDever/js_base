export const metadata = {
  title: `Feng Wei's Frontend Tech Blog - AI`,
  description: `Feng Wei's Frontend Tech Blog - AI`
}

export default function BuildDevEnvironmentLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <article>{children}</article>
}
