import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import  AuthProvider  from './Components/Context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    <App />
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
