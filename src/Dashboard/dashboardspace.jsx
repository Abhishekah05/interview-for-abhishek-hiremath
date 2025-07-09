import React, { useState, useEffect } from 'react';
import { Grid, useMediaQuery, useTheme ,Box,Typography,IconButton} from '@mui/material';
import Layout from '../Layouts/layout';
import FilterControls from './filtercontrol';
import LaunchTable from './launchtable';
import LaunchCard from './launchcard';
import LaunchModal from './launchmodal';
import LoadingSpinner from './loadingspinner';
import EmptyState from './emptystate';
import { filterLaunchesByDateRange } from '../Util/util';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



const SpaceXDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = isMobile ? 5 : 10;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [launchesResponse, launchpadsResponse, rocketsResponse, payloadsResponse] = await Promise.all([
          fetch('https://api.spacexdata.com/v5/launches'),
          fetch('https://api.spacexdata.com/v4/launchpads'),
          fetch('https://api.spacexdata.com/v4/rockets'),
          fetch('https://api.spacexdata.com/v4/payloads')
        ]);
        
        const [launchesData, launchpadsData, rocketsData, payloadsData] = await Promise.all([
          launchesResponse.json(),
          launchpadsResponse.json(),
          rocketsResponse.json(),
          payloadsResponse.json()
        ]);
        
        const launchpadsMap = {};
        launchpadsData.forEach(pad => {
          launchpadsMap[pad.id] = pad;
        });
        
        const rocketsMap = {};
        rocketsData.forEach(rocket => {
          rocketsMap[rocket.id] = rocket;
        });
        
        const payloadsMap = {};
        payloadsData.forEach(payload => {
          payloadsMap[payload.id] = payload;
        });
        
        const enrichedLaunches = launchesData.map(launch => {
          const payloadObjects = launch.payloads ? launch.payloads.map(payloadId => payloadsMap[payloadId]).filter(Boolean) : [];
          
          return {
            ...launch,
            launchpad: launchpadsMap[launch.launchpad],
            rocket: rocketsMap[launch.rocket],
            payloadObjects: payloadObjects
          };
        });
        
        setLaunches(enrichedLaunches);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = [...launches];
    
    if (dateRange && dateRange !== 'all') {
      filtered = filterLaunchesByDateRange(filtered, dateRange);
    }
    
    switch (filter) {
      case 'upcoming':
        filtered = filtered.filter(launch => launch.upcoming);
        break;
      case 'successful':
        filtered = filtered.filter(launch => launch.success === true);
        break;
      case 'failed':
        filtered = filtered.filter(launch => launch.success === false);
        break;
      default:
        break;
    }
    
    setFilteredLaunches(filtered);
    setCurrentPage(1);
  }, [filter, dateRange, launches]);

  const handleLaunchClick = (launch) => {
    setSelectedLaunch(launch);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLaunch(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLaunches = filteredLaunches.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <FilterControls 
        filter={filter} 
        onFilterChange={handleFilterChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        isMobile={isMobile}
      />
      
      {filteredLaunches.length === 0 ? (
        <EmptyState 
          title="No results found"
          subtitle="Try adjusting your filter criteria"
        />
      ) : (
        <>
          {isMobile ? (
            <Grid container spacing={2}>
              {currentLaunches.map((launch) => (
                <Grid item xs={12} key={launch.id}>
                  <LaunchCard launch={launch} onClick={handleLaunchClick} isMobile={isMobile} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <LaunchTable 
              launches={currentLaunches} 
              onLaunchClick={handleLaunchClick}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          )}
        </>
      )}

      {isMobile && filteredLaunches.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(null, currentPage - 1)}
              size="small"
            >
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <IconButton 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(null, currentPage + 1)}
              size="small"
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      <LaunchModal 
        open={dialogOpen} 
        launch={selectedLaunch} 
        onClose={handleCloseDialog} 
        isMobile={isMobile}
      />
    </Layout>
  );
};

export default SpaceXDashboard;