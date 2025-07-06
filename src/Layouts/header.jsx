import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography
          variant="h6"
          sx={{
            color: '#1976d2',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            letterSpacing: '0.1em',
          }}
        >
          SPACEX
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;