import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { parseISO } from 'date-fns'
import { FormatDate } from '@/components/FormatDate/FormatDate'
import { Layout } from '@/components/Layout/Layout'
import { BasicMeta } from '@/components/meta/BasicMeta'
import { JsonLdMeta } from '@/components/meta/JsonLdMeta'
import { OpenGraphMeta } from '@/components/meta/OpenGraphMeta'
import { TwitterCardMeta } from '@/components/meta/TwitterCardMeta'
import { Tags } from '@/components/Tags'
import { getTag } from '@/lib/tags'
import { getPost, listPosts, PostContent } from '@/lib/posts'

type Props = PostContent

export default function Index({ title, date, slug, tags = [], content }: Props) {
  const keywords = tags.map((it) => getTag(it).name)
  const description = ''

  return (
    <Layout>
      <BasicMeta url={`/posts/${slug}`} title={title} keywords={keywords} description={description} />
      <TwitterCardMeta url={`/posts/${slug}`} title={title} description={description} />
      <OpenGraphMeta url={`/posts/${slug}`} title={title} description={description} />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={parseISO(date)}
        author={''}
        description={description}
      />

      <article>
        <header>
          <h1>{title}</h1>

          <FormatDate date={parseISO(date)} />
          <Tags tags={tags} />
        </header>
        <div dangerouslySetInnerHTML={{ __html: content }} />

        <a href={`https://github.com/isoden/isoden.dev/edit/master/content/posts/${slug}.md`}>
          Send pull request via GitHub.
        </a>
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = await getPost(params?.slug as string)

  return {
    props: {
      ...post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await listPosts()

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  }
}
