import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../Util/util';

const LaunchModal = ({ open, launch, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  if (!launch) return null;

  const getStatusColor = () => {
    if (launch.upcoming) return '#ff9800';
    return launch.success ? '#4caf50' : '#f44336';
  };

  const getStatusText = () => {
    if (launch.upcoming) return 'Upcoming';
    return launch.success ? 'Success' : 'Failed';
  };

  // Helper function to get payload type information
  const getPayloadType = () => {
    if (launch.payloadObjects && launch.payloadObjects.length > 0) {
      const types = launch.payloadObjects
        .map(payload => payload.type)
        .filter(type => type && type !== 'unknown')
        .filter((type, index, self) => self.indexOf(type) === index); // Remove duplicates
      
      if (types.length > 0) {
        return types.join(', ');
      }
    }
    
    // Fallback to original structure
    if (launch.payloads && launch.payloads.length > 0) {
      const firstPayload = launch.payloads[0];
      if (typeof firstPayload === 'object' && firstPayload.type) {
        return firstPayload.type;
      }
    }
    
    return 'Unknown';
  };

  // Helper function to get orbit information
  const getOrbitInfo = () => {
    if (launch.payloadObjects && launch.payloadObjects.length > 0) {
      const orbits = launch.payloadObjects
        .map(payload => payload.orbit)
        .filter(orbit => orbit && orbit !== 'unknown')
        .filter((orbit, index, self) => self.indexOf(orbit) === index); // Remove duplicates
      
      if (orbits.length > 0) {
        return orbits.join(', ');
      }
    }
    
    // Fallback to original structure
    if (launch.payloads && launch.payloads.length > 0) {
      const firstPayload = launch.payloads[0];
      if (typeof firstPayload === 'object' && firstPayload.orbit) {
        return firstPayload.orbit;
      }
    }
    
    return 'Unknown';
  };

  // Helper function to get payload mass
  const getPayloadMass = () => {
    if (launch.payloadObjects && launch.payloadObjects.length > 0) {
      const totalMass = launch.payloadObjects.reduce((sum, payload) => {
        return sum + (payload.mass_kg || 0);
      }, 0);
      
      if (totalMass > 0) {
        return `${totalMass.toLocaleString()} kg`;
      }
    }
    
    return 'Unknown';
  };

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: isMobile ? 'flex-start' : 'center',
    flexDirection: isMobile ? 'column' : 'row',
    py: isMobile ? 1.5 : 1.2,
    px: 0,
    borderBottom: '1px solid #e0e0e0',
    minHeight: isMobile ? '60px' : '40px',
    gap: isMobile ? 0.5 : 0
  };

  const labelStyle = {
    fontWeight: 500,
    color: '#666',
    fontSize: isMobile ? '13px' : '14px',
    fontFamily: 'inherit',
    width: isMobile ? '100%' : 'auto'
  };

  const valueStyle = {
    fontWeight: 500,
    color: '#333',
    fontSize: isMobile ? '14px' : '14px',
    fontFamily: 'inherit',
    textAlign: isMobile ? 'left' : 'right',
    width: isMobile ? '100%' : 'auto',
    wordBreak: 'break-word'
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={isMobile}
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 8,
          maxHeight: isMobile ? '100vh' : '90vh',
          height: isMobile ? '100vh' : 'auto',
          width: isMobile ? '100vw' : isTablet ? '90vw' : '500px',
          maxWidth: isMobile ? '100vw' : isTablet ? '90vw' : '500px',
          m: isMobile ? 0 : 'auto'
        }
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ 
            px: isMobile ? 2 : 3, 
            py: isMobile ? 1.5 : 2.5, 
            backgroundColor: '#fff'
          }}
        >
          <Box display="flex" alignItems="center" gap={isMobile ? 1.5 : 2} sx={{ flex: 1, minWidth: 0 }}>
            <Avatar 
              src={launch.links?.patch?.small || undefined}
              sx={{ 
                width: isMobile ? 40 : 48, 
                height: isMobile ? 40 : 48,
                backgroundColor: '#f0f0f0',
                border: '1px solid #e0e0e0',
                flexShrink: 0
              }}
            >
              {!launch.links?.patch?.small && launch.name?.charAt(0)}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="h6" sx={{ 
                fontFamily: 'inherit', 
                fontWeight: 600,
                fontSize: isMobile ? '16px' : '20px',
                color: '#333',
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                lineHeight: isMobile ? 1.3 : 1.2
              }}>
                {launch.name}
              </Typography>
              <Chip
                label={getStatusText().toUpperCase()}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(),
                  color: 'white',
                  fontSize: isMobile ? '10px' : '11px',
                  fontWeight: 600,
                  height: isMobile ? '18px' : '20px',
                  '& .MuiChip-label': {
                    px: 1
                  }
                }}
              />
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ ml: 1 }}>
            <CloseIcon fontSize={isMobile ? 'small' : 'medium'} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ 
        p: 0,
        overflow: 'auto',
        flex: 1
      }}>
        {/* Mission Description */}
        {launch.details && (
          <Box sx={{ 
            px: isMobile ? 2 : 3, 
            py: isMobile ? 1.5 : 2, 
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #e0e0e0',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <Typography variant="body2" sx={{ 
              fontFamily: 'inherit', 
              lineHeight: 1.5,
              color: '#555',
              fontSize: isMobile ? '13px' : '14px'
            }}>
              {launch.details}
            </Typography>
            {launch.links?.wikipedia && (
              <Typography 
                component="a" 
                href={launch.links.wikipedia} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{
                  color: '#1976d2',
                  textDecoration: 'none',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: 500,
                  display: 'inline-block',
                  mt: 1,
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Wikipedia
              </Typography>
            )}
          </Box>
        )}

        {/* Details Section */}
        <Box sx={{ 
          px: isMobile ? 2 : 3,
          py: isMobile ? 1.5 : 2
        }}>
          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Flight Number</Typography>
            <Typography sx={valueStyle}>{launch.flight_number}</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Mission Name</Typography>
            <Typography sx={valueStyle}>{launch.name}</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Rocket Type</Typography>
            <Typography sx={valueStyle}>{launch.rocket?.name || 'Unknown'}</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Rocket Name</Typography>
            <Typography sx={valueStyle}>{launch.rocket?.name || 'Unknown'}</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Manufacturer</Typography>
            <Typography sx={valueStyle}>SpaceX</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Nationality</Typography>
            <Typography sx={valueStyle}>United States</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Launch Date</Typography>
            <Typography sx={valueStyle}>{formatDate(launch.date_utc)}</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Payload Type</Typography>
            <Typography sx={valueStyle}>
              {getPayloadType()}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Orbit</Typography>
            <Typography sx={valueStyle}>
              {getOrbitInfo()}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Payload Mass</Typography>
            <Typography sx={valueStyle}>
              {getPayloadMass()}
            </Typography>
          </Box>

          <Box sx={{ ...detailRowStyle, borderBottom: 'none' }}>
            <Typography sx={labelStyle}>Launch Site</Typography>
            <Typography sx={valueStyle}>
              {launch.launchpad?.full_name || launch.launchpad?.name || 'Unknown'}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {isMobile && (
        <DialogActions sx={{ 
          p: 2, 
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fff'
        }}>
          <Button 
            onClick={onClose} 
            color="primary" 
            variant="contained"
            sx={{ 
              fontFamily: 'inherit',
              textTransform: 'none',
              fontWeight: 500
            }}
            fullWidth
          >
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default LaunchModal;