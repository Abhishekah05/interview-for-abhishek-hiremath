import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const EmptyState = ({ title, subtitle }) => {
  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh', pb: 4 }}>
      <Paper
        sx={{
          textAlign: 'center',
          p: 4,
          color: '#666',
          backgroundColor: 'white',
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          borderRadius: 1
        }}
      >
        <Typography variant="h6" gutterBottom>
          {title || 'No results found for the specified filter'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle || 'Try adjusting your filter criteria'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default EmptyState;