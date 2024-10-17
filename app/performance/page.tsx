import Catalog from '@/components/catalog'

const data = [
  {
    title: 'CLS',
    description: 'CLS',
    href: '/performance/cls'
  },
  {
    title: 'LCP',
    description: 'LCP',
    href: '/performance/lcp'
  },
  {
    title: 'LazyImg',
    description: 'LazyImg',
    href: '/performance/lazy-img'
  }
]

export default function Performance() {
  return (
    <section>
      <h1 className="font-semibold">Performance</h1>
      <Catalog data={data} />
    </section>
  )
}
