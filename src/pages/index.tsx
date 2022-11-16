import { GetStaticProps } from 'next'
import Link from 'next/link'

import { Layout } from '@/components/Layout/Layout'
import { PostMeta } from '@/components/PostMeta/PostMeta'
import { listPosts, PostContent } from '@/lib/posts'

type Props = {
  posts: PostContent[]
}

export default function Index({ posts }: Props) {
  return (
    <Layout>
      <main>
        <h2>投稿一覧</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              <PostMeta date={post.date} tags={post.tags} />
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await listPosts()

  return {
    props: {
      posts,
    },
  }
}
