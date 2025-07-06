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
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FlightIcon from '@mui/icons-material/Flight';
import LaunchIcon from '@mui/icons-material/Launch';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';

import StatusChip from './statuschip';
import { formatDate } from '../Util/util';

const LaunchModal = ({ open, launch, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!launch) return null;

  const detailBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 2,
    p: 1,
    bgcolor: '#f9f9f9',
    borderRadius: 2,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>
            {launch.name} - <StatusChip launch={launch} />
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={detailBoxStyle}>
              <FlightIcon color="primary" />
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'inherit' }}>
                  Flight Number
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'inherit' }}>
                  {launch.flight_number}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={detailBoxStyle}>
              <LaunchIcon color="primary" />
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'inherit' }}>
                  Mission Name
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'inherit' }}>
                  {launch.name}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={detailBoxStyle}>
              <CalendarTodayIcon color="primary" />
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'inherit' }}>
                  Launch Date
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'inherit' }}>
                  {formatDate(launch.date_utc)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={detailBoxStyle}>
              <LocationOnIcon color="primary" />
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'inherit' }}>
                  Launch Site
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'inherit' }}>
                  {launch.launchpad?.full_name || 'Unknown'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={detailBoxStyle}>
              <FlightIcon color="primary" />
              <Box>
                <Typography variant="body2" color="textSecondary" sx={{ fontFamily: 'inherit' }}>
                  Rocket
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'inherit' }}>
                  {launch.rocket?.name || 'Unknown'}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {launch.details && (
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontFamily: 'inherit' }}>
                  Details
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: 'inherit' }}>
                  {launch.details}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      {isMobile && (
        <DialogActions>
          <Button onClick={onClose} color="primary" sx={{ fontFamily: 'inherit' }}>
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default LaunchModal;