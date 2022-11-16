import Head from 'next/head'
import config from '@/config.json'

type Props = {
  children: string
}

export function Title({ children: title }: Props) {
  return (
    <Head>
      <title>
        {title ? [title, config.site_title].join(' | ') : config.site_title}
      </title>
    </Head>
  )
}
