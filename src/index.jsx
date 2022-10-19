import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './app/store'
import Root from './routes/root'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <div>Oops page not found <a href="./">Go back</a></div>,
    children: [
      {
        path: 'children', // Use <Outlet /> Component
        element: <h1>A route with an embed child</h1>,
      },
    ],
  },
  {
    path: 'other',
    element: <div>Another route <a href="./">Go back</a></div>,
    errorElement: <div>Oops route not found</div>,
  }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
