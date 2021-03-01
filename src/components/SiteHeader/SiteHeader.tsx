import React from 'react'

type Props = {}

export const SiteHeader = React.memo(function SiteHeader({  }: Props) {
  return (
    <h1 className="logo">
      isoden<span className="logo-dot">.</span>dev
    </h1>
  )
})
