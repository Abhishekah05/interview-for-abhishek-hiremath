import React from 'react';
import { Container, Box, useMediaQuery, useTheme } from '@mui/material';
import Header from './header';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'white',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          mt: isMobile ? 2 : 3,
          mb: isMobile ? 2 : 3,
          px: isMobile ? 1 : 3,
          width: '100%',
          maxWidth: '100%'
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;