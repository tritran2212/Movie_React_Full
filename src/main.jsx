import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import React from 'react'
import {BrowserRouter,RouterProvider} from"react-router"
import { router } from './router/router.jsx'
import { store } from './store/store.js'
import {Provider} from "react-redux"
createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
    </Provider>
   
  </React.StrictMode>,
)
