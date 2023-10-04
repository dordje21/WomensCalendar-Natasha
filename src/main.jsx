import { default as WebApp, default as WebAppInitData } from '@twa-dev/sdk'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'

WebApp.ready();
WebAppInitData.ready();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);