import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'gatsby'

export default function NotFoundPage() {
  return (
    <Layout>
      <h1>404: NOT FOUND</h1>
      <p>
        Sorry. The page is not found. 😢
        <br />
        <Link to="/">Back to home</Link>
      </p>
    </Layout>
  )
}
