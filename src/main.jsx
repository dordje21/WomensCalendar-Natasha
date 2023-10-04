import {default as WebApp, default as WebAppInitData} from '@twa-dev/sdk'
import React from 'react'
import { createRoot } from 'react-dom';
import App from './App.jsx'
import './index.css'

WebApp.ready();
WebAppInitData.ready();

const rootElement = document.getElementById('root');

if(rootElement){
    createRoot(rootElement).render(<App />);
}else{
    console.error("Could not find root element to attach app");
}