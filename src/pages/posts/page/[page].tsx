import { GetStaticPaths, GetStaticProps } from 'next'
import config from '@/config.json'
import { Layout } from '@/components/Layout/Layout'
import { BasicMeta } from '@/components/meta/BasicMeta'
import { OpenGraphMeta } from '@/components/meta/OpenGraphMeta'
import { TwitterCardMeta } from '@/components/meta/TwitterCardMeta'
import { PostList } from '@/components/PostList'
import { countPosts, listPosts, PostContent } from '@/lib/posts'
import { listTags, TagContent } from '@/lib/tags'

type Props = {
  posts: PostContent[]
  tags: TagContent[]
  page: number
  pagination: {
    current: number
    pages: number
  }
}

export default function Page({ posts, tags, pagination, page }: Props) {
  const url = `/posts/page/${page}`
  const title = 'All posts'

  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params?.page as string, 10)
  const posts = await listPosts({ page, limit: config.posts_per_page })
  const tags = await listTags()
  const pagination = {
    current: page,
    pages: Math.ceil((await countPosts()) / config.posts_per_page),
  }

  return {
    props: {
      page,
      posts,
      tags,
      pagination,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil((await countPosts()) / config.posts_per_page)
  const paths = Array.from(Array(pages - 1).keys()).map(it => ({
    params: { page: (it + 2).toString() },
  }))

  return {
    paths: paths,
    fallback: false,
  }
}
