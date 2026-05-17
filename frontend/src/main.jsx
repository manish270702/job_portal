import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Router'

import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Router />
    <ToastContainer position="top-right" />
  </BrowserRouter>,
)
