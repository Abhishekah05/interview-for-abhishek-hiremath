import React from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  dateRange = 'all', // Changed default to 'all'
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
        <FormControl
          sx={{
            minWidth: 200,
            width: isMobile ? '100%' : 'auto'
          }}
        >
          <InputLabel sx={{ fontFamily: 'inherit' }}>All Launches</InputLabel>
          <Select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            label="All Launches"
            endIcon={<ArrowDropDownIcon />}
            sx={{ 
              fontFamily: 'inherit',
              textTransform: 'none'
            }}
          >
            <MenuItem value="all">All Launches</MenuItem>
            <MenuItem value="upcoming">Upcoming Launches</MenuItem>
            <MenuItem value="successful">Successful Launches</MenuItem>
            <MenuItem value="failed">Failed Launches</MenuItem>
          </Select>
        </FormControl>
      )}
    </Box>
  );
};

export default FilterControls;