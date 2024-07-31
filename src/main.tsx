import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes'

import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthProvider'
import { RoomProvider } from './context/RoomProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RoomProvider>
        <RouterProvider router={router} />
        <Toaster />
      </RoomProvider>
    </AuthProvider>

  </React.StrictMode>,
)
