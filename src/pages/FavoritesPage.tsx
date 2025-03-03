import React from 'react'
import { Row, Col, Empty } from 'antd'
import { useNewsStore } from '../store'
import NewsCard from '../components/NewsCard'

const FavoritesPage: React.FC = () => {
  const { favorites } = useNewsStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {favorites.length > 0 ? (
        <Row gutter={[16, 16]}>
          {favorites.map(article => (
            <Col xs={24} sm={12} lg={8} key={article.id}>
              <NewsCard article={article} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty 
          description="No favorite articles yet"
          className="py-16"
        />
      )}
    </div>
  )
}

export default FavoritesPage 