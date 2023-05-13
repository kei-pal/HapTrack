import { Button } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const PageButtons = () => {
  const location = useLocation();
  const showHabitsButtons = location.pathname === '/habits';
  
  return (
    <div>
      {showHabitsButtons && (
        <Button>
          <AddIcon/>
        </Button>
      )}
    </div>
  )
}

export default PageButtons