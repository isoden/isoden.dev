import { memo } from 'react'
import Link from 'next/link'

export const SiteHeader = memo(function SiteHeader() {
  return (
    <header>
      <p>
        <Link href="/" className="text-lg font-semibold color-current">
          isoden<span className="color-primary">.</span>dev
        </Link>
      </p>
    </header>
  )
})
