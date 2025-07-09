import React from 'react';
import { 
  Box, 
  Typography, 
  Divider 
} from '@mui/material';
import StatusChip from './statuschip';
import { formatDate } from '../Util/util';

const LaunchList = ({ launches, isMobile }) => {
  return (
    <Box sx={{ mt: 3 }}>
      {launches.map((launch) => (
        <Box key={launch.id} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {launch.name}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 0 : 2,
            mt: 1
          }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {formatDate(launch.date_utc)}
            </Typography>
            
            <Typography variant="body2" sx={{ color: '#666' }}>
              {launch.launchpad?.name || 'Unknown location'}
            </Typography>
            
            <Typography variant="body2" sx={{ color: '#666' }}>
              {launch.rocket?.name || 'Unknown rocket'}
            </Typography>
            
            <StatusChip launch={launch} />
          </Box>
          
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default LaunchList;