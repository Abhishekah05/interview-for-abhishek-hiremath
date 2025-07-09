import React from 'react';
import { Chip } from '@mui/material';

const StatusChip = ({ launch }) => {
  let label = '';
  let sx = {
    // fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: 'Inter, sans-serif',
  };

  if (launch.upcoming) {
    label = 'Upcoming';
    sx.backgroundColor = '#FEF3C7';
    sx.color = '#92400F';
  } else if (launch.success) {
    label = 'Success';
    sx.backgroundColor = '#DEF7EC';
    sx.color = '#03543F';
  } else {
    label = 'Failed';
    sx.backgroundColor = '#FDE2E1';
    sx.color = '#981B1C';
  }

  return <Chip label={label} sx={sx} size="small" />;
};

export default StatusChip;
