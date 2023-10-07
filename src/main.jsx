import {default as WebApp, default as WebAppInitData} from '@twa-dev/sdk'
import CloudStorage from '@twa-dev/sdk'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

WebApp.ready();
WebAppInitData.ready();
WebApp.CloudStorage.setItem("Test", "2");
let a = WebApp.CloudStorage.getKeys();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <>{a}</>
        <App />
    </React.StrictMode>,
)