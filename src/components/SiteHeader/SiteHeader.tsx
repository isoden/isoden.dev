import React from 'react'
import css from './SiteHeader.module.css'

type Props = {}

export const SiteHeader = React.memo(function SiteHeader({  }: Props) {
  return (
    <h1 className={css.logo}>
      isoden<span className={css['logo-dot']}>.</span>dev 👨‍💻
    </h1>
  )
})
