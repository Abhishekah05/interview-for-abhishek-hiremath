import React, { useState } from 'react';
import {
  Button,
  Menu,
  Box,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';

const DateRangeDropdown = ({ value, onDateRangeChange, mobile = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  // Color definitions
  const selectedColor = theme.palette.primary.main;
  const selectedLightColor = theme.palette.primary.light;
  const selectedTextColor = theme.palette.primary.contrastText;

  const handleClick = (event) => {
    if (isMobile) {
      setMobileOpen(true);
    } else {
      setAnchorEl(event.currentTarget);
    }
    setRangeStart(null);
    setRangeEnd(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMobileOpen(false);
  };

  const handlePresetSelect = (preset) => {
    onDateRangeChange(preset);
    handleClose();
  };

  const handleDateSelect = (day) => {
    if (!day) return;
    
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!rangeStart || (rangeStart && rangeEnd)) {
      // Start new range
      setRangeStart(selectedDate);
      setRangeEnd(null);
    } else if (selectedDate < rangeStart) {
      // If selected date is before start date, swap them
      setRangeStart(selectedDate);
      setRangeEnd(rangeStart);
    } else {
      // Normal case - set end date
      setRangeEnd(selectedDate);
    }
  };

  const applyDateRange = () => {
    if (rangeStart && rangeEnd) {
      onDateRangeChange({
        type: 'custom',
        startDate: rangeStart,
        endDate: rangeEnd
      });
      handleClose();
    }
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
      default: 
        if (presetValue?.type === 'custom') {
          return `${formatDate(presetValue.startDate)} - ${formatDate(presetValue.endDate)}`;
        }
        return 'All time';
    }
  };

  const getDisplayLabel = () => {
    if (typeof value === 'string') {
      return getDateRangeLabel(value);
    } else if (value?.type === 'custom') {
      return `${formatDate(value.startDate)} - ${formatDate(value.endDate)}`;
    }
    return 'All time';
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const isDateSelected = (day) => {
    if (!day) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (rangeStart && date.getTime() === rangeStart.getTime()) return true;
    if (rangeEnd && date.getTime() === rangeEnd.getTime()) return true;
    return false;
  };

  const isDateInRange = (day) => {
    if (!rangeStart || !rangeEnd || !day) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > rangeStart && date < rangeEnd;
  };

  const renderCalendarMonth = () => {
    const days = getDaysInMonth(currentMonth);
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const cellSize = isMobile ? 40 : 36;

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          px: 1
        }}>
          <IconButton 
            size="small" 
            onClick={() => navigateMonth(-1)}
            sx={{ 
              p: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            {getMonthYear(currentMonth)}
          </Typography>
          <IconButton 
            size="small" 
            onClick={() => navigateMonth(1)}
            sx={{ 
              p: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: 1,
          mb: 2
        }}>
          {weekDays.map((day) => (
            <Box key={day} sx={{ 
              textAlign: 'center', 
              py: 1, 
              fontSize: '0.875rem', 
              fontWeight: 'bold',
              color: 'text.secondary'
            }}>
              {day}
            </Box>
          ))}
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: 1
        }}>
          {days.map((day, index) => {
            const selected = isDateSelected(day);
            const inRange = isDateInRange(day);
            
            return (
              <Box 
                key={index} 
                onClick={() => handleDateSelect(day)}
                sx={{ 
                  textAlign: 'center', 
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: day ? 'pointer' : 'default',
                  height: cellSize,
                  width: cellSize,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: inRange ? selectedLightColor : 'transparent',
                  color: selected ? selectedTextColor : inRange ? selectedTextColor : 'inherit',
                  borderRadius: selected ? '50%' : inRange ? '8px' : '8px',
                  border: selected ? `2px solid ${selectedColor}` : 'none',
                  background: selected ? selectedColor : inRange ? selectedLightColor : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': day ? { 
                    backgroundColor: selected ? selectedColor : inRange ? selectedLightColor : 'rgba(0, 0, 0, 0.04)',
                    transform: 'scale(1.05)'
                  } : {}
                }}
              >
                {day || ''}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
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

  const renderContent = () => (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: isMobile ? '80vh' : 'auto'
    }}>
      <Box sx={{ 
        mb: 3
      }}>
        <Typography variant="body2" sx={{ 
          fontWeight: 600,
          mb: 2,
          color: 'text.secondary',
          fontSize: '0.875rem'
        }}>
          Quick Select
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(2, 1fr)',
          gap: 1.5
        }}>
          {PRESET_OPTIONS.map((preset) => (
            <Button
              key={preset}
              variant={value === preset ? 'contained' : 'outlined'}
              size="small"
              onClick={() => handlePresetSelect(preset)}
              sx={{
                textTransform: 'none',
                fontSize: '0.875rem',
                py: 1.5,
                px: 2,
                borderRadius: 2,
                fontWeight: 500,
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
              }}
            >
              {getDateRangeLabel(preset)}
            </Button>
          ))}
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ 
          fontWeight: 600,
          mb: 2,
          color: 'text.secondary',
          fontSize: '0.875rem'
        }}>
          Custom Range
        </Typography>
        
        <Paper elevation={0} sx={{ 
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }}>
          {renderCalendarMonth()}
        </Paper>
        
        {(rangeStart || rangeEnd) && (
          <Box sx={{ 
            mt: 3,
            p: 2,
            backgroundColor: 'background.default',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}>
            <Typography variant="body2" sx={{ 
              fontSize: '0.875rem',
              mb: 2,
              color: 'text.secondary'
            }}>
              {rangeStart && !rangeEnd ? (
                `Start: ${formatDate(rangeStart)} - Select end date`
              ) : (
                `Selected Range: ${formatDate(rangeStart)} to ${formatDate(rangeEnd)}`
              )}
            </Typography>
            {rangeStart && rangeEnd && (
              <Button 
                variant="contained"
                onClick={applyDateRange}
                fullWidth={isMobile}
                sx={{
                  textTransform: 'none',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600
                }}
              >
                Apply Date Range
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );

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
          padding: mobile ? '12px 16px' : '8px 12px',
          justifyContent: mobile ? 'space-between' : 'flex-start',
          minWidth: mobile ? 'auto' : 'unset',
          borderRadius: mobile ? 2 : 1,
          border: mobile ? '1px solid' : 'none',
          borderColor: mobile ? 'divider' : 'transparent',
          '&:hover': {
            backgroundColor: mobile ? 'action.hover' : 'transparent',
            borderColor: mobile ? 'primary.main' : 'transparent'
          }
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <CalendarTodayIcon sx={{ fontSize: 20 }} />
          <Typography variant="body2" sx={{ 
            fontSize: mobile ? '0.875rem' : '0.875rem',
            fontWeight: 500 
          }}>
            {getDisplayLabel()}
          </Typography>
        </Box>
      </Button>

      {/* Mobile Dialog */}
      <Dialog
        open={mobileOpen}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 2,
            minHeight: isMobile ? '100vh' : 'auto'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          py: 2
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Select Date Range
          </Typography>
          <IconButton 
            onClick={handleClose}
            size="small"
            sx={{ 
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ 
          p: 3,
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {renderContent()}
        </DialogContent>
      </Dialog>

      {/* Desktop Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && !isMobile}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            width: 480,
            maxWidth: 480,
            maxHeight: '80vh',
            borderRadius: 2,
            py: 0,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            mb: 2
          }}>
            Select Date Range
          </Typography>
          {renderContent()}
        </Box>
      </Menu>
    </>
  );
};

export default DateRangeDropdown;