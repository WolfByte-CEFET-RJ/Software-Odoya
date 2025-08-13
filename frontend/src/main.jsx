import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"
import { ToastContainer } from 'react-toastify';

import {BrowserRouter} from 'react-router-dom'

import UserContext from './components/Context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContext>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENTID} >
      
      <Routing/>
      </GoogleOAuthProvider>
    </UserContext>
    
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
