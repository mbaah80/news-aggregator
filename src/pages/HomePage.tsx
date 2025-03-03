import React, { useEffect } from 'react'
import { Row, Col, Empty, Alert } from 'antd'
import { useNewsStore } from '../store'
import NewsCard from '../components/NewsCard'
import NewsCardSkeleton from '../components/NewsCardSkeleton'
import NewsFilters from '../components/NewsFilters'
import { fetchAllNews } from '../services/api'

const LoadingSkeletons = () => (
  <Row gutter={[16, 16]} className="animate-fade-in">
    {[...Array(6)].map((_, index) => (
      <Col xs={24} sm={12} lg={8} key={index}>
        <NewsCardSkeleton />
      </Col>
    ))}
  </Row>
)

const HomePage: React.FC = () => {
  const { 
    articles, 
    isLoading, 
    error,
    searchQuery,
    selectedCategory,
    selectedDateRange,
    selectedSources,
    userPreferences,
    setArticles,
    setLoading,
    setError
  } = useNewsStore()
  
  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const sourcesToUse = selectedSources.length > 0 
        ? selectedSources 
        : userPreferences.preferredSources
      
      const dateRange = selectedDateRange || [null, null]
      
      const news = await fetchAllNews(
        searchQuery,
        selectedCategory,
        dateRange[0] || '',
        dateRange[1] || '',
        sourcesToUse
      )
      
      setArticles(news)
    } catch (err) {
      setError('Failed to fetch news. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchNews()
  }, [searchQuery, selectedCategory, selectedDateRange, selectedSources])
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="space-y-4 sm:space-y-8">
          {/* Filters Section */}
          <NewsFilters />
          
          {/* Error Alert */}
          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              showIcon
              className="rounded-xl shadow-sm"
            />
          )}
          
          {/* Content Section */}
          <div className="bg-white rounded-xl shadow-sm p-2 sm:p-8">
            {isLoading ? (
              <LoadingSkeletons />
            ) : articles.length > 0 ? (
              <Row 
                gutter={[16, 16]} 
                className="animate-fade-in"
              >
                {articles.map(article => (
                  <Col xs={24} sm={12} lg={8} key={article.id}>
                    <NewsCard article={article} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty 
                description={
                  <span className="text-gray-500 text-base sm:text-lg">
                    No news articles found. Try adjusting your filters.
                  </span>
                }
                className="min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage 