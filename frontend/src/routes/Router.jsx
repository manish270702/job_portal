import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import CreateTask from '../components/CreateTask'
const Lazylogin = lazy(() => import('../components/Login'))
const Lazyhome = lazy(() => import('../components/Home'))
const LazyCreateTask = lazy(() => import('../components/CreateTask'))
const LazyProfile = lazy(() => import('../pages/Profile'))
const LazyEditProfile = lazy(() => import('../pages/EditProfile'))

function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Lazylogin />} />
      <Route path="/createJob" element={<LazyCreateTask />} />
      <Route path="/home" element={<Lazyhome />} />
      <Route path="/profile" element={<LazyProfile />} />
      <Route path="/edit-profile" element={<LazyEditProfile />} />

    </Routes>
  )
}

export default Router