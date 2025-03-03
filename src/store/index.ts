import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { NewsArticle, UserPreferences, NewsSource } from '../types'

interface NewsState {
  articles: NewsArticle[]
  favorites: NewsArticle[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
  selectedDateRange: [string, string] | null
  selectedSources: NewsSource[]
  userPreferences: UserPreferences
  
  // Actions
  setArticles: (articles: NewsArticle[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedDateRange: (dateRange: [string, string] | null) => void
  setSelectedSources: (sources: NewsSource[]) => void
  toggleFavorite: (article: NewsArticle) => void
  isFavorite: (articleId: string) => boolean
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set, get) => ({
      articles: [],
      favorites: [],
      isLoading: false,
      error: null,
      searchQuery: '',
      selectedCategory: '',
      selectedDateRange: null,
      selectedSources: [],
      userPreferences: {
        preferredSources: ['newsapi', 'guardian', 'nyt'],
        preferredCategories: [],
        preferredAuthors: [],
        darkMode: false,
      },
      
      setArticles: (articles) => set({ articles }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      setSelectedDateRange: (selectedDateRange) => set({ selectedDateRange }),
      setSelectedSources: (selectedSources) => set({ selectedSources }),
      
      toggleFavorite: (article) => set((state) => {
        const isFavorited = state.favorites.some(fav => fav.id === article.id)
        
        if (isFavorited) {
          // Remove from favorites
          return {
            favorites: state.favorites.filter(fav => fav.id !== article.id)
          }
        } else {
          // Add to favorites
          return {
            favorites: [...state.favorites, article]
          }
        }
      }),
      
      isFavorite: (articleId) => get().favorites.some(fav => fav.id === articleId),
      
      updateUserPreferences: (preferences) => set((state) => ({
        userPreferences: { ...state.userPreferences, ...preferences }
      })),
    }),
    {
      name: 'news-storage',
      partialize: (state) => ({ 
        favorites: state.favorites,
        userPreferences: state.userPreferences
      }),
    }
  )
) 