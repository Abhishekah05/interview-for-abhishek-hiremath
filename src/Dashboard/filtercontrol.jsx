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
          gap: 1,
          alignItems: 'flex-start'
        }}>
          {/* Date Range Dropdown - fixed width to prevent layout shift */}
          <Box sx={{ 
            flex: 1,
            minWidth: 0  // Allow flex item to shrink below content size
          }}>
            <DateRangeDropdown 
              value={dateRange} 
              onDateRangeChange={onDateRangeChange}
              mobile
            />
          </Box>
          
          {/* Filter Dropdown - fixed width, positioned to the right */}
          <Box sx={{ 
            minWidth: '140px',
            maxWidth: '140px'
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
                padding: '12px 16px',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
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
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
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