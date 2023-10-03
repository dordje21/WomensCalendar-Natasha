import { HashRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Start from './components/Start/Start.jsx';
import ReactDOM from 'react-dom';
import React from 'react';

function App() {
  let element = useRoutes([
    { path: '/', element: <Start /> },
    { path: '/home', element: <Home /> },
  ]);

  return element;
}

ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    document.getElementById('root')
);