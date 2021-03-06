import React from 'react'
import Head from 'next/head'
import { SiteHeader } from '../SiteHeader/SiteHeader'

export const Layout = ({ children }) => {
  const meta = {
    title: 'isoden.dev',
  }

  return (
    <div className="container">
      <Head>
        <title>{meta.title}</title>
        <meta name="theme-color" content="#c36" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@700&display=swap&text=ISODEN.DEV"
          rel="stylesheet"
        />
      </Head>

      <SiteHeader />

      {children}
    </div>
  )
}
