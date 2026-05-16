import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
const Lazylogin = lazy(() => import('../components/Login'))
const Lazyhome = lazy(() => import('../components/Home'))

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Lazylogin />} />
      <Route path="/createJob" element={<Lazyhome />} />
    </Routes>
  )
}

export default Router