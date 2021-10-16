import Head from 'next/head'
import { BlogPosting } from 'schema-dts'
import { jsonLdScriptProps } from 'react-schemaorg'
import { formatISO } from 'date-fns'
import config from '@/config.json'

type Props = {
  url: string
  title: string
  keywords?: string[]
  date: Date
  author?: string
  image?: string
  description?: string
}

export function JsonLdMeta({ url, title, keywords, date, author, image, description }: Props) {
  return (
    <Head>
      <script
        {...jsonLdScriptProps<BlogPosting>({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: config.base_url + url,
          headline: title,
          keywords: keywords?.join(','),
          datePublished: formatISO(date),
          author: author,
          image: image,
          description: description,
        })}
      />
    </Head>
  )
}
