const tags = {
  tags: [
    { slug: 'javascript', name: 'JavaScript' },
    { slug: 'misc', name: 'misc' },
    { slug: 'react', name: 'React' },
    { slug: 'service worker', name: 'Service Worker' },
  ],
}

export type TagContent = {
  readonly slug: string
  readonly name: string
}

const tagMap: { [key: string]: TagContent } = generateTagMap()

function generateTagMap(): { [key: string]: TagContent } {
  let result: { [key: string]: TagContent } = {}

  for (const tag of tags.tags) {
    result[tag.slug] = tag
  }

  return result
}

export function getTag(slug: string) {
  return tagMap[slug]
}

export function listTags(): TagContent[] {
  return tags.tags
}
