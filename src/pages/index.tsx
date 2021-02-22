import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'

import BasicMeta from '../components/meta/BasicMeta'
import OpenGraphMeta from '../components/meta/OpenGraphMeta'
import TwitterCardMeta from '../components/meta/TwitterCardMeta'
import { Layout } from '../components/Layout/Layout'
import { listPostContent, PostContent } from '../lib/posts'

type Props = {
  posts: PostContent[]
}

export default function Index({ posts }: Props) {
  return (
    <Layout>
      <BasicMeta url="/" />
      <OpenGraphMeta url="/" />
      <TwitterCardMeta url="/" />

      {/* <h2 className="text-xl font-bold">最新の投稿</h2>

      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            👉
            <Link href={`/posts/${post.slug}`}>
              <a> {post.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-right">
        <Link href="/posts">
          <a>投稿一覧</a>
        </Link>
      </div> */}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await listPostContent(1, 5)

  return {
    props: {
      posts,
    },
  }
}
