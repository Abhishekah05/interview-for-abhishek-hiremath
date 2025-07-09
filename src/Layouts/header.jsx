import React from 'react';
import { AppBar, Toolbar, Box, useMediaQuery, useTheme } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'center',
        px: isMobile ? 1 : 3,
        py: isMobile ? 1 : 2
      }}>
        <Box
          component="img"
          src="spacex-logo.png"
          alt="SpaceX Logo"
          sx={{
            height: isMobile ? '30px' : '40px',
            width: 'auto',
            maxWidth: isMobile ? '200px' : '250px',
            objectFit: 'contain'
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;