import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import Layout from '../Layouts/layout';
import FilterControls from './filtercontrol';
import LaunchTable from './launchtable';
import LaunchModal from './launchmodal';
import LoadingSpinner from './loadingspinner';
import { filterLaunchesByDateRange } from '../Util/util';

const SpaceXDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

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
        setInitialLoad(false);
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

  if (loading && initialLoad) {
    return (
      <Layout>
        <FilterControls 
          filter={filter} 
          onFilterChange={handleFilterChange}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
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
      
      <LaunchTable 
        launches={currentLaunches} 
        onLaunchClick={handleLaunchClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isMobile={isMobile}
        isLoading={loading}
        initialLoad={initialLoad}
      />

      <LaunchModal 
        open={dialogOpen} 
        launch={selectedLaunch} 
        onClose={handleCloseDialog} 
      />
    </Layout>
  );
};

export default SpaceXDashboard;