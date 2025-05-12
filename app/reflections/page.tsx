import Catalog from '@/components/catalog'

const data = [
  {
    title: '经验累积',
    description: '2024年感想',
    href: '/reflections/2024-thoughts'
  },
  {
    title: '四十不惑?',
    description: '',
    href: '/reflections/40-year-old'
  },
  {
    title: '梦回母校',
    description: '',
    href: '/reflections/dreaming-of-university'
  }
]

export default function BuildDevEnvironmentPage() {
  return (
    <section>
      <h1 className="font-semibold">感悟&随想</h1>
      <Catalog data={data} />
    </section>
  )
}
