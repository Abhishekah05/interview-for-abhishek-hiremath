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
    sx.backgroundColor = '#FFA500';
  } else if (launch.success) {
    label = 'Success';
    sx.backgroundColor = '#28A745';
  } else if (launch.success === false) {
    label = 'Failed';
    sx.backgroundColor = '#DC3545';
  } else {
    label = 'Unknown';
    sx.backgroundColor = '#6c757d';
  }

  return <Chip label={label} sx={sx} size="small" />;
};
export default StatusChip;