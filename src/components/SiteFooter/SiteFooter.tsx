import React from 'react'

import css from './SiteFooter.module.css'

export const SiteFooter = () => {
  return (
    <footer className={css.container} role="contentinfo">
      <small>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.ja" target="_blank" rel="noopener noreferrer">
          CC BY-SA 4.0
        </a>
      </small>
    </footer>
  )
}
