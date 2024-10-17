import Catalog from '@/components/catalog'

const data = [
  {
    title: 'Sticky',
    description: 'sticky',
    href: '/css/sticky'
  },
  {
    title: 'Scroll',
    description: 'scroll',
    href: '/css/scroll'
  },
  {
    title: 'Tailwind',
    description: 'Tailwind',
    href: '/css/tailwind'
  }
]

export default function CSSPage() {
  return (
    <section>
      <h1 className="font-semibold">CSS</h1>
      <Catalog data={data} />
    </section>
  )
}
