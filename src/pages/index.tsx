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
        <h1 className="text-lg">投稿一覧</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <h2 className="text-md">
                <Link href={`/posts/${post.slug}`} className="color-primary">
                  {post.title}
                </Link>
              </h2>
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
