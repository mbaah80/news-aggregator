import React from 'react'
import { Form, Input, Select, DatePicker, Button, Space } from 'antd'
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons'
import { useNewsStore } from '../store'

const { RangePicker } = DatePicker
const { Option } = Select

const categories = [
  { value: 'business', icon: '💼', label: 'Business' },
  { value: 'technology', icon: '💻', label: 'Technology' },
  { value: 'sports', icon: '⚽', label: 'Sports' },
  { value: 'entertainment', icon: '🎭', label: 'Entertainment' },
  { value: 'politics', icon: '🏛️', label: 'Politics' },
  { value: 'world', icon: '🌍', label: 'World' },
  { value: 'science', icon: '🔬', label: 'Science' },
  { value: 'health', icon: '🏥', label: 'Health' }
]

const sources = [
  { value: 'newsapi', label: 'News API', icon: '📰' },
  { value: 'guardian', label: 'The Guardian', icon: '🇬🇧' },
  { value: 'nyt', label: 'New York Times', icon: '🗽' }
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
    <div className="bg-white rounded-xl shadow-sm p-8 mb-8 transition-all">
      <Form
        form={form}
        layout="vertical"
        className="space-y-6"
        initialValues={{
          query: searchQuery,
          category: selectedCategory,
          dateRange: selectedDateRange,
          sources: selectedSources
        }}
      >
        {/* Search Bar */}
        <div className="relative">
          <Input 
            size="large"
            placeholder="Search for news..."
            prefix={<SearchOutlined className="text-gray-400 text-lg" />}
            onChange={(e) => setSearchQuery(e.target.value)}
            allowClear
            className="rounded-lg text-lg py-2 hover:shadow-sm transition-shadow"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Form.Item label="Category" name="category" className="mb-0">
            <Select
              size="large"
              placeholder="Select category"
              allowClear
              onChange={setSelectedCategory}
              className="w-full"
              popupClassName="rounded-lg"
            >
              {categories.map(({ value, icon, label }) => (
                <Option key={value} value={value}>
                  <Space className="text-base">
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item label="Date Range" name="dateRange" className="mb-0">
            <RangePicker 
              size="large"
              className="w-full rounded-lg hover:shadow-sm transition-shadow"
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
          
          <Form.Item label="News Sources" name="sources" className="mb-0">
            <Select
              size="large"
              mode="multiple"
              placeholder="Select sources"
              allowClear
              onChange={setSelectedSources}
              className="w-full"
              popupClassName="rounded-lg"
            >
              {sources.map(({ value, label, icon }) => (
                <Option key={value} value={value}>
                  <Space className="text-base">
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button 
            size="large"
            icon={<ClearOutlined />}
            onClick={handleReset}
            className="rounded-lg px-6 hover:shadow-sm transition-shadow"
          >
            Clear All
          </Button>
          <Button 
            type="primary" 
            size="large"
            icon={<FilterOutlined />}
            onClick={() => form.submit()}
            className="rounded-lg px-6 hover:shadow-sm transition-shadow"
          >
            Apply Filters
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default NewsFilters 