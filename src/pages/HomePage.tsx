import React, { useEffect } from 'react'
import { Row, Col, Spin, Empty, Alert, Typography } from 'antd'
import { useNewsStore } from '../store'
import NewsCard from '../components/NewsCard'
import NewsFilters from '../components/NewsFilters'
import { fetchAllNews } from '../services/api'

const { Title } = Typography

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
    <div>
     
      <NewsFilters />
      
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-6"
        />
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      ) : articles.length > 0 ? (
        <Row gutter={[16, 16]}>
          {articles.map(article => (
            <Col xs={24} sm={12} lg={8} xl={6} key={article.id}>
              <NewsCard article={article} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty 
          description="No news articles found. Try adjusting your filters." 
          className="py-20"
        />
      )}
    </div>
  )
}

export default HomePage 