import Catalog from '@/components/catalog'

const data = [
  {
    title: 'IE 低版本兼容问题',
    description: '',
    href: '/work-experience/ie-low-version-compatibility'
  },
  {
    title: '浏览器添加 jQuery',
    description: '',
    href: '/work-experience/add-jquery-to-browser'
  },
  {
    title: '去抖和节流',
    description: '',
    href: '/work-experience/debounce-and-throttle'
  },
  {
    title: 'url 参数过滤',
    description: '',
    href: '/work-experience/url-param-filter'
  }
]

export default function WorkExperiencePage() {
  return (
    <section>
      <h1 className="font-semibold">Work Experience</h1>
      <Catalog data={data} />
    </section>
  )
}
