import React from 'react'
import { Card, Typography, Space, Tag, Button } from 'antd'
import { StarOutlined, StarFilled } from '@ant-design/icons'
import { format } from 'date-fns'
import { NewsArticle } from '../types'
import { useNewsStore } from '../store'

const { Title, Paragraph, Text } = Typography

interface NewsCardProps {
  article: NewsArticle
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useNewsStore()
  
  const isFavorite = favorites.some(fav => fav.id === article.id)
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(article.id)
    } else {
      addToFavorites(article)
    }
  }
  
  return (
    <Card
      className="news-card h-full flex flex-col"
      cover={
        article.imageUrl ? (
          <div className="h-48 overflow-hidden">
            <img
              alt={article.title}
              src={article.imageUrl}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <Text type="secondary">No image available</Text>
          </div>
        )
      }
      actions={[
        <Button 
          type="text" 
          icon={isFavorite ? <StarFilled className="text-yellow-500" /> : <StarOutlined />}
          onClick={toggleFavorite}
        >
          {isFavorite ? 'Saved' : 'Save'}
        </Button>,
        <Button type="link" href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </Button>
      ]}
    >
      <div className="flex flex-col flex-grow">
        <Title level={4} className="line-clamp-2">{article.title}</Title>
        
        <Space className="mb-2">
          <Tag color="blue">{article.source.name}</Tag>
          {article.category && <Tag color="green">{article.category}</Tag>}
        </Space>
        
        <Paragraph className="text-gray-500 line-clamp-3">
          {article.description || 'No description available'}
        </Paragraph>
        
        <div className="mt-auto pt-2">
          <Space direction="vertical" size={0} className="w-full">
            {article.author && (
              <Text type="secondary" className="text-sm">
                By {article.author}
              </Text>
            )}
            <Text type="secondary" className="text-sm">
              {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
            </Text>
          </Space>
        </div>
      </div>
    </Card>
  )
}

export default NewsCard 