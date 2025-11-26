import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';


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
        <Box
          component="img"
          src="spacex-logo.png"
          alt="SpaceX Logo"
          sx={{
            height: '40px',
            width: 'auto',
            maxWidth: '250px',
            objectFit: 'contain',
            ml:9
                    }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;