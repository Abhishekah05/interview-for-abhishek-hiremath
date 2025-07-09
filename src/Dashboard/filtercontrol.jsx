import React from 'react';
import {
  Button,
  MenuItem,
  Menu,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DateRangeDropdown from './daterange';

const FilterControls = ({ 
  filter, 
  onFilterChange, 
  dateRange = 'all',
  onDateRangeChange 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [filterMenuAnchor, setFilterMenuAnchor] = React.useState(null);

  const handleFilterChange = (newFilter) => {
    onFilterChange(newFilter);
    setFilterMenuAnchor(null);
  };

  const getFilterLabel = () => {
    switch (filter) {
      case 'upcoming':
        return 'Upcoming';
      case 'successful':
        return 'Successful';
      case 'failed':
        return 'Failed';
      default:
        return 'All Launches';
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {isMobile ? (
        <Box sx={{ 
          display: 'flex',
          gap: 2, // Increased gap for better spacing
          alignItems: 'flex-start',
          px: 1 // Add horizontal padding for proper alignment
        }}>
          {/* Date Range Dropdown - matching width and height */}
          <Box sx={{ 
            flex: 1,
            minWidth: 0
          }}>
            <DateRangeDropdown 
              value={dateRange} 
              onDateRangeChange={onDateRangeChange}
              mobile
            />
          </Box>
          
          {/* Filter Dropdown - matching width and height */}
          <Box sx={{ 
            flex: 1,
            minWidth: 0
          }}>
            <Button
              variant="outlined"
              endIcon={<ArrowDropDownIcon />}
              onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
              fullWidth
              sx={{
                textTransform: 'none',
                fontFamily: 'inherit',
                justifyContent: 'space-between',
                padding: '6px 12px', // Match DateRangeDropdown padding
                borderRadius: 1, // Match DateRangeDropdown border radius
                fontSize: '0.875rem',
                fontWeight: 400, // Match DateRangeDropdown font weight
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                height: 'auto', // Let height be determined by padding
                minHeight: 'auto'
              }}
            >
              {getFilterLabel()}
            </Button>
            <Menu
              anchorEl={filterMenuAnchor}
              open={Boolean(filterMenuAnchor)}
              onClose={() => setFilterMenuAnchor(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left', // Changed to left to match DateRangeDropdown
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left', // Changed to left to match DateRangeDropdown
              }}
              PaperProps={{
                sx: { 
                  width: '180px', // Match DateRangeDropdown menu width
                  maxWidth: '180px',
                  maxHeight: '80vh',
                  overflow: 'auto',
                  borderRadius: 2,
                  py: 1
                }
              }}
            >
              <Box sx={{ p: 1 }}>
                <MenuItem 
                  onClick={() => handleFilterChange('all')}
                  sx={{
                    fontSize: '0.875rem',
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    backgroundColor: filter === 'all' ? theme.palette.primary.light : 'transparent',
                    color: filter === 'all' ? theme.palette.primary.contrastText : 'inherit',
                    minHeight: 'auto',
                    whiteSpace: 'nowrap', // Prevent text wrapping
                    '&:hover': {
                      backgroundColor: filter === 'all' ? theme.palette.primary.light : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText 
                    primary="All Launches" 
                    sx={{ 
                      '& .MuiTypography-root': { 
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap'
                      } 
                    }} 
                  />
                </MenuItem>
                <MenuItem 
                  onClick={() => handleFilterChange('upcoming')}
                  sx={{
                    fontSize: '0.875rem',
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    backgroundColor: filter === 'upcoming' ? theme.palette.primary.light : 'transparent',
                    color: filter === 'upcoming' ? theme.palette.primary.contrastText : 'inherit',
                    minHeight: 'auto',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: filter === 'upcoming' ? theme.palette.primary.light : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText 
                    primary="Upcoming Launches" 
                    sx={{ 
                      '& .MuiTypography-root': { 
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap'
                      } 
                    }} 
                  />
                </MenuItem>
                <MenuItem 
                  onClick={() => handleFilterChange('successful')}
                  sx={{
                    fontSize: '0.875rem',
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    backgroundColor: filter === 'successful' ? theme.palette.primary.light : 'transparent',
                    color: filter === 'successful' ? theme.palette.primary.contrastText : 'inherit',
                    minHeight: 'auto',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: filter === 'successful' ? theme.palette.primary.light : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText 
                    primary="Successful Launches" 
                    sx={{ 
                      '& .MuiTypography-root': { 
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap'
                      } 
                    }} 
                  />
                </MenuItem>
                <MenuItem 
                  onClick={() => handleFilterChange('failed')}
                  sx={{
                    fontSize: '0.875rem',
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    backgroundColor: filter === 'failed' ? theme.palette.primary.light : 'transparent',
                    color: filter === 'failed' ? theme.palette.primary.contrastText : 'inherit',
                    minHeight: 'auto',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: filter === 'failed' ? theme.palette.primary.light : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemText 
                    primary="Failed Launches" 
                    sx={{ 
                      '& .MuiTypography-root': { 
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap'
                      } 
                    }} 
                  />
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <DateRangeDropdown 
            value={dateRange} 
            onDateRangeChange={onDateRangeChange} 
          />
          <Button
            variant="text"
            endIcon={<ArrowDropDownIcon />}
            onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
            sx={{
              textTransform: 'none',
              fontFamily: 'inherit',
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: '8px 12px',
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            <FilterListIcon sx={{ fontSize: 20 }} />
            {getFilterLabel()}
          </Button>
          <Menu
            anchorEl={filterMenuAnchor}
            open={Boolean(filterMenuAnchor)}
            onClose={() => setFilterMenuAnchor(null)}
          >
            <MenuItem onClick={() => handleFilterChange('all')}>
              <ListItemText primary="All Launches" />
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange('upcoming')}>
              <ListItemText primary="Upcoming Launches" />
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange('successful')}>
              <ListItemText primary="Successful Launches" />
            </MenuItem>
            <MenuItem onClick={() => handleFilterChange('failed')}>
              <ListItemText primary="Failed Launches" />
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default FilterControls;