import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import React from 'react'

export const Layout = () => {
  return (
    <>
    <TopBar/>
    <Outlet />
    </>
  )
}
