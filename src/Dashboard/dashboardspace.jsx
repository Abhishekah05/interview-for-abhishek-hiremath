import React, { useState, useEffect } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import Layout from '../Layouts/layout';
import FilterControls from './filtercontrol';
import LaunchTable from './launchtable';
import LaunchCard from './launchcard';
import LaunchModal from './launchmodal';
import LoadingSpinner from './loadingspinner';
import EmptyState from './emptystate';
import { filterLaunchesByDateRange } from '../Util/util';

const SpaceXDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // Fetch launches, launchpads, rockets, and payloads on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data concurrently
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
        
        // Create lookup maps
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
        
        // Combine data
        const enrichedLaunches = launchesData.map(launch => {
          // Get payload information
          const payloadObjects = launch.payloads ? launch.payloads.map(payloadId => payloadsMap[payloadId]).filter(Boolean) : [];
          
          return {
            ...launch,
            launchpad: launchpadsMap[launch.launchpad],
            rocket: rocketsMap[launch.rocket],
            payloadObjects: payloadObjects
          };
        });
        
        setLaunches(enrichedLaunches);
        console.log('Loaded launches:', enrichedLaunches.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter launches based on selected filter and date range
  useEffect(() => {
    let filtered = [...launches];
    
    console.log('Original launches:', launches.length);
    
    // Apply date range filter first (only if not 'all')
    if (dateRange && dateRange !== 'all') {
      filtered = filterLaunchesByDateRange(filtered, dateRange);
      console.log('After date filter:', filtered.length);
    }
    
    // Apply status filter
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
        // 'all' - no additional filtering needed
        break;
    }
    
    console.log('After status filter:', filtered.length);
    
    setFilteredLaunches(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
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

  // Calculate pagination
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
      />
      
      {filteredLaunches.length === 0 ? (
        <EmptyState 
          title="No results found for the specified filter"
          subtitle="Try adjusting your filter criteria or date range"
        />
      ) : (
        <>
          {isMobile ? (
            <Grid container spacing={2}>
              {currentLaunches.map((launch) => (
                <Grid item xs={12} key={launch.id}>
                  <LaunchCard launch={launch} onClick={handleLaunchClick} />
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
            />
          )}
        </>
      )}

      <LaunchModal 
        open={dialogOpen} 
        launch={selectedLaunch} 
        onClose={handleCloseDialog} 
      />
    </Layout>
  );
};

export default SpaceXDashboard;