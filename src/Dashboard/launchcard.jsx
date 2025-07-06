import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import CalendarToday from '@mui/icons-material/CalendarToday';
import LocationOn from '@mui/icons-material/LocationOn';
import Flight from '@mui/icons-material/Flight';
import Launch from '@mui/icons-material/Launch';
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
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="h6">{launch.name}</Typography>
          <StatusChip launch={launch} />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666', fontSize: '0.9rem' }}>
            <CalendarToday fontSize="small" />
            <span>{formatDate(launch.date_utc)}</span>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666', fontSize: '0.9rem' }}>
            <LocationOn fontSize="small" />
            <span>{launch.launchpad?.name || 'Unknown'}</span>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666', fontSize: '0.9rem' }}>
            <Flight fontSize="small" />
            <span>{launch.rocket?.name || 'Unknown'}</span>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#666', fontSize: '0.9rem' }}>
            <Launch fontSize="small" />
            <span>{launch.payloads?.[0]?.orbit || 'Unknown'}</span>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LaunchCard;
