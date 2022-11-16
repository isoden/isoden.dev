import Link from 'next/link'
import { Layout } from '@/components/Layout/Layout'

export default function NotFoundPage() {
  return (
    <Layout>
      <h1>404: NOT FOUND</h1>
      <p>
        Sorry. The page is not found. 😢
        <br />
        <Link href="/">Back to home</Link>
      </p>
    </Layout>
  )
}
