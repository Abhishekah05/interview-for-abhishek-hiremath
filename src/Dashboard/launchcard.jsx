import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import StatusChip from './statuschip';
import { formatDate } from '../Util/util';
import CalendarToday from '@mui/icons-material/CalendarToday';
import LocationOn from '@mui/icons-material/LocationOn';
import Flight from '@mui/icons-material/Flight';
import Launch from '@mui/icons-material/Launch';

const LaunchCard = ({ launch, onClick }) => {
  // Helper function to get orbit information
  const getOrbitInfo = (launch) => {
    if (launch.payloadObjects && launch.payloadObjects.length > 0) {
      // Get the first payload's orbit, or combine multiple orbits
      const orbits = launch.payloadObjects
        .map(payload => payload.orbit)
        .filter(orbit => orbit && orbit !== 'unknown')
        .filter((orbit, index, self) => self.indexOf(orbit) === index); // Remove duplicates
      
      if (orbits.length > 0) {
        return orbits.join(', ');
      }
    }
    
    // Fallback to the original method if payloadObjects is not available
    if (launch.payloads && launch.payloads.length > 0) {
      const firstPayload = launch.payloads[0];
      if (typeof firstPayload === 'object' && firstPayload.orbit) {
        return firstPayload.orbit;
      }
    }
    
    return 'Unknown';
  };

  return (
    <Card 
      onClick={() => onClick(launch)}
      sx={{
        marginBottom: 2,
        cursor: 'pointer',
        fontFamily: 'Inter, sans-serif',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 1
        }}>
          <Typography 
            variant="h6" 
            component="h3"
            sx={{ fontFamily: 'Inter, sans-serif' }}
          >
            {launch.name}
          </Typography>
          <StatusChip launch={launch} />
        </Box>
        
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.9rem',
            color: '#666',
            fontFamily: 'Inter, sans-serif'
          }}>
            <CalendarToday fontSize="small" />
            <span>{formatDate(launch.date_utc)}</span>
          </Box>
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.9rem',
            color: '#666',
            fontFamily: 'Inter, sans-serif'
          }}>
            <LocationOn fontSize="small" />
            <span>{launch.launchpad?.name || 'Unknown'}</span>
          </Box>
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.9rem',
            color: '#666',
            fontFamily: 'Inter, sans-serif'
          }}>
            <Flight fontSize="small" />
            <span>{launch.rocket?.name || 'Unknown'}</span>
          </Box>
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontSize: '0.9rem',
            color: '#666',
            fontFamily: 'Inter, sans-serif'
          }}>
            <Launch fontSize="small" />
            <span>{getOrbitInfo(launch)}</span>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LaunchCard;