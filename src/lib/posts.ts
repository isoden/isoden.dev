import { promises as fs } from 'fs'
import matter from 'gray-matter'
import path from 'path'
import yaml from 'js-yaml'

const postsDirectory = path.join(process.cwd(), 'src/pages/posts')

export type PostContent = {
  readonly date: string
  readonly title: string
  readonly slug: string
  readonly tags?: string[]
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
      .filter(it => it.endsWith('.mdx'))
      .map(async filename => {
        // Read markdown file as string
        const fileContents = await fs.readFile(path.join(postsDirectory, filename), 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents, {
          engines: {
            yaml: s => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }),
          },
        })

        const matterData = matterResult.data as {
          date: string
          title: string
          tags: string[]
          slug: string
        }
        const slug = filename.replace(/\.mdx$/, '')

        // Validate slug string
        if (matterData.slug !== slug) {
          throw new Error('slug field not match with the path of its content source')
        }

        return matterData
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

export async function countPosts(tag?: string): Promise<number> {
  const posts = await fetchPostContent()

  return posts.filter(it => !tag || (it.tags && it.tags.includes(tag))).length
}

export async function listPostContent(page: number, limit: number, tag?: string): Promise<PostContent[]> {
  const posts = await fetchPostContent()

  return posts.filter(it => !tag || (it.tags && it.tags.includes(tag))).slice((page - 1) * limit, page * limit)
}