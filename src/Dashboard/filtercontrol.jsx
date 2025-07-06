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
        return 'Upcoming Launches';
      case 'successful':
        return 'Successful Launches';
      case 'failed':
        return 'Failed Launches';
      default:
        return 'All Launches';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      }}
    >
      <DateRangeDropdown 
        value={dateRange} 
        onDateRangeChange={onDateRangeChange} 
      />

      {isMobile ? (
        <>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={(e) => setFilterMenuAnchor(e.currentTarget)}
            fullWidth
            sx={{
              textTransform: 'none',
              fontFamily: 'inherit'
            }}
          >
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
        </>
      ) : (
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
      )}
      
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
  );
};

export default FilterControls;