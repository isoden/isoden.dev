import { format, formatISO } from 'date-fns'

type Props = {
  date: Date
}

export default function Date({ date }: Props) {
  return (
    <time className="inline-block text-sm mt-4 mr-2" dateTime={formatISO(date)}>
      <span>{format(date, 'yyyy年M月d日')}</span>
    </time>
  )
}
