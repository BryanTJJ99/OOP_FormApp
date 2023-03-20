import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import CottageIcon from '@mui/icons-material/Cottage';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import DescriptionIcon from '@mui/icons-material/Description';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Link } from 'react-router-dom';
// sample code from mui 
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("Home")
  const pages = ['Dashboard','Project', 'Form Templates','Account Management',]
  const widgets = ['Account','Logout']
  const iconsPrimary = [<DashboardIcon/>,<LibraryAddIcon/>,<SpeakerNotesIcon/>,<DescriptionIcon/>,<ManageAccountsIcon/>]
  const iconsSecondary = [
    <AccountCircleIcon/>,
    <LogoutIcon/>,
  ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Appbar to be present in all pages */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {page}
          </Typography>
        </Toolbar>
      </AppBar>
      {/* drawer component to replace the navbar component eventually */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {pages.map((text, index) => (
            <ListItem 
              key={text} 
              disablePadding sx={{ display: 'block' }}
              onClick={() => setPage(text)}
            >
            <Link to={`/${text.replace(/\s/g,'')}`} style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {iconsPrimary[index]}
                  </ListItemIcon>
                  <ListItemText secondary={text} disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {widgets.map((text, index) => (
            <ListItem 
              key={text} 
              disablePadding 
              sx={{ display: 'block' }}
              onClick={()=>setPage(text)}
            >
            <Link to={`/${text}`} style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {iconsSecondary[index]}
                </ListItemIcon>
                <ListItemText secondary={text} disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
              </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* box component here is supposed to store the page content to be displayed via routing */}
      <Box component="main" sx={{ flexGrow: 1, my: '40px', }}>
        {/* <DrawerHeader /> */}
        {children}
      </Box>
    </Box>
  );
}