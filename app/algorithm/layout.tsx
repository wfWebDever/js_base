export const metadata = {
  title: `Feng Wei's Frontend Tech Blog - Algorithm`,
  description: `Feng Wei's Frontend Tech Blog - Algorithm`
}

export default function AlgorithmLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <article>{children}</article>
}
