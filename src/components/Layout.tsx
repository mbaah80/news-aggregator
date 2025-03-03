import React, { useState } from 'react'
import { Layout as AntLayout, Menu, Button, theme, Drawer, Dropdown, Avatar } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { 
  HomeOutlined, 
  StarOutlined, 
  SettingOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined
} from '@ant-design/icons'

const { Header, Sider, Content } = AntLayout

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
      className: 'menu-item hover:bg-blue-900/30',
    },
    {
      key: '/favorites',
      icon: <StarOutlined />,
      label: <Link to="/favorites">Favorites</Link>,
      className: 'menu-item hover:bg-blue-900/30',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
      className: 'menu-item hover:bg-blue-900/30',
    },
  ]

  React.useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 1024
      setIsMobile(newIsMobile)
      if (!newIsMobile) {
        setIsDrawerOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const renderMenu = () => (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      className="border-none bg-transparent px-2"
      items={menuItems}
      style={{
        fontSize: '16px',
      }}
    />
  )

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider 
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            background: '#111827',
            boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
            zIndex: 10,
            padding: '16px 0',
          }}
          width={280}
        >
          <div className="logo-container px-6 mb-8">
            <div className="text-white font-bold text-xl flex items-center h-12">
              <span className={`ml-3 ${collapsed ? 'hidden' : ''}`}>News Aggregator</span>
            </div>
          </div>
          {renderMenu()}
        </Sider>
      )}

      <Drawer
        placement="left"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        styles={{
          body: {
            padding: 0,
            background: '#111827',
          },
          header: {
            display: 'none',
          },
        }}
        width={280}
      >
        <div className="logo-container px-6 py-4 mb-4">
          <div className="text-white font-bold text-xl flex items-center h-12">
            <HomeOutlined className="text-2xl text-blue-400" />
            <span className="ml-3">News Aggregator</span>
          </div>
        </div>
        {renderMenu()}
      </Drawer>

      <AntLayout>
        <Header 
          style={{ 
            padding: 0, 
            background: colorBgContainer,
            boxShadow: '0 1px 2px 0 rgba(0,0,0,.03)',
            position: 'sticky',
            top: 0,
            zIndex: 9,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className="flex items-center">
            {isMobile && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setIsDrawerOpen(true)}
                className="ml-4"
                style={{ fontSize: '16px', width: 64, height: 64 }}
              />
            )}
            <span className="text-xl font-bold ml-4">News Aggregator</span>
          </div>

          {/* TODO: Future Improvements
           * - Add user authentication
           * - Implement user settings dropdown
           * - Add notifications bell icon
           * - Add dark/light theme toggle
           * - Add language selector
           * - Add search functionality
           */}
          <div className="flex items-center mr-6 gap-4">
            {/* TODO: Implement notifications system */}
            <Button type="text" icon={<BellOutlined />} className="hover:bg-gray-100" />
            
            <Dropdown
              menu={{
                items: [
                  { 
                    key: 'profile', 
                    label: 'Profile (TODO)',
                    disabled: true,
                    icon: <UserOutlined />,
                  },
                  { 
                    key: 'settings', 
                    label: 'Settings (TODO)',
                    disabled: true,
                    icon: <SettingOutlined />,
                  },
                  { type: 'divider' },
                  { 
                    key: 'login', 
                    label: 'Login (TODO)',
                    disabled: true,
                  },
                ],
              }}
              trigger={['click']}
            >
              <Button 
                type="text" 
                className="flex items-center hover:bg-gray-100 px-3"
                icon={<Avatar size="small" icon={<UserOutlined />} />}
              >
                <span className="ml-2 hidden sm:inline">Guest User</span>
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content className="m-6">
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout 