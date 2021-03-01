import React from 'react'
import Link from 'next/link'

type Props = {}

export const SiteHeader = React.memo(function SiteHeader({  }: Props) {
  return (
    <header>
      <h1>
        <Link href="/">
          <a className="font-logo text-xl color-current no-underline uppercase">
            isoden<span className="color-primary">.</span>dev
          </a>
        </Link>
      </h1>
    </header>
  )
})
