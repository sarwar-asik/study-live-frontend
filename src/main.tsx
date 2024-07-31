import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes'
import { SocketProvider } from './context/SocketProvider'
import { Toaster } from 'react-hot-toast'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <Toaster />
      <RouterProvider router={router} />

    </SocketProvider>

  </React.StrictMode>,
)
