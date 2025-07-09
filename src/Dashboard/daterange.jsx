import React, { useState } from 'react';
import {
  Button,
  Menu,
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const DateRangeDropdown = ({ value, onDateRangeChange, mobile = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePresetSelect = (preset) => {
    onDateRangeChange(preset);
    handleClose();
  };

  const getDateRangeLabel = (presetValue) => {
    switch (presetValue) {
      case 'all': return 'All time';
      case 'past-week': return 'Past week';
      case 'past-month': return 'Past month';
      case 'past-3-months': return 'Past 3 months';
      case 'past-6-months': return 'Past 6 months';
      case 'past-year': return 'Past year';
      case 'past-2-years': return 'Past 2 years';
      default: return 'All time';
    }
  };

  const getDisplayLabel = () => {
    return getDateRangeLabel(value) || 'All time';
  };

  const PRESET_OPTIONS = [
    'past-week',
    'past-month',
    'past-3-months',
    'past-6-months',
    'past-year',
    'past-2-years',
    'all'
  ];

  return (
    <>
      <Button
        variant={mobile ? "outlined" : "text"}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        fullWidth={mobile}
        sx={{
          textTransform: 'none',
          fontFamily: 'inherit',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: mobile ? '6px 12px' : '8px 12px',
          justifyContent: mobile ? 'space-between' : 'flex-start',
          minWidth: mobile ? 'auto' : 'unset',
          borderRadius: mobile ? 1 : 'unset', // Match FilterControls border radius
          fontWeight: mobile ? 400 : 'inherit', // Match FilterControls font weight
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <CalendarTodayIcon sx={{ fontSize: isMobile ? 18 : 20 }} />
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '0.875rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {getDisplayLabel()}
          </Typography>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            width: isMobile ? '180px' : 200, // Increased width for mobile
            maxWidth: isMobile ? '180px' : 200,
            maxHeight: '80vh',
            overflow: 'auto',
            borderRadius: 2,
            py: 1
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 1 }}>
          {PRESET_OPTIONS.map((preset) => (
            <Button
              key={preset}
              variant="text"
              fullWidth
              onClick={() => handlePresetSelect(preset)}
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                py: 1,
                px: 2,
                justifyContent: 'flex-start',
                borderRadius: 1,
                backgroundColor: value === preset ? theme.palette.primary.light : 'transparent',
                color: value === preset ? theme.palette.primary.contrastText : 'inherit',
                '&:hover': {
                  backgroundColor: value === preset ? theme.palette.primary.light : 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              {getDateRangeLabel(preset)}
            </Button>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default DateRangeDropdown;