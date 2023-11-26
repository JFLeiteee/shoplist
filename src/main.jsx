import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/home.jsx'
import ErrorPage from './routes/errorPage.jsx'
import Cart from './routes/cart.jsx'
import Favorites from './routes/favorites.jsx'
import Product from './routes/product.jsx'
import Filter from './routes/filter.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      }, 
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "favorites",
        element: <Favorites />
      },
      {
        path: "product/:id",
        element: <Product />
      },
      {
        path: "filter/:category",
        element: <Filter />
      }
    ]
  }
])

import { ContextProvider } from './context/variableContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
