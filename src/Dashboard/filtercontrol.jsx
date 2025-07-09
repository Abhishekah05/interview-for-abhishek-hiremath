import React from 'react';
import {
  Button,
  MenuItem,
  Menu,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DateRangeDropdown from './daterange';

const FilterControls = ({ 
  filter, 
  onFilterChange, 
  dateRange = 'all',
  onDateRangeChange,
  isMobile
}) => {
  const theme = useTheme();
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
    <Box
      sx={{
        display: 'flex',
        gap: isMobile ? 1 : 2,
        mb: 3,
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: isMobile ? 'center' : 'space-between'
      }}
    >
      <DateRangeDropdown 
        value={dateRange} 
        onDateRangeChange={onDateRangeChange} 
        isMobile={isMobile}
      />

      <Button
        variant={isMobile ? "outlined" : "text"}
        startIcon={isMobile ? <FilterListIcon /> : null}
        endIcon={<ArrowDropDownIcon />}
        onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
        sx={{
          textTransform: 'none',
          fontFamily: 'inherit',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          padding: isMobile ? '6px 12px' : '8px 12px',
          fontSize: isMobile ? '14px' : '16px',
          minWidth: 'auto',
          '&:hover': {
            backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
          }
        }}
      >
        {!isMobile && <FilterListIcon sx={{ fontSize: 20 }} />}
        {getFilterLabel()}
      </Button>
      
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={() => setFilterMenuAnchor(null)}
        PaperProps={{
          sx: { 
            minWidth: isMobile ? 200 : 240,
          }
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
  );
};

export default FilterControls;