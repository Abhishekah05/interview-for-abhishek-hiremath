import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Typography
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import StatusChip from './statuschip';
import { formatDate } from '../Util/util';

const LaunchTable = ({ launches, onLaunchClick, currentPage, totalPages, onPageChange, itemsPerPage = 10 }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(null, page);
    }
  };

  // Helper function to get orbit information
  const getOrbitInfo = (launch) => {
    if (launch.payloadObjects && launch.payloadObjects.length > 0) {
      // Get the first payload's orbit, or combine multiple orbits
      const orbits = launch.payloadObjects
        .map(payload => payload.orbit)
        .filter(orbit => orbit && orbit !== 'unknown')
        .filter((orbit, index, self) => self.indexOf(orbit) === index); // Remove duplicates
      
      if (orbits.length > 0) {
        return orbits.join(', ');
      }
    }
    
    // Fallback to the original method if payloadObjects is not available
    if (launch.payloads && launch.payloads.length > 0) {
      const firstPayload = launch.payloads[0];
      if (typeof firstPayload === 'object' && firstPayload.orbit) {
        return firstPayload.orbit;
      }
    }
    
    return 'Unknown';
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisible = 7;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisible) {
      const halfVisible = Math.floor(maxVisible / 2);
      
      if (currentPage <= halfVisible) {
        // Show first pages
        startPage = 1;
        endPage = maxVisible - 1;
      } else if (currentPage >= totalPages - halfVisible) {
        // Show last pages
        startPage = totalPages - maxVisible + 2;
        endPage = totalPages;
      } else {
        // Show middle pages
        startPage = currentPage - halfVisible + 1;
        endPage = currentPage + halfVisible - 1;
      }
    }

    // Previous button
    items.push(
      <IconButton
        key="prev"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        sx={{
          width: 36,
          height: 36,
          borderRadius: '4px',
          mx: 0.5,
          color: currentPage === 1 ? '#ccc' : '#333',
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          '&:hover': {
            backgroundColor: currentPage === 1 ? '#fff' : '#f9f9f9',
          }
        }}
      >
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
    );

    // First page (if not in visible range)
    if (startPage > 1) {
      items.push(
        <Box
          key={1}
          onClick={() => handlePageClick(1)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '4px',
            mx: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: 1 === currentPage ? 'bold' : 'normal',
            backgroundColor: 1 === currentPage ? '#1976d2' : '#fff',
            color: 1 === currentPage ? '#fff' : '#333',
            border: '1px solid #e0e0e0',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 1 === currentPage ? '#1565c0' : '#f5f5f5',
            }
          }}
        >
          1
        </Box>
      );

      if (startPage > 2) {
        items.push(
          <Typography key="dots1" sx={{ mx: 1, fontSize: '0.875rem', color: '#999' }}>
            ...
          </Typography>
        );
      }
    }

    // Visible page range
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Box
          key={i}
          onClick={() => handlePageClick(i)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '4px',
            mx: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: i === currentPage ? 'bold' : 'normal',
            backgroundColor: i === currentPage ? '#1976d2' : '#fff',
            color: i === currentPage ? '#fff' : '#333',
            border: '1px solid #e0e0e0',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: i === currentPage ? '#1565c0' : '#f5f5f5',
            }
          }}
        >
          {i}
        </Box>
      );
    }

    // Last page (if not in visible range)
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <Typography key="dots2" sx={{ mx: 1, fontSize: '0.875rem', color: '#999' }}>
            ...
          </Typography>
        );
      }

      items.push(
        <Box
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          sx={{
            width: 36,
            height: 36,
            borderRadius: '4px',
            mx: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: totalPages === currentPage ? 'bold' : 'normal',
            backgroundColor: totalPages === currentPage ? '#1976d2' : '#fff',
            color: totalPages === currentPage ? '#fff' : '#333',
            border: '1px solid #e0e0e0',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: totalPages === currentPage ? '#1565c0' : '#f5f5f5',
            }
          }}
        >
          {totalPages}
        </Box>
      );
    }

    // Next button
    items.push(
      <IconButton
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        sx={{
          width: 36,
          height: 36,
          borderRadius: '4px',
          mx: 0.5,
          color: currentPage === totalPages ? '#ccc' : '#333',
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          '&:hover': {
            backgroundColor: currentPage === totalPages ? '#fff' : '#f9f9f9',
          }
        }}
      >
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    );

    return items;
  };

  return (
    <Box sx={{ backgroundColor: 'white', minHeight: '100vh', pb: 4 }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          borderRadius: 1,
          backgroundColor: 'white'
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Launched (UTC)</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Mission</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Orbit</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Launch Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Rocket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {launches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', p: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#666' }}>
                    No results found for the specified filter
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filter criteria or date range
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              launches.map((launch, index) => (
                <TableRow
                  key={launch.id}
                  onClick={() => onLaunchClick(launch)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <TableCell sx={{ fontSize: '0.875rem' }}>
                    {String((currentPage - 1) * itemsPerPage + index + 1).padStart(2, '0')}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{formatDate(launch.date_utc)}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{launch.launchpad?.name || 'Unknown'}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{launch.name}</TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{getOrbitInfo(launch)}</TableCell>
                  <TableCell><StatusChip launch={launch} /></TableCell>
                  <TableCell sx={{ fontSize: '0.875rem' }}>{launch.rocket?.name || 'Unknown'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && launches.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            mt: 3,
            pr: 2, // right padding
            backgroundColor: 'white'
          }}
        >
          {renderPaginationItems()}
        </Box>
      )}
    </Box>
  );
};

export default LaunchTable;