import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DateRangeDropdown = ({ value, onDateRangeChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  const getDateRangeLabel = () => {
    switch (value) {
      case 'all':
        return 'All time';
      case 'past-week':
        return 'Past week';
      case 'past-month':
        return 'Past month';
      case 'past-3-months':
        return 'Past 3 months';
      case 'past-6-months':
        return 'Past 6 months';
      case 'past-year':
        return 'Past year';
      case 'past-2-years':
        return 'Past 2 years';
      default:
        return 'All time';
    }
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
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const renderCalendarMonth = (monthDate, showNavigation = false) => {
    const days = getDaysInMonth(monthDate);
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return (
      <Box sx={{ p: isMobile ? 1 : 2, minWidth: isMobile ? 200 : 240 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          {showNavigation && (
            <IconButton size="small" onClick={() => navigateMonth(-1)}>
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Typography variant="subtitle1" sx={{ 
            fontWeight: 'bold', 
            mx: showNavigation ? 0 : 'auto',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            {getMonthYear(monthDate)}
          </Typography>
          {showNavigation && (
            <IconButton size="small" onClick={() => navigateMonth(1)}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </Box>
        
        {/* Week day headers */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0, mb: 1 }}>
          {weekDays.map((day) => (
            <Box key={day} sx={{ 
              textAlign: 'center', 
              py: 1, 
              fontSize: isMobile ? '0.65rem' : '0.75rem', 
              fontWeight: 'bold',
              color: '#666',
              width: isMobile ? '28px' : '32px',
              height: isMobile ? '28px' : '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {day}
            </Box>
          ))}
        </Box>
        
        {/* Calendar days */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0 }}>
          {days.map((day, index) => (
            <Box key={index} sx={{ 
              textAlign: 'center', 
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              cursor: day ? 'pointer' : 'default',
              width: isMobile ? '28px' : '32px',
              height: isMobile ? '28px' : '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': day ? { backgroundColor: '#f5f5f5', borderRadius: '4px' } : {}
            }}>
              {day || ''}
            </Box>
          ))}
        </Box>
      </Box>
    );
  };

  const renderDualCalendar = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);

    return (
      <Box sx={{ 
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        {/* First month with navigation */}
        {renderCalendarMonth(currentMonth, true)}
        
        {/* Divider */}
        <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem />
        
        {/* Second month without navigation */}
        {!isMobile && renderCalendarMonth(nextMonth, false)}
      </Box>
    );
  };

  return (
    <>
      <Button
        variant="text"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          fontFamily: 'inherit',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: isMobile ? '6px 8px' : '8px 12px',
          fontSize: isMobile ? '14px' : '16px',
          minWidth: isMobile ? 'auto' : 'auto',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <CalendarTodayIcon sx={{ fontSize: isMobile ? 18 : 20 }} />
        <Typography sx={{ fontSize: isMobile ? '14px' : '16px' }}>
          {getDateRangeLabel()}
        </Typography>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            minWidth: isMobile ? 280 : isTablet ? 500 : 650, 
            maxWidth: isMobile ? '95vw' : isTablet ? '90vw' : 700,
            maxHeight: isMobile ? '80vh' : 'auto'
          }
        }}
      >
        <Box sx={{ 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          {/* Left side - Preset options */}
          <Box sx={{ 
            minWidth: isMobile ? 'auto' : 150, 
            borderRight: isMobile ? 'none' : '1px solid #e0e0e0',
            borderBottom: isMobile ? '1px solid #e0e0e0' : 'none'
          }}>
            <MenuItem onClick={() => handlePresetSelect('all')}>
              <ListItemText primary="All time" />
            </MenuItem>
            <MenuItem onClick={() => handlePresetSelect('past-week')}>
              <ListItemText primary="Past week" />
            </MenuItem>
            <MenuItem onClick={() => handlePresetSelect('past-month')}>
              <ListItemText primary="Past month" />
            </MenuItem>
            <MenuItem onClick={() => handlePresetSelect('past-3-months')}>
              <ListItemText primary="Past 3 months" />
            </MenuItem>
            <MenuItem onClick={() => handlePresetSelect('past-6-months')}>
              <ListItemText primary="Past 6 months" />
            </MenuItem>
            <MenuItem onClick={() => handlePresetSelect('past-year')}>
              <ListItemText primary="Past year" />
            </MenuItem>
            <MenuItem onClick={() => handlePresetSelect('past-2-years')}>
              <ListItemText primary="Past 2 years" />
            </MenuItem>
          </Box>
          
          {/* Right side - Calendar */}
          <Box>
            {renderDualCalendar()}
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default DateRangeDropdown;