import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import matter from 'gray-matter'
import yaml from 'js-yaml'
import { parseISO } from 'date-fns'
import { markdown } from '@/lib/markdown'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type PostContent = {
  readonly date: string
  readonly title: string
  readonly slug: string
  readonly tags?: string[]
  readonly content: string
}

const fetchPostContent = (() => {
  let postCache: PostContent[]

  return async function fetchPostContent(): Promise<PostContent[]> {
    if (postCache) {
      return postCache
    }

    const filenames = await fs.readdir(postsDirectory)
    const allPostsData = await Promise.all(
      filenames
        .filter((it) => it.endsWith('.md'))
        .map(async (filename) => {
          const { content, data } = matter(
            await fs.readFile(path.join(postsDirectory, filename), 'utf8'),
            {
              engines: {
                yaml: (s) =>
                  yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
              },
            },
          )

          const matterData = data as Pick<
            PostContent,
            'title' | 'date' | 'tags' | 'slug'
          >
          const slug = filename.replace(/\.md$/, '')

          // Validate slug string
          if (matterData.slug !== slug) {
            throw new Error(
              'slug field not match with the path of its content source',
            )
          }

          return {
            content: markdown(content),
            ...matterData,
          }
        }),
    )

    // Sort posts by date
    postCache = allPostsData.sort(
      (a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime(),
    )

    return postCache
  }
})()

export async function getPost(slug: string): Promise<PostContent> {
  const posts = await fetchPostContent()
  const post = posts.find((post) => post.slug === slug)

  if (post === undefined) {
    throw new Error(`Not found. (slug = ${slug})`)
  }

  return post
}

export async function listPosts(): Promise<PostContent[]> {
  return await fetchPostContent()
}
