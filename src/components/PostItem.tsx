import Link from 'next/link'
import { parseISO } from 'date-fns'
import { PostContent } from '@/lib/posts'
import { FormatDate } from '@/components/FormatDate/FormatDate'

type Props = {
  post: PostContent
}
export function PostItem({ post }: Props) {
  return (
    <Link href={'/posts/' + post.slug}>
      <a>
        <FormatDate date={parseISO(post.date)} />
        <h2>{post.title}</h2>
      </a>
    </Link>
  )
}
