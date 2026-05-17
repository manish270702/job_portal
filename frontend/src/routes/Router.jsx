import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import CreateTask from '../components/CreateTask'
const Lazylogin = lazy(() => import('../components/Login'))
const Lazyhome = lazy(() => import('../components/Home'))
const LazyCreateTask = lazy(() => import('../components/CreateTask'))

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Lazylogin />} />
      <Route path="/createJob" element={<LazyCreateTask />} />
      <Route path="/home" element={<Lazyhome />} />
    </Routes>
  )
}

export default Router