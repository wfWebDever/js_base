export const metadata = {
  title: `Feng Wei's Frontend Tech Blog - CSS`,
  description: `Feng Wei's Frontend Tech Blog - CSS`
}

export default function CSSLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <article>{children}</article>
}
