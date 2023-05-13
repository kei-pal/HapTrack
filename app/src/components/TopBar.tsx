import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SideDrawerButton from './SideDrawerButton';

interface Props {
  toggleSideDrawer: () => void;
}

const TopBar: React.FC<Props> = ({ toggleSideDrawer }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HapTrack
          </Typography>
          <SideDrawerButton toggleSideDrawer={toggleSideDrawer} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;