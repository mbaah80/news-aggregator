export type NewsSource = 'newsapi' | 'guardian' | 'nyt'

export interface NewsArticleSource {
  id: string | null
  name: string
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  url: string
  imageUrl: string | null
  publishedAt: string
  source: {
    id: string | null
    name: string
  }
  author: string | null
  category?: string
}

export interface UserPreferences {
  preferredSources: NewsSource[]
  preferredCategories: string[]
  preferredAuthors: string[]
  darkMode: boolean
} 