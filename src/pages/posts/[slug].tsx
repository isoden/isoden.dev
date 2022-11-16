import { GetStaticPaths, GetStaticProps } from 'next'
import { Layout } from '@/components/Layout/Layout'
import { Title } from '@/components/Title/Title'
import { PostMeta } from '@/components/PostMeta/PostMeta'
import { getPost, listPosts, PostContent } from '@/lib/posts'

type Props = PostContent

export default function Index({ title, date, slug, tags, content }: Props) {
  return (
    <Layout>
      <Title>{title}</Title>

      <article>
        <header>
          <h2>{title}</h2>
          <PostMeta date={date} tags={tags} />
        </header>

        <div dangerouslySetInnerHTML={{ __html: content }} />

        <a
          href={`https://github.com/isoden/isoden.dev/edit/master/content/posts/${slug}.md`}
        >
          Send pull request via GitHub.
        </a>
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const post = await getPost(params?.slug as string)

  return {
    props: post,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await listPosts()

  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  }
}
