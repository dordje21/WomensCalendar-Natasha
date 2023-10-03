import {HashRouter, useRoutes} from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import './index.css'
import Start from './components/Start/Start.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

function App() {
    return useRoutes([
      {path: '/', element: <Start/>},
      {path: '/home', element: <Home/>},
  ]);
}

ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    document.getElementById('root')
);