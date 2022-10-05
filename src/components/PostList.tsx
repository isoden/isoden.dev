import React from 'react'
import { PostContent } from '@/lib/posts'
import { TagContent } from '@/lib/tags'
import { PostItem } from '@/components/PostItem'
import { TagLink } from '@/components/TagLink'
import { Pagination } from '@/components/Pagination'

type Props = {
  posts: PostContent[]
  tags: TagContent[]
  pagination: {
    current: number
    pages: number
  }
}

export function PostList({ posts, tags, pagination }: Props) {
  return (
    <div className="container mx-auto">
      <div>
        <ul>
          {posts.map((it, i) => (
            <li key={i}>
              <PostItem post={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={(page) => (page === 1 ? '/posts' : `/posts/page/${page}`)}
        />
      </div>
      <ul>
        {tags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>
    </div>
  )
}
