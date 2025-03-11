import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './App.jsx'

import {BrowserRouter} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
  </React.StrictMode>,
)
