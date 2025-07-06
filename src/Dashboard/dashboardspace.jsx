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
  const [dateRange, setDateRange] = useState('all'); // Changed from 'past-6-months' to 'all'
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // Fetch launches, launchpads, and rockets on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch launches
        const launchesResponse = await fetch('https://api.spacexdata.com/v5/launches');
        const launchesData = await launchesResponse.json();
        
        // Fetch launchpads
        const launchpadsResponse = await fetch('https://api.spacexdata.com/v4/launchpads');
        const launchpadsData = await launchpadsResponse.json();
        const launchpadsMap = {};
        launchpadsData.forEach(pad => {
          launchpadsMap[pad.id] = pad;
        });
        
        // Fetch rockets
        const rocketsResponse = await fetch('https://api.spacexdata.com/v4/rockets');
        const rocketsData = await rocketsResponse.json();
        const rocketsMap = {};
        rocketsData.forEach(rocket => {
          rocketsMap[rocket.id] = rocket;
        });
        
        // Combine data
        const enrichedLaunches = launchesData.map(launch => ({
          ...launch,
          launchpad: launchpadsMap[launch.launchpad],
          rocket: rocketsMap[launch.rocket]
        }));
        
        setLaunches(enrichedLaunches);
        console.log('Loaded launches:', enrichedLaunches.length); // Debug log
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
    let filtered = [...launches]; // Create a copy to avoid mutation
    
    console.log('Original launches:', launches.length); // Debug log
    
    // Apply date range filter first (only if not 'all')
    if (dateRange && dateRange !== 'all') {
      filtered = filterLaunchesByDateRange(filtered, dateRange);
      console.log('After date filter:', filtered.length); // Debug log
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
    
    console.log('After status filter:', filtered.length); // Debug log
    
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