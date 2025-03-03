import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'
import dayjs from 'dayjs'
import './index.css'
import toast, { Toaster } from 'react-hot-toast';

// Configure dayjs
import 'dayjs/locale/en'
dayjs.locale('en')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
      <Toaster />
    </ConfigProvider>
  </React.StrictMode>,
)
