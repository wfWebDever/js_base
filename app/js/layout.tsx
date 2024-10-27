export const metadata = {
  title: `Feng Wei's Frontend Tech Blog - JS`,
  description: `Feng Wei's Frontend Tech Blog - JS`
}

export default function JsLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <article>{children}</article>
}
