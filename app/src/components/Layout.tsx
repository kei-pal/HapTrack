import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import React from 'react'

export const Layout = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = React.useState<boolean>(false);

  const toggleSideDrawer = () => {
    setSideDrawerOpen(true);
  };

  return (
    <>
    <TopBar toggleSideDrawer={toggleSideDrawer}/>
    <Outlet />
    <p>sideDrawerOpen: {sideDrawerOpen.toString()}</p>
    </>
  )
}
