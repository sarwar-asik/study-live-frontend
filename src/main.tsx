import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes'

import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthProvider'
import { VideoProvider } from './context/VideoProvider'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ChatProvider } from './context/ChatContext'
import { AudioProvider } from './context/AudioProvider'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>

    <Provider store={store}>
      <AuthProvider>
        <ChatProvider>
          <VideoProvider>
           <AudioProvider>
              <RouterProvider router={router} />
              <Toaster />
           </AudioProvider>
          </VideoProvider>
        </ChatProvider>
      </AuthProvider>
    </Provider>

  </React.StrictMode>,
)
