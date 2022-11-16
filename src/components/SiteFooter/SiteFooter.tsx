import { memo } from 'react'

export const SiteFooter = memo(function SiteFooter() {
  return (
    <footer>
      <small>
        <a
          className="color-primary"
          href="https://creativecommons.org/licenses/by-sa/4.0/deed.ja"
          target="_blank"
        >
          CC BY-SA 4.0
        </a>
      </small>
    </footer>
  )
})
