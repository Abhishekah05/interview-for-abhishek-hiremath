import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlightIcon from '@mui/icons-material/Flight';
import LaunchIcon from '@mui/icons-material/Launch';

import StatusChip from './statuschip';
import { formatDate } from '../Util/util';

const LaunchCard = ({ launch, onClick }) => {
  return (
    <Card
      onClick={() => onClick(launch)}
      sx={{
        mb: 2,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1
          }}
        >
          <Typography variant="h6" component="h3">
            {launch.name}
          </Typography>
          <StatusChip launch={launch} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={detailStyle}>
            <CalendarTodayIcon fontSize="small" />
            <span>{formatDate(launch.date)}</span>
          </Box>
          <Box sx={detailStyle}>
            <LocationOnIcon fontSize="small" />
            <span>{launch.launchSite}</span>
          </Box>
          <Box sx={detailStyle}>
            <FlightIcon fontSize="small" />
            <span>{launch.rocket}</span>
          </Box>
          <Box sx={detailStyle}>
            <LaunchIcon fontSize="small" />
            <span>{launch.orbit}</span>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Reusable style
const detailStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontSize: '0.9rem',
  color: '#666'
};

export default LaunchCard;
