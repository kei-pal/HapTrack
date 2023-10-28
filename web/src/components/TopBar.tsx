import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideDrawerButton from './SideDrawerButton';
import PageButtons from './PageButtons';



const TopBar: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HapTrack
          </Typography>
          <PageButtons/>
          <SideDrawerButton/>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;