export type NewsSource = 'newsapi' | 'guardian' | 'nyt'

export interface NewsArticleSource {
  id: string | null
  name: string
}

export interface NewsArticle {
  id: string
  title: string
  description: string | null
  content: string | null
  url: string
  imageUrl: string | null
  publishedAt: string
  source: NewsArticleSource
  author: string | null
  category: string | null
}

export interface UserPreferences {
  preferredSources: NewsSource[]
  preferredCategories: string[]
  preferredAuthors: string[]
  darkMode: boolean
} 