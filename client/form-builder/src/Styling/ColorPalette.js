import { createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      light: '#88CBED',
      main: '#1F87BC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#BCBCBC',
      main: '#7F7F7F',
      contrastText: '#FFFFFF',

    },
    success: {
      light: '#A5DEB8',
      main: '#70C18C',
      contrastText: '#FFFFFF',
    },
    danger: {
      light: '#EBB4B4',
      main: '#EE7171',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#F6DEAF',
      main: '#F4CC7E',
    },
    info: {
      light: '#A7E8F1',
      main: '#57B9C6',
      contrastText: '#FFFFFF',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});


