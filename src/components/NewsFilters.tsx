import React from 'react'
import { Form, Input, Select, DatePicker, Button, Space, Divider } from 'antd'
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons'
import { useNewsStore } from '../store'

const { RangePicker } = DatePicker
const { Option } = Select

const categories = [
  'business',
  'technology',
  'sports',
  'entertainment',
  'politics',
  'world',
  'science',
  'health'
]

const sources = [
  { value: 'newsapi', label: 'News API' },
  { value: 'guardian', label: 'The Guardian' },
  { value: 'nyt', label: 'New York Times' }
]

const NewsFilters: React.FC = () => {
  const { 
    searchQuery, 
    selectedCategory, 
    selectedDateRange, 
    selectedSources,
    setSearchQuery,
    setSelectedCategory,
    setSelectedDateRange,
    setSelectedSources
  } = useNewsStore()
  
  const [form] = Form.useForm()
  
  const handleReset = () => {
    form.resetFields()
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedDateRange(null)
    setSelectedSources([])
  }
  
  return (
    <div className="mb-6">
      <Divider orientation="left">
        <Space>
          <FilterOutlined />
          <span>Filter News</span>
        </Space>
      </Divider>
      
      <Form
        form={form}
        layout="vertical"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initialValues={{
          query: searchQuery,
          category: selectedCategory,
          dateRange: selectedDateRange,
          sources: selectedSources
        }}
      >
        <Form.Item label="Search" name="query">
          <Input 
            placeholder="Search news..." 
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
          />
        </Form.Item>
        
        <Form.Item label="Category" name="category">
          <Select
            placeholder="Select category"
            allowClear
            onChange={setSelectedCategory}
          >
            {categories.map(category => (
              <Option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item label="Date Range" name="dateRange">
          <RangePicker 
            className="w-full"
            onChange={(dates) => {
              if (dates) {
                const [start, end] = dates
                setSelectedDateRange([
                  start?.format('YYYY-MM-DD') || '',
                  end?.format('YYYY-MM-DD') || ''
                ])
              } else {
                setSelectedDateRange(null)
              }
            }}
          />
        </Form.Item>
        
        <Form.Item label="Sources" name="sources">
          <Select
            mode="multiple"
            placeholder="Select sources"
            allowClear
            onChange={setSelectedSources}
            options={sources}
          />
        </Form.Item>
        
        <Form.Item className="md:col-span-2 lg:col-span-4">
          <Space>
            <Button 
              type="primary" 
              icon={<FilterOutlined />}
              onClick={() => form.submit()}
            >
              Apply Filters
            </Button>
            <Button 
              icon={<ClearOutlined />}
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default NewsFilters 