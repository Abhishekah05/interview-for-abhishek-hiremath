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
  Pagination
} from '@mui/material';
import StatusChip from './statuschip';
import { formatDate } from '../Util/util';

const LaunchTable = ({ launches, onLaunchClick, currentPage, totalPages, onPageChange }) => {
  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          border: '1px solid #e0e0e0',
          borderRadius: 1,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>Launched (UTC)</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>Mission</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>Orbit</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>Launch Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>Rocket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {launches.map((launch, index) => (
              <TableRow
                key={launch.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => onLaunchClick(launch)}
              >
                <TableCell sx={{ fontFamily: 'inherit' }}>
                  {String((currentPage - 1) * 10 + index + 1).padStart(2, '0')}
                </TableCell>
                <TableCell sx={{ fontFamily: 'inherit' }}>{formatDate(launch.date_utc)}</TableCell>
                <TableCell sx={{ fontFamily: 'inherit' }}>{launch.launchpad?.name || 'Unknown'}</TableCell>
                <TableCell sx={{ fontFamily: 'inherit' }}>{launch.name}</TableCell>
                <TableCell sx={{ fontFamily: 'inherit' }}>{launch.payloads?.[0]?.orbit || 'Unknown'}</TableCell>
                <TableCell><StatusChip launch={launch} /></TableCell>
                <TableCell sx={{ fontFamily: 'inherit' }}>{launch.rocket?.name || 'Unknown'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: 'inherit',
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default LaunchTable;