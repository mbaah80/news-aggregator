import React from 'react'
import { Form, Switch, Select, Button, Typography, Card, Divider, message } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { useNewsStore } from '../store'

const { Title, Paragraph } = Typography
const { Option } = Select

const categories = [
  'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology',
  'politics', 'world', 'nation', 'lifestyle', 'arts'
]

const sources = [
  { value: 'newsapi', label: 'News API' },
  { value: 'guardian', label: 'The Guardian' },
  { value: 'nyt', label: 'New York Times' }
]

const SettingsPage: React.FC = () => {
  const { userPreferences, updateUserPreferences } = useNewsStore()
  const [form] = Form.useForm()
  
  const handleSubmit = (values: any) => {
    updateUserPreferences(values)
    message.success('Settings saved successfully')
  }
  
  return (
    <div>
      <Title level={2}>Settings</Title>
      <Paragraph className="text-gray-500 mb-6">
        Customize your news feed preferences
      </Paragraph>
      
      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={userPreferences}
          onFinish={handleSubmit}
        >
          <Divider orientation="left">News Sources</Divider>
          <Form.Item
            name="preferredSources"
            label="Preferred News Sources"
            rules={[{ required: true, message: 'Please select at least one news source' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select preferred news sources"
              options={sources}
            />
          </Form.Item>
          
          <Divider orientation="left">Categories</Divider>
          <Form.Item
            name="preferredCategories"
            label="Preferred Categories"
            extra="If none selected, all categories will be shown"
          >
            <Select
              mode="multiple"
              placeholder="Select preferred categories"
              allowClear
            >
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Divider orientation="left">Authors</Divider>
          <Form.Item
            name="preferredAuthors"
            label="Preferred Authors"
            extra="Enter names of authors you want to follow"
          >
            <Select
              mode="tags"
              placeholder="Add authors"
              allowClear
            />
          </Form.Item>
          
          <Divider orientation="left">Appearance</Divider>
          <Form.Item
            name="darkMode"
            label="Dark Mode"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              icon={<SaveOutlined />}
            >
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SettingsPage 