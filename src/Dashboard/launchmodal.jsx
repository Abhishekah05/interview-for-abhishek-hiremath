import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import LinkIcon from '@mui/icons-material/Link';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { formatDate } from '../Util/util';

const LaunchModal = ({ open, launch, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!launch) return null;

  const detailRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    py: 1,
    borderBottom: '1px solid #f0f0f0',
  };

  const formatLaunchDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  };

  const getStatusChip = () => {
    if (launch.upcoming) {
      return <Chip label="Upcoming" size="small" sx={{ backgroundColor: '#ff9800', color: 'white', fontWeight: 'bold' }} />;
    } else if (launch.success) {
      return <Chip label="Success" size="small" sx={{ backgroundColor: '#4caf50', color: 'white', fontWeight: 'bold' }} />;
    } else {
      return <Chip label="Failed" size="small" sx={{ backgroundColor: '#f44336', color: 'white', fontWeight: 'bold' }} />;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: '500px',
        }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header Section */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              src={launch.links?.patch?.small}
              sx={{
                width: 60,
                height: 60,
                backgroundColor: '#1976d2',
                border: '2px solid #f0f0f0'
              }}
            >
              {launch.name?.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {launch.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getStatusChip()}
                <CheckIcon sx={{ color: '#4caf50', fontSize: 16 }} />
                <LinkIcon sx={{ color: '#757575', fontSize: 16 }} />
                <FileCopyIcon sx={{ color: '#757575', fontSize: 16 }} />
              </Box>
            </Box>
          </Box>

          {/* Description */}
          {launch.details && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 2, lineHeight: 1.6 }}
            >
              {launch.details}
              {launch.links?.wikipedia && (
                <Box component="span" sx={{ color: '#1976d2', ml: 1, cursor: 'pointer' }}>
                  Wikipedia
                </Box>
              )}
            </Typography>
          )}
        </Box>

        {/* Details Section */}
        <Box sx={{ px: 3, pb: 3 }}>
          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Flight Number
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {launch.flight_number}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Mission Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {launch.name}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Rocket Type
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {launch.rocket?.type || 'v1.0'}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Rocket Name
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {launch.rocket?.name || 'Falcon 9'}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Manufacturer
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              SpaceX
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Nationality
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              SpaceX
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Launch Date
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formatLaunchDate(launch.date_utc)}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Payload Type
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {launch.payloads?.[0]?.type || 'Dragon 1.0'}
            </Typography>
          </Box>

          <Box sx={detailRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Orbit
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {launch.payloads?.[0]?.orbit || 'ISS'}
            </Typography>
          </Box>

          <Box sx={{ ...detailRowStyle, borderBottom: 'none' }}>
            <Typography variant="body2" color="text.secondary">
              Launch Site
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {launch.launchpad?.name || 'CCAFS SLC 40'}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LaunchModal;