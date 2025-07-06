import React from 'react';
import { Chip } from '@mui/material';

const StatusChip = ({ launch }) => {
  let label = '';
  let sx = {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: 'white',
    fontFamily: 'inherit'
  };

  if (launch.upcoming) {
    label = 'Upcoming';
    sx.backgroundColor = '#FFA500'; // orange
  } else if (launch.success) {
    label = 'Success';
    sx.backgroundColor = '#28A745'; // green
  } else {
    label = 'Failed';
    sx.backgroundColor = '#DC3545'; // red
  }

  return <Chip label={label} sx={sx} size="small" />;
};

export default StatusChip;