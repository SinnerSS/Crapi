import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../images/logo.png'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static"  sx={{ backgroundColor: '#003B6E' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src={Logo} alt='Logo' style={{ height: '40px' }} />
          <Button component={Link} to="/" color="inherit" style={{ marginLeft: '30px', textTransform: 'none', fontSize: '30px', fontWeight: 300}}>
            Converter
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
