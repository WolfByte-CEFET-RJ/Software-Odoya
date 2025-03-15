import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"
import { ToastContainer } from 'react-toastify';

import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID} >
      
      <Routing/>
      </GoogleOAuthProvider>
    
      <ToastContainer position="top-center"
        hideProgressBar={false}
        pauseOnHover={false}
        progress={undefined}
        theme="light"
        autoClose={1650} 
        limit={1} 
        closeButton={false} 
        style={{width: "fit-content"}}
      />
    
    </BrowserRouter>
  </React.StrictMode>,
)
