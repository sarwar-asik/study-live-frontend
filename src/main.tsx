import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes'

import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthProvider'
import { RoomProvider } from './context/RoomProvider'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ChatProvider } from './context/ChatContext'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <Provider store={store}>
      <AuthProvider>
        <ChatProvider>
          <RoomProvider>
            <RouterProvider router={router} />
            <Toaster />
          </RoomProvider>
        </ChatProvider>
      </AuthProvider>
    </Provider>

  </React.StrictMode>,
)
