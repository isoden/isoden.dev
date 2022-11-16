import { format, formatISO } from 'date-fns'

type Props = {
  date: Date
}

export function FormatDate({ date }: Props) {
  return <time dateTime={formatISO(date)}>{format(date, 'yyyy年M月d日')}</time>
}
