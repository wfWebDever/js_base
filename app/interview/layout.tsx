export const metadata = {
  title: `Feng Wei's Frontend Tech Blog - Interview`,
  description: `Feng Wei's Frontend Tech Blog - Interview`
}

export default function InterviewLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <article>{children}</article>
}
