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
  Avatar,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../Util/util';

const LaunchModal = ({ open, launch, onClose }) => {
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

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    py: 1,
    px: 0,
    borderBottom: '1px solid #e0e0e0',
    minHeight: '36px'
  };

  const labelStyle = {
    fontWeight: 400,
    color: '#666',
    fontSize: '13px',
    fontFamily: 'inherit',
    flex: '0 0 110px',
    paddingTop: '2px'
  };

  const valueStyle = {
    fontWeight: 500,
    color: '#333',
    fontSize: '13px',
    fontFamily: 'inherit',
    textAlign: 'right',
    flex: 1,
    wordBreak: 'break-word',
    lineHeight: 1.4
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0, // Changed from 12 to 0 for square corners
          width: '90vw',
          maxWidth: '400px',
          maxHeight: '85vh',
          margin: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }
      }}
      sx={{
        '& .MuiDialog-container': {
          alignItems: 'center',
          justifyContent: 'center'
        }
      }}
    >
      {/* Header Section */}
      <DialogTitle sx={{ 
        p: 0,
        flexShrink: 0,
        position: 'relative'
      }}>
        {/* Close Button - Top Right */}
        <IconButton 
          onClick={onClose} 
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 10,
            width: 32,
            height: 32,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Box 
          display="flex" 
          alignItems="center"
          sx={{ 
            px: 3, 
            py: 2.5,
            backgroundColor: '#fff',
            borderBottom: '1px solid #e0e0e0',
            pr: 6  // Add right padding for close button
          }}
        >
          <Box display="flex" alignItems="center" gap={2} sx={{ flex: 1, minWidth: 0 }}>
            <Avatar 
              src={launch.links?.patch?.small}
              sx={{ 
                width: 44, 
                height: 44,
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
                fontSize: '18px',
                color: '#333',
                mb: 0.5,
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {launch.name}
              </Typography>
              <Chip
                label={getStatusText().toUpperCase()}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(),
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 600,
                  height: '20px',
                  '& .MuiChip-label': {
                    px: 1
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogTitle>

      {/* Content Section */}
      <DialogContent sx={{ 
        p: 0,
        flex: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        '&::-webkit-scrollbar': {
          width: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#ccc',
          borderRadius: '2px'
        }
      }}>
        {/* Mission Description */}
        {launch.details && (
          <Box sx={{ 
            px: 3, 
            py: 2,
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            flexShrink: 0
          }}>
            <Typography variant="body2" sx={{ 
              fontFamily: 'inherit', 
              lineHeight: 1.5,
              color: '#555',
              fontSize: '13px',
              mb: launch.links?.wikipedia ? 1 : 0
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
                  fontSize: '13px',
                  fontWeight: 500,
                  display: 'inline-block',
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
          px: 3,
          py: 2,
          flex: 1
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
              {launch.date_utc ? formatDate(launch.date_utc, true) : 'Unknown'}
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

      {/* Footer */}
      <DialogActions sx={{ 
        p: 2, 
        borderTop: '1px solid #e0e0e0',
        backgroundColor: '#fff',
        flexShrink: 0
      }}>
        <Button 
          onClick={onClose} 
          color="primary" 
          variant="contained"
          sx={{ 
            fontFamily: 'inherit',
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '8px',
            py: 1.2,
            fontSize: '14px'
          }}
          fullWidth
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LaunchModal;