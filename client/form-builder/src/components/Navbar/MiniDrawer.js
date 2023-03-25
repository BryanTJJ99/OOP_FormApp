import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import DescriptionIcon from '@mui/icons-material/Description';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventBus from "../../common/EventBus";
import AuthService from "../../services/AuthService";
import SettingsIcon from '@mui/icons-material/Settings';


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

  const [page, setPage] = React.useState("OOP Form Builder")
  // const pages = ['Dashboard','Project', 'Form Templates','Account Management',]
  // const widgets = ['Account','Logout']
  // const iconsPrimary = [<DashboardIcon/>,<LibraryAddIcon/>,<DescriptionIcon/>,<ManageAccountsIcon/>]
  // const iconsSecondary = [
  //   <AccountCircleIcon/>,
  //   <LogoutIcon/>,
  // ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // auth code
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showDashBoard, setShowDashBoard] = useState(false);
  const [showAccountManagement, setShowAccountManagement] = useState(false);
  const [showFormResponses, setShowFormResponses] = useState(false);
  const [showFormTemplates, setShowFormTemplates] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showVendorProfilePage, setShowVendorProfilePage] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);

  useEffect(() => {
    // retrieving user authentication data from backend
    const user = AuthService.getCurrentUser();

    if (user) {
        setCurrentUser(user);

        // checks for and displays if either values satisfies using.some() method
        setShowSettingsPage(["ROLE_VENDOR","ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
        setShowDashBoard(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
        setShowAccountManagement(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
        setShowFormResponses(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
        setShowFormTemplates(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
        setShowProject(["ROLE_ADMIN", "ROLE_APPROVER"].some(role => user.roles.includes(role)));
        setShowVendorProfilePage(user.roles.includes("ROLE_VENDOR"));
    }  
    EventBus.on("logout", () => {
        logOut();
    });

    return () => {
        EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowDashBoard(false);
    setShowAccountManagement(false);
    setShowFormResponses(false);
    setShowFormTemplates(false);
    setShowProject(false);
    setShowVendorProfilePage(false);
    setCurrentUser(undefined);
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
      { currentUser &&
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {pages.map((text, index) => (
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
                  <Tooltip title={text} placement="right-start">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {iconsPrimary[index]}
                  </ListItemIcon>
                  </Tooltip>
                  <ListItemText secondary={text} disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))} */}
          { showDashBoard && <ListItem key="Dashboard" disabledPadding sx={{display:'block'}} onClick={() => setPage("Dashboard")} >
            <Link to='/Dashboard' style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
              <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                  <ListItemIcon sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText secondary="Dashboard" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
            </Link>
          </ListItem>}
          {showProject && <ListItem key="Project" disabledPadding sx={{display:'block'}} onClick={() => setPage("Project")} >
            <Link to='/Project' style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
              <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                  <ListItemIcon sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                  <LibraryAddIcon/>
                  </ListItemIcon>
                  <ListItemText secondary="Project" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
            </Link>
          </ListItem>}
          { showFormResponses && <ListItem key="FormResponses" disabledPadding sx={{display:'block'}} onClick={() => setPage("FormResponses")} >
            <Link to='/FormResponses' style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
              <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                  <ListItemIcon sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                    <SpeakerNotesIcon/>
                  </ListItemIcon>
                  <ListItemText secondary="FormResponses" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
            </Link>
          </ListItem>}
          { showFormTemplates && <ListItem key="FormTemplates" disabledPadding sx={{display:'block'}} onClick={() => setPage("FormTemplates")} >
            <Link to='/FormTemplates' style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
              <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                  <ListItemIcon sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                    <DescriptionIcon/>
                  </ListItemIcon>
                  <ListItemText secondary="FormTemplates" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
            </Link>
          </ListItem>}
          { showAccountManagement && <ListItem key="AccountManagement" disabledPadding sx={{display:'block'}} onClick={() => setPage("AccountManagement")} >
            <Link to='/AccountManagement' style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
              <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                  <ListItemIcon sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                    <PeopleAltIcon/>
                  </ListItemIcon>
                  <ListItemText secondary="AccountManagement" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
            </Link>
          </ListItem>}
          { showVendorProfilePage && <ListItem key="VendorProfilePage" disabledPadding sx={{display:'block'}} onClick={() => setPage("VendorProfilePage")} >
            <Link to='/VendorProfilePage' style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
              <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                  <ListItemIcon sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                    <AccountCircleIcon/>
                  </ListItemIcon>
                  <ListItemText secondary="VendorProfilePage" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
            </Link>
            </ListItem>}
        </List>
        <Divider />
        <List>
          {/* {widgets.map((text, index) => (
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
          ))} */}
            

          {/* if currentUser, redirect user back to root login page when user clicks logout button
          else, if not currentUser then direct user to login landing page */}

            {/* {currentUser ? (
              <ListItem key="Logout" disabledPadding sx={{ display: 'block' }}
                onClick={() => {
                  logOut()
                  setPage("Logout")
                }}
              >
                <Link to='/' style={{ textDecoration: "none", textTransform: "lowercase", color: "#636466" }}>
                  <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText secondary="Logout" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize: 16 }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )
              : (
                <ListItem key="Login" disabledPadding sx={{ display: 'block' }}
                  onClick={() => setPage("Login")}
                >
                  <Link to='/' style={{ textDecoration: "none", textTransform: "lowercase", color: "#636466" }}>
                    <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                        <LoginOutlined />
                      </ListItemIcon>
                      <ListItemText secondary="Login" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize: 16 }} />
                    </ListItemButton>
                  </Link>
                </ListItem>
              )          
          } */}
            

            {/* ListItem for Settings page */}
          {showSettingsPage && <ListItem key="Settings" disabledPadding sx={{ display: 'block' }} onClick={() => setPage("Settings")} >
            <Link to='/Settings' style={{ textDecoration: "none", textTransform: "lowercase", color: "#636466" }}>
              <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText secondary="Settings" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize: 16 }} />
              </ListItemButton>
            </Link>
            </ListItem>}

          <ListItem key="Logout" disabledPadding sx={{display:'block'}} 
            onClick={() => {
              logOut()
              setPage("Logout")
            }}
            >
            <Link to='/' style={{textDecoration:"none",textTransform:"lowercase",color:"#636466"}}>
              <ListItemButton sx={{minHeight: 48,justifyContent: open ? 'initial' : 'center',px: 2.5,}}>
                  <ListItemIcon sx={{minWidth: 0,mr: open ? 3 : 'auto',justifyContent: 'center',}}>
                    <LogoutIcon/>
                  </ListItemIcon>
                  <ListItemText secondary="Logout" disableTypography={true} sx={{ opacity: open ? 1 : 0, fontSize:16 }} />
                </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>}
      {/* box component here is supposed to store the page content to be displayed via routing */}
      <Box component="main" sx={{ flexGrow: 1, my: '40px', }}>
        {/* <DrawerHeader /> */}
        {children}
      </Box>
    </Box>
  );
}