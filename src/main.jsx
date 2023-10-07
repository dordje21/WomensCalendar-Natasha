import {default as WebApp, default as WebAppInitData} from '@twa-dev/sdk'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

WebApp.ready();
WebAppInitData.ready();
WebApp.CloudStorage.setItem("Test", "2");
WebApp.CloudStorage.setItem("Test", "221");
WebApp.CloudStorage.setItem("Testas", "1");

WebApp.CloudStorage.getKeys();
WebApp.CloudStorage.getItems("Test");
WebApp.CloudStorage.getItem("Test");

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)