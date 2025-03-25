import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const client_id = "adquirir id"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={client_id}>
        <Routing/>
      </GoogleOAuthProvider>
      <ToastContainer position="top-center"
        hideProgressBar={false}
        pauseOnHover={false}
        progress={undefined}
        theme="light"
//        autoClose={2000} 
        limit={1} 
        closeButton={false} 
        style={{width: "fit-content"}}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
