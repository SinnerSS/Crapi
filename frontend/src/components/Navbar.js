import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

const buttonTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          position: 'relative',
          marginLeft: '30px',
          textTransform: 'none',
          fontSize: '30px',
          fontWeight: 300,
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '0%',
            height: '3px',
            bottom: '0',
            left: '50%',
            backgroundColor: '#FFFFFF',
            transform: 'translate(-50%)',
            transition: 'width .3s ease-in-out',
          },
          '&:hover::after': {
            width: '100%',
          },  
        },
      },
    },
  },
 });

function NavBar() {
  return (
    <AppBar position="static"  sx={{ backgroundColor: '#003B6E' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={Logo} alt='Logo' style={{ height: '40px' }} />
          <ThemeProvider theme={buttonTheme}>
            <Button component={Link} to="/" color="inherit">
              Converter
            </Button>
            <Button component={Link} to="/trend" color="inherit">
              Trend
            </Button>
            <Button component={Link} to="/trade" color="inherit">
              Trade
            </Button>
          </ThemeProvider>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
