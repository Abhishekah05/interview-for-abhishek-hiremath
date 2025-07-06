import React from 'react';
import { Paper, Typography } from '@mui/material';

const EmptyState = ({ title, subtitle }) => {
  return (
    <Paper
      sx={{
        textAlign: 'center',
        p: 4,
        color: '#666'
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title || 'No results found for the specified filter'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle || 'Try adjusting your filter criteria'}
      </Typography>
    </Paper>
  );
};

export default EmptyState;
