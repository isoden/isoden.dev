import React, { useMemo } from 'react'
import Link from 'next/link'
import { getTag } from '@/lib/tags'

type Props = {
  tags: string[]
}

export default function Tags({ tags: tagSlugs }: Props) {
  const tags = useMemo(() => tagSlugs.map(getTag), tagSlugs)

  if (tags.length === 0) {
    return <span className="inline-block">この記事にタグはありません。</span>
  }

  return (
    <ul className="inline-block">
      {tags.map((tag, i) => (
        <li key={i} className="inline-block">
          <Link href={`/posts/tags/${tag.slug}`}>
            <a>#{tag.name}</a>
          </Link>
          ,
        </li>
      ))}
    </ul>
  )
}
