import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AddIcon from '@mui/icons-material/Add';
import FormBuilder from '../../pages/formBuilder';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function FullScreenDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // add to list
    addForm({"id":"NOTHING", "name":"TEST"})


  };

  const addForm = (form) => {
    props.handleProjectDataChange('selectedForm', form)

  }

  return (
    <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
            Open full-screen dialog
        </Button> */}

        <Button style={{ backgroundColor: '#A5DEB8', height:50, width:250 }} onClick={handleClickOpen}>
            <Typography variant="h10" style={{ fontFamily: 'Arial', color:'black' }}>
            <AddIcon></AddIcon>
            Create Custom Form
            </Typography>
        </Button>


      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Custom Form
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
       <FormBuilder></FormBuilder>
      </Dialog>
    </div>
  );
}
