import React, { useMemo } from 'react'
import Link from 'next/link'
import { getTag } from '../lib/tags'

type Props = {
  tags: string[]
}

export default function Tags({ tags: tagSlugs }: Props) {
  const tags = useMemo(() => tagSlugs.map(getTag), tagSlugs)

  return (
    <div className="inline-block text-sm">
      {tags.length > 0 ? (
        <ul>
          {tags.map((tag, i) => (
            <li key={i} className="inline-block mr-1">
              <Link href={`/posts/tags/${tag.slug}`}>
                <a>#{tag.name}</a>
              </Link>
              ,
            </li>
          ))}
        </ul>
      ) : (
        <span>この記事にタグはありません。</span>
      )}
    </div>
  )
}
