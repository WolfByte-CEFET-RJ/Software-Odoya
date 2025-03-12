import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './App.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google"
import {BrowserRouter} from 'react-router-dom'

const client_id = "adquirir id"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={client_id}>
        <Routing/>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
