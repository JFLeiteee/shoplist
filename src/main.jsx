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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
