import Catalog from '@/components/catalog'

const data = [
  {
    title: 'Login',
    description: 'Login',
    href: '/github-used-components/login'
  },
  {
    title: 'Map',
    description: 'Map',
    href: '/github-used-components/map'
  },
  {
    title: 'Others',
    description: 'Others',
    href: '/github-used-components/others'
  }
]

export default function GithubUsedComponents() {
  return (
    <section>
      <h1 className="font-semibold">Github Used Components</h1>
      <Catalog data={data} />
    </section>
  )
}
