import React from 'react';
import { Container, Box } from '@mui/material';
import Header from './header';

const Layout = ({ children }) => {
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
          mt: 3,
          mb: 3,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;