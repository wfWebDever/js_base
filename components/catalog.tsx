import Link from 'next/link'

type CatalogProps = {
  data: { title: string; href: string }[]
}

export default function Catalog({ data }: CatalogProps) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {data.map(item => (
        <div key={item.href}>
          <Link
            href={item.href}
            className="group relative flex flex-nowrap rounded-lg px-4 py-3 text-[#567] hover:text-[#654]"
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  )
}
