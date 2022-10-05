import React from 'react'
import Head from 'next/head'
import { SiteHeader } from '@/components/SiteHeader/SiteHeader'

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const meta = {
    title: 'isoden.dev',
  }

  return (
    <div className="container mx-auto">
      <Head>
        <title>{meta.title}</title>
        <meta name="theme-color" content="#c36" />
      </Head>

      <SiteHeader />

      {children}
    </div>
  )
}
