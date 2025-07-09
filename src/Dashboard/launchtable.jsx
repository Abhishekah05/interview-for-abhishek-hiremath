import React from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StatusChip from './statuschip';
import { formatDate } from '../Util/util';

const LaunchTable = ({ launches, onLaunchClick, currentPage, totalPages, onPageChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(null, page);
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: 'white', 
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <Typography variant="h4" sx={{ 
        fontWeight: 'bold', 
        mb: 1,
        px: isMobile ? 2 : 0
      }}>
        SPACEX
      </Typography>
      
      {/* Filter info */}
      <Typography variant="body1" sx={{ 
        color: '#666',
        mb: 3,
        px: isMobile ? 2 : 0
      }}>
        All time<br />
        All Launches
      </Typography>
      
      <Divider sx={{ my: 2 }} />

      {/* Launches list */}
      <Box sx={{ mb: 4 }}>
        {launches.map((launch) => (
          <Box key={launch.id} sx={{ mb: 3, px: isMobile ? 2 : 0 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              mb: 1
            }}>
              {launch.name}
            </Typography>
            
            <Typography variant="body2" sx={{ 
              color: '#666',
              mb: 0.5
            }}>
              • {formatDate(launch.date_utc)}
            </Typography>
            
            <Typography variant="body2" sx={{ 
              color: '#666',
              mb: 0.5
            }}>
              • {launch.launchpad?.name || 'Unknown location'}
            </Typography>
            
            <Typography variant="body2" sx={{ 
              color: '#666',
              mb: 0.5
            }}>
              • {launch.rocket?.name || 'Unknown rocket'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ 
                color: '#666',
                mr: 1
              }}>
                •
              </Typography>
              <StatusChip launch={launch} />
            </Box>
            
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        mt: 3,
        px: isMobile ? 2 : 0
      }}>
        <IconButton 
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
          size="small"
          sx={{ mx: 1 }}
        >
          <ChevronLeftIcon />
        </IconButton>
        
        <Typography variant="body2" sx={{ mx: 1 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        
        <IconButton 
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
          size="small"
          sx={{ mx: 1 }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default LaunchTable;