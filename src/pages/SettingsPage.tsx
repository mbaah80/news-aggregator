import React from 'react'
import { Form, Switch, Select, Button, Typography, Card, Divider, message, Space, Badge } from 'antd'
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons'
import { useNewsStore } from '../store'
import toast from 'react-hot-toast'

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
  const [loading, setLoading] = React.useState(false)
  
  const handleSubmit = (values: any) => {
    try {
      setLoading(true)
      let updatedPreferences = updateUserPreferences(values)
       if (updatedPreferences) {
        toast.success('Settings saved successfully')
       }
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }
  
  const handleReset = () => {
    const defaultSettings = {
      preferredSources: ['newsapi'],
      preferredCategories: [],
      preferredAuthors: [],
      darkMode: false
    }
    form.setFieldsValue(defaultSettings)
    message.info('Settings reset to default values')
  }
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Title level={2} className="!mb-2">Personalize Your Experience</Title>
        <Paragraph className="text-gray-500">
          Customize how your news feed appears and what content you see
        </Paragraph>
      </div>
      
      <Card className="shadow-md rounded-lg">
        <Form
          form={form}
          layout="vertical"
          initialValues={userPreferences}
          onFinish={handleSubmit}
          requiredMark="optional"
          className="space-y-6"
        >
          <div className="space-y-6">
            <div>
              <Divider orientation="left" className="!text-gray-400 font-medium">
                <Badge status="processing" text="News Sources" />
              </Divider>
              <Form.Item
                name="preferredSources"
                label="Preferred News Sources"
                rules={[{ required: true, message: 'Please select at least one news source' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select preferred news sources"
                  options={sources}
                  className="w-full"
                />
              </Form.Item>
            </div>

            <div>
              <Divider orientation="left" className="!text-gray-400 font-medium">
                <Badge status="success" text="Categories" />
              </Divider>
              <Form.Item
                name="preferredCategories"
                label="Preferred Categories"
                tooltip="Select categories to filter your news feed. Leave empty to see all categories."
              >
                <Select
                  mode="multiple"
                  placeholder="Select preferred categories"
                  allowClear
                  maxTagCount={5}
                  className="w-full"
                >
                  {categories.map(category => (
                    <Option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div>
              <Divider orientation="left" className="!text-gray-400 font-medium">
                <Badge status="warning" text="Authors" />
              </Divider>
              <Form.Item
                name="preferredAuthors"
                label="Preferred Authors"
                tooltip="Enter names of authors whose articles you want to prioritize in your feed"
              >
                <Select
                  mode="tags"
                  placeholder="Add authors"
                  allowClear
                  maxTagCount={5}
                  className="w-full"
                />
              </Form.Item>
            </div>

            {/* <div>
              <Divider orientation="left" className="!text-gray-400 font-medium">
                <Badge status="default" text="Appearance" />
              </Divider>
              <Form.Item
                name="darkMode"
                label="Dark Mode"
                valuePropName="checked"
              >
                <Switch className="bg-gray-300" />
              </Form.Item>
            </div> */}
          </div>

          <div className="pt-4 border-t">
            <Form.Item className="mb-0">
              <Space size="middle">
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={loading}
                  size="large"
                  className="shadow-sm"
                  
                >
                  Save Settings
                </Button>
                <Button 
                  onClick={handleReset}
                  icon={<ReloadOutlined />}
                  size="large"
                  className="shadow-sm"
                >
                  Reset to Default
                </Button>
              </Space>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default SettingsPage 