
import { default as WebApp, default as WebAppInitData } from '@twa-dev/sdk'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom"
import Home from './components/Home/Home.jsx'
import Start from './components/Start/Start.jsx'
import './index.css'

WebApp.ready();
WebAppInitData.ready();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/home",
    element: <Home />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);