import Catalog from '@/components/catalog'

const data = [
  {
    title: 'Nextjs+Tailwind+Typescript+Eslint+Prettier',
    description: '',
    href: '/build-dev-environment/nextjs-tailwind-ts-eslint-prettier'
  }
]

export default function BuildDevEnvironmentPage() {
  return (
    <section>
      <h1 className="font-semibold">Build Dev Environment</h1>
      <Catalog data={data} />
    </section>
  )
}
