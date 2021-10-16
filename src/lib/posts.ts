import fs from 'fs/promises'
import path from 'path'

import matter from 'gray-matter'
import yaml from 'js-yaml'
import { markdown } from './markdown'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export type PostContent = {
  readonly date: string
  readonly title: string
  readonly slug: string
  readonly tags?: string[]
  readonly content: string
}

let postCache: PostContent[]

async function fetchPostContent(): Promise<PostContent[]> {
  if (postCache) {
    return postCache
  }

  // Get file names under /posts
  const filenames = await fs.readdir(postsDirectory)
  const allPostsData = await Promise.all(
    filenames
      .filter(it => it.endsWith('.md'))
      .map(async filename => {
        // Read markdown file as string
        const fileContents = await fs.readFile(path.join(postsDirectory, filename), 'utf8')

        // Use gray-matter to parse the post metadata section
        const { content, data } = matter(fileContents, {
          engines: {
            yaml: s => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
          },
        })

        const matterData = data as {
          date: string
          title: string
          tags: string[]
          slug: string
        }
        const slug = filename.replace(/\.md$/, '')

        // Validate slug string
        if (matterData.slug !== slug) {
          throw new Error('slug field not match with the path of its content source')
        }

        return {
          content: markdown(content),
          ...matterData,
        }
      }),
  )

  // Sort posts by date
  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else if (a.date > b.date) {
      return -1
    } else {
      return 0
    }
  })

  return postCache
}

export async function getPost(slug: string): Promise<PostContent | undefined> {
  const posts = await fetchPostContent()

  return posts.find(post => post.slug === slug)
}

export async function listPostsAll(): Promise<PostContent[]> {
  return await fetchPostContent()
}

export async function countPosts(tag?: string): Promise<number> {
  const posts = await fetchPostContent()

  return posts.filter(it => !tag || (it.tags && it.tags.includes(tag))).length
}

export async function listPostContent(page: number, limit: number, tag?: string): Promise<PostContent[]> {
  const posts = await fetchPostContent()

  return posts.filter(it => !tag || (it.tags && it.tags.includes(tag))).slice((page - 1) * limit, page * limit)
}
