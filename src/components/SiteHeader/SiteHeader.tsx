import { memo } from 'react'
import Link from 'next/link'

export const SiteHeader = memo(function SiteHeader() {
  return (
    <header>
      <h1>
        <Link href="/">
          <a className="text-xl color-current no-underline hover:underline decoration-1">
            isoden<span className="color-primary">.</span>dev
          </a>
        </Link>
      </h1>
    </header>
  )
})
