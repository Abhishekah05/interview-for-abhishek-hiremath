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

  if (!launch) return null;

  const getStatusColor = () => {
    if (launch.upcoming) return '#ff9800';
    return launch.success ? '#4caf50' : '#f44336';
  };

  const getStatusText = () => {
    if (launch.upcoming) return 'Upcoming';
    return launch.success ? 'Success' : 'Failed';
  };

  const getPayloadType = () => {
    if (launch.payloadObjects?.length > 0) {
      const types = launch.payloadObjects
        .map(payload => payload.type)
        .filter(Boolean)
        .filter((type, i, arr) => arr.indexOf(type) === i);
      return types.join(', ') || 'Unknown';
    }
    return launch.payloads?.[0]?.type || 'Unknown';
  };

  const getOrbitInfo = () => {
    if (launch.payloadObjects?.length > 0) {
      const orbits = launch.payloadObjects
        .map(payload => payload.orbit)
        .filter(Boolean)
        .filter((orbit, i, arr) => arr.indexOf(orbit) === i);
      return orbits.join(', ') || 'Unknown';
    }
    return launch.payloads?.[0]?.orbit || 'Unknown';
  };

  const getPayloadMass = () => {
    if (launch.payloadObjects?.length > 0) {
      const totalMass = launch.payloadObjects.reduce((sum, payload) => sum + (payload.mass_kg || 0), 0);
      return totalMass > 0 ? `${totalMass.toLocaleString()} kg` : 'Unknown';
    }
    return 'Unknown';
  };

  // Responsive styles
  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: isMobile ? 1 : 1.2,
    px: 0,
    borderBottom: '1px solid #e0e0e0',
    minHeight: isMobile ? '36px' : '40px'
  };

  const labelStyle = {
    fontWeight: 400,
    color: '#666',
    fontSize: isMobile ? '13px' : '14px',
    fontFamily: 'inherit',
    flex: isMobile ? '0 0 120px' : '0 0 140px' // Fixed width for labels
  };

  const valueStyle = {
    fontWeight: 500,
    color: '#333',
    fontSize: isMobile ? '13px' : '14px',
    fontFamily: 'inherit',
    textAlign: 'right',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 8,
          maxHeight: isMobile ? '100vh' : '85vh',
          height: isMobile ? '100vh' : 'auto',
          width: isMobile ? '100%' : '500px',
          maxWidth: isMobile ? '100%' : '500px'
        }
      }}
    >
      {/* Header Section */}
      <DialogTitle sx={{ p: 0 }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          sx={{ 
            px: isMobile ? 2 : 3, 
            py: isMobile ? 1.5 : 2.5,
            backgroundColor: '#fff',
            position: isMobile ? 'sticky' : 'static',
            top: 0,
            zIndex: 1,
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
            <Avatar 
              src={launch.links?.patch?.small}
              sx={{ 
                width: isMobile ? 40 : 48, 
                height: isMobile ? 40 : 48,
                backgroundColor: '#f0f0f0',
                border: '1px solid #e0e0e0'
              }}
            >
              {!launch.links?.patch?.small && launch.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ 
                fontFamily: 'inherit', 
                fontWeight: 600,
                fontSize: isMobile ? '18px' : '20px',
                color: '#333',
                mb: 0.5,
                lineHeight: 1.2
              }}>
                {launch.name}
              </Typography>
              <Chip
                label={getStatusText().toUpperCase()}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(),
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 600,
                  height: '20px',
                  '& .MuiChip-label': {
                    px: 1
                  }
                }}
              />
            </Box>
          </Box>
          <IconButton 
            onClick={onClose} 
            size="small"
            sx={{
              position: isMobile ? 'absolute' : 'relative',
              right: isMobile ? 8 : 0,
              top: isMobile ? 8 : 0
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Content Section */}
      <DialogContent sx={{ 
        p: 0,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: '3px'
        }
      }}>
        {/* Mission Description */}
        {launch.details && (
          <Box sx={{ 
            px: isMobile ? 2 : 3, 
            py: isMobile ? 1.5 : 2,
            backgroundColor: '#f8f9fa',
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
            <Typography sx={valueStyle}>{launch.flight_number || 'Unknown'}</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Mission Name</Typography>
            <Typography sx={valueStyle}>{launch.name || 'Unknown'}</Typography>
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
            <Typography sx={valueStyle}>
              {launch.date_utc ? formatDate(launch.date_utc, isMobile) : 'Unknown'}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Payload Type</Typography>
            <Typography sx={valueStyle}>{getPayloadType()}</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Orbit</Typography>
            <Typography sx={valueStyle}>{getOrbitInfo()}</Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography sx={labelStyle}>Payload Mass</Typography>
            <Typography sx={valueStyle}>{getPayloadMass()}</Typography>
          </Box>

          <Box sx={{ ...detailRowStyle, borderBottom: 'none' }}>
            <Typography sx={labelStyle}>Launch Site</Typography>
            <Typography sx={valueStyle}>
              {launch.launchpad?.full_name || launch.launchpad?.name || 'Unknown'}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {/* Mobile Footer */}
      {isMobile && (
        <DialogActions sx={{ 
          p: 2, 
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fff',
          position: 'sticky',
          bottom: 0,
          zIndex: 1
        }}>
          <Button 
            onClick={onClose} 
            color="primary" 
            variant="contained"
            sx={{ 
              fontFamily: 'inherit',
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: '6px',
              py: 1
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