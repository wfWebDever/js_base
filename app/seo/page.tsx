export default async function SEOPage() {
  return (
    <article>
      <h2>Learn SEO</h2>
      <p>
        Reference websites: <a href="https://www.apartments.com">Apartment</a>,{' '}
        <a href="https://www.redfin.com">Redfin</a>
      </p>
      <p>
        Tools: <a href="https://www.semrush.com">Semrush</a>,{' '}
        <a href="https://search.google.com/search-console/about">Google Search Console</a>,{' '}
        <a href="https://search.google.com/test/rich-results">Google Rich Results Test</a>,{' '}
        <a href="https://pagespeed.web.dev">PageSpeed Insights</a>
      </p>
      <p>
        Resources: <a href="https://schema.org">Schema.org</a>,{' '}
        <a href="https://hrefgo.com/blog/seo-basic#%E5%A6%82%E4%BD%95%E5%8A%A0%E5%85%A5%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E%E6%8E%92%E5%90%8D%EF%BC%9F">
          Hrefgo
        </a>
        , <a href="https://www.yesharris.com/seo-basic/seo-audit-list/">Yesharris</a>
      </p>
      <h2>Summary</h2>
      <p>
        SEO involves URL structure design, the header part of the page, the H1 title of the page,
        the page content, page FAQ, embedding Schema structured markup, internal linking for SEO,
        XML sitemap, robots.txt, 301 and 302 redirects, responsive design, and website speed
        optimization.
      </p>
      <h2>URL Structure Design and Optimization</h2>
      <p>
        Ensure URLs are concise, clear, and descriptive. Google favors semantic and simple URLs.
        Each page should only have one URL to avoid duplicate content. If the same page has multiple
        URLs, use the{' '}
        <pre className="">
          <code>rel=&quot;canonical&quot;</code>
        </pre>{' '}
        tag to tell search engines which URL is the preferred version. Also, consider multilingual
        settings (described in the header part). For example:
        `https://xxxx/Los-Angeles/studio-apartments-for-rent`. Make sure to check Semrush daily to
        see if there are any abnormal errors.
      </p>
      <h2>Header Section</h2>
      <p>
        The page header includes `title`, `description`, `og:xxx` (for sharing), `canonical`, and
        `alternate` (for multilingual purposes). The key is to ensure that the `title` and
        `description` match the theme of the current page, and that different URLs do not have
        duplicate content. Otherwise, Semrush will detect errors.
      </p>
      <h2>Page H1 Title</h2>
      <p>
        The H1 title should ideally match or be similar to the URL, making it easier to clearly
        express the page’s content. For example:
      </p>
      <ul>
        <li>
          <a href="https://www.apartments.com/los-angeles-ca/">Apartments Los Angeles</a>
        </li>
        <li>
          <a href="https://www.redfin.com/city/11203/CA/Los-Angeles/houses-for-rent">
            Redfin Los Angeles Rentals
          </a>
        </li>
        <li>
          <a href="https://www.semrush.com/siteaudit/campaign/4756982/review/overview">
            Semrush Site Audit
          </a>
        </li>
      </ul>
      <p>
        More examples:
        <ul>
          <li>
            <a href="https://search.google.com/search-console/about">Google Search Console</a>
          </li>
          <li>
            <a href="https://pagespeed.web.dev/?hl=en">Page Speed Insights</a>
          </li>
        </ul>
      </p>

      <h2>Internal Links</h2>
      <p>
        Internal links refer to links between pages under the same website domain. A good internal
        link structure helps search engines better understand the website’s structure and the
        importance of pages, thus improving the overall SEO performance.
      </p>
      <p>
        For example:The hyperlinks at the bottom of the listing page on a rental website represent
        different search results for listings.
      </p>
      <h2>Page Content and FAQ</h2>
      <p>
        This refers to large sections of descriptive information and Q&A on the page. By naturally
        incorporating relevant keywords in the context, search engines can better understand the
        content and theme of the page.
      </p>
      <p>For example: the content and FAQ at the bottom of the listing page on a rental website</p>
      <h2>Schema</h2>
      <p>
        Schema uses a set of standardized semantic tags to help search engines better understand the
        meaning of the webpage content. Based on the Schema.org vocabulary, Schema markup involves
        adding structured data (usually in JSON-LD format) to HTML, allowing search engines to
        accurately crawl and display content. It can also generate rich results in search results
        (such as star ratings, images, FAQ snippets, etc.).
        <br />
        For example, searching for &quot;1600 West 35th Street&quot; on Google not only ranks the
        address but also displays ratings, images, etc.
      </p>

      <h2>XML Sitemap and Robots.txt</h2>
      <p>
        These help search engines better crawl and index website content. The corresponding code
        files are `sitemap.xml.jsx` and `robots.txt.jsx`. For pages with no data, the page of the
        official website uses X-Robots-Tag: noindex to handle indexing exclusion.A new link can be
        submitted, but it’s best to use the sitemap method mentioned above.
      </p>
      <h2>301 and 302 Redirects</h2>
      <p>
        Due to an old version of the website and some incorrect URLs, redirects were applied to
        prevent traffic loss.
      </p>
      <h2>Responsive Design</h2>
      <p>Google favors responsive websites for SEO, so responsive design is essential.</p>
      <h2>Website Speed Optimization</h2>
      <p>
        This is mainly reflected in Google Console - Core Web Vitals results. Before April 2024, the
        key metrics were LCP, CLS, and FID. In April 2024, Google replaced FID with the INP metric.
      </p>
      <p>
        There’s a delay in reflecting website speed optimizations, so changes made this month may
        not show results until next month.
      </p>
    </article>
  )
}
