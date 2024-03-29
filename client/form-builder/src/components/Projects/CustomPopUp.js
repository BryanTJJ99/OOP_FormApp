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
import AddCircleIcon from '@mui/icons-material/AddCircle';
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

        <Button backgroundColor='primary' variant='contained' size='small' onClick={handleClickOpen}>
            <AddCircleIcon/>
            <Typography sx={{fontSize:"14px", m:1}}>
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
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
       <FormBuilder popup={true} handleClose={handleClose}></FormBuilder>
      </Dialog>
    </div>
  );
}
