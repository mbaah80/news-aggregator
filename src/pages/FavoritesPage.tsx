import React from 'react'
import { Row, Col, Empty, Typography } from 'antd'
import { useNewsStore } from '../store'
import NewsCard from '../components/NewsCard'

const { Title } = Typography

const FavoritesPage: React.FC = () => {
  const { favorites } = useNewsStore()
  
  return (
    <div>
      <Title level={2}>Saved Articles</Title>
      
      {favorites.length > 0 ? (
        <Row gutter={[16, 16]}>
          {favorites.map(article => (
            <Col xs={24} sm={12} lg={8} xl={6} key={article.id}>
              <NewsCard article={article} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty 
          description="You haven't saved any articles yet." 
          className="py-20"
        />
      )}
    </div>
  )
}

export default FavoritesPage 