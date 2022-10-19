import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Root from '../routes/root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: (
      <div>
        Oops page not found <a href="./">Go back</a>
      </div>
    ),
    children: [
      {
        path: 'children', // Use <Outlet /> Component
        element: <h1>A route with an embed child</h1>,
      },
    ],
  },
  {
    path: 'other',
    element: (
      <div>
        Another route <a href="./">Go back</a>
      </div>
    ),
    errorElement: <div>Oops route not found</div>,
  },
])

const initialState = {
  value: 0,
  status: 'idle',
}
const mockStore = configureStore()
let store
const user = userEvent.setup()

test('full app rendering/navigating', async () => {
  store = mockStore(initialState)
  render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  )

  // verify page content for default route
  expect(screen.getByText(/Add Amount/i)).toBeInTheDocument()
  expect(
    screen.queryByText(/A route with an embed child/i)
  ).not.toBeInTheDocument()

  // verify page content for expected route after navigating
  await user.click(
    screen.getByRole('link', { name: "Route for embed children" })
  )
  await waitFor(() => {
    expect(screen.getByText(/A route with an embed child/i)).toBeInTheDocument()
  })
})

test('use another route', async () => {
  store = mockStore(initialState)

  render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  )

  // verify navigation to "Other" route
  await waitFor(() => {
    expect(screen.getByText(/Another route/i)).toBeInTheDocument()
  })
})

test('landing on a bad page', async () => {
  store = mockStore(initialState)

  render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  )

  // verify navigation to "Oops page not found" route
  await user.click(
    screen.getByRole('link', { name: 'Error Route' })
  )
  await waitFor(() => {
    expect(screen.getByText('Oops page not found')).toBeInTheDocument()
  })
  
})


