import React from 'react'
import './index.css'
import Navbar from './Components/Navbar.jsx'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Components/Home.jsx'
import Dashboard from './Components/Dashboard.jsx'
import Todos from './Components/Todos.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
      {
        path: '/dashboard/todos',
        element : <Todos />
      }
  
])
function App() {
  return (
    <RouterProvider router={Router} />
  )
}

export default App