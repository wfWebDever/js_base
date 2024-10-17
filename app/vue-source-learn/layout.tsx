export const metadata = {
  title: `Feng Wei's Frontend Tech Blog - Vue Souece Learn`,
  description: `Feng Wei's Frontend Tech Blog - Vue Souece Learn`
}

export default function VueSourceLearnLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <article>{children}</article>
}
