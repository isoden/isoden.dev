import React from 'react'
import Date from '../components/Date'
import { Layout } from '../components/Layout/Layout'
import BasicMeta from '../components/meta/BasicMeta'
import JsonLdMeta from '../components/meta/JsonLdMeta'
import OpenGraphMeta from '../components/meta/OpenGraphMeta'
import TwitterCardMeta from '../components/meta/TwitterCardMeta'
import Tags from '../components/Tags'
import { getTag } from '../lib/tags'

type Props = React.PropsWithChildren<{
  description: string
  frontMatter: {
    title: string
    date: Date
    slug: string
    tags: string[]
    author: string
  }
}>

export default function Index({ frontMatter: { title, date, slug, author, tags }, description, children }: Props) {
  const keywords = tags.map(it => getTag(it).name)

  return (
    <Layout>
      <BasicMeta url={`/posts/${slug}`} title={title} keywords={keywords} description={description} />
      <TwitterCardMeta url={`/posts/${slug}`} title={title} description={description} />
      <OpenGraphMeta url={`/posts/${slug}`} title={title} description={description} />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={author}
        description={description}
      />

      <article>
        <header>
          <h1>{title}</h1>

          <Date date={date} />
          <Tags tags={tags} />
        </header>
        <div>{children}</div>

        <a href={`https://github.com/isoden/isoden.dev/edit/master/src/pages/posts/${slug}.mdx`}>
          Send pull request via GitHub.
        </a>
      </article>
    </Layout>
  )
}
