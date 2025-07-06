import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './Style/theme';
import SpaceXDashboard from './Dashboard/dashboardspace';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SpaceXDashboard />
    </ThemeProvider>
  );
}

export default App;