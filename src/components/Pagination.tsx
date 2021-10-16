import { generatePagination } from '@/lib/pagination'
import Link from 'next/link'

type Props = {
  current: number
  pages: number
  link: (page: number) => string
}

export function Pagination({ current, pages, link }: Props) {
  const pagination = generatePagination(current, pages)

  return (
    <ul>
      {pagination.map((it, i) => (
        <li key={i}>
          {it.excerpt ? (
            '...'
          ) : (
            <Link href={link(it.page as number)}>
              <a className={it.page === current ? 'active' : undefined}>{it.page}</a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
