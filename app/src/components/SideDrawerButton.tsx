import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


export default function TemporaryDrawer() {
  const [state, setState] = React.useState<boolean>(false);

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setState(open);
    };
    
  const topItems = [
    {
      name: 'Inbox',
      link: '/inbox',
      icon: <InboxIcon />,
    },
    {
      name: 'Today',
      link: '/today',
      icon: <MailIcon />,
    },
    {
      name: 'This Week',
      link: '/this-week',
      icon: <InboxIcon />,
    },
    {
      name: 'Filters',
      link: '/filters',
      icon: <MailIcon />,
    },
  ];

  const bottomItems = [
    {
      name: 'To Do',
      link: '/to-do',
      icon: <InboxIcon />,
    },
    {
      name: 'Goals',
      link: '/goals',
      icon: <MailIcon />,
    },
    {
      name: 'Habits',
      link: '/habits',
      icon: <InboxIcon />,
    }
  ];

  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ListItemButton component={Link} to='/'>
        <ListItemIcon><MailIcon /></ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItemButton>
      <Divider />
      <List>
        {topItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottomItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon/>
      </Button>
      <Drawer
        anchor='right'
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}