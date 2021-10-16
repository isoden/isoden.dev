import Link from 'next/link'
import { TagContent } from '@/lib/tags'

type Props = {
  tag: TagContent
}

export function TagLink({ tag }: Props) {
  return (
    <Link href={`/posts/tags/${tag.slug}`}>
      <a>{'#' + tag.name}</a>
    </Link>
  )
}
