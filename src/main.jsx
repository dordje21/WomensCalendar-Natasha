import { default as WebApp, default as WebAppInitData } from '@twa-dev/sdk'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, useRoutes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Start from './components/Start/Start.jsx'
import './index.css'

WebApp.ready();
WebAppInitData.ready();

function App() {

  const [user, setUser] = useState('')

  useEffect(() => {
    setUser(WebApp.initDataUnsafe.user)
  })


  return useRoutes([
    { path: '/', element: <Start user={user}/> },
    { path: '/home', element: <Home /> },
  ]);
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
