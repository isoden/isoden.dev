import { parseISO } from 'date-fns'
import { FormatDate } from '@/components/FormatDate/FormatDate'
import { getTag } from '@/lib/tags'

type Props = {
  date: string
  tags?: string[]
}

export function PostMeta({ date, tags }: Props) {
  return (
    <dl className="flex flex-wrap text-sm">
      <dt>
        <span className="sr-only">公開日</span>
        <span role="img" aria-hidden="true">
          📅
        </span>
      </dt>
      <dd>
        <FormatDate date={parseISO(date)} />
      </dd>
      <dt className="ml-sm">
        <span className="sr-only">タグ</span>
        <span role="img" aria-hidden="true">
          🏷
        </span>
      </dt>
      {tags?.map((tag) => {
        const t = getTag(tag)

        return <dd key={t.slug}>{t.name}</dd>
      })}
    </dl>
  )
}
