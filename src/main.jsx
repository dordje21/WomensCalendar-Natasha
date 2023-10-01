
import { default as WebApp, default as WebAppInitData } from '@twa-dev/sdk'
import React from 'react'
import ReactDOM from 'react-dom/client.js'
import App from './App.jsx'
import './index.css'

WebApp.ready();
WebAppInitData.ready();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
