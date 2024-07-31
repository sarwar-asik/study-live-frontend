import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes'
import { SocketProvider } from './context/SocketProvider'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <Toaster />
        <RouterProvider router={router} />


      </SocketProvider>
    </AuthProvider>

  </React.StrictMode>,
)
