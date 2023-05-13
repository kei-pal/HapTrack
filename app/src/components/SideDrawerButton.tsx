import { Button } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  toggleSideDrawer: () => void;
}

const SideDrawerButton: React.FC<Props> = ({ toggleSideDrawer }) => {
  return (
    <Button onClick={toggleSideDrawer}>
      <MenuIcon />
    </Button>
  )
}

export default SideDrawerButton;