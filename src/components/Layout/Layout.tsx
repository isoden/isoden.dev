import type React from 'react'
import Head from 'next/head'
import { SiteHeader } from '@/components/SiteHeader/SiteHeader'
import { SiteFooter } from '@/components//SiteFooter/SiteFooter'

import config from '@/config.json'

export const Layout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="container mx-auto">
      <Head>
        <title>{config.site_title}</title>
        <meta name="theme-color" content="#c36" />
      </Head>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}
