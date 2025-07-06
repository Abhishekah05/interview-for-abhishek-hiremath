import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StatusChip from './statuschip';
import { formatDate } from '../Util/util';
import CalendarToday from '@mui/icons-material/CalendarToday';
import LocationOn from '@mui/icons-material/LocationOn';
import Flight from '@mui/icons-material/Flight';
import Launch from '@mui/icons-material/Launch';

const useStyles = makeStyles((theme) => ({
  mobileCard: {
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  },
  mobileCardContent: {
    padding: theme.spacing(2)
  },
  mobileCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  mobileCardDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1)
  },
  mobileDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    fontSize: '0.9rem',
    color: '#666'
  }
}));

const LaunchCard = ({ launch, onClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.mobileCard} onClick={() => onClick(launch)}>
      <CardContent className={classes.mobileCardContent}>
        <div className={classes.mobileCardHeader}>
          <Typography variant="h6" component="h3">
            {launch.name}
          </Typography>
          <StatusChip launch={launch} />
        </div>
        <div className={classes.mobileCardDetails}>
          <div className={classes.mobileDetail}>
            <CalendarToday fontSize="small" />
            <span>{formatDate(launch.date_utc)}</span>
          </div>
          <div className={classes.mobileDetail}>
            <LocationOn fontSize="small" />
            <span>{launch.launchpad?.name || 'Unknown'}</span>
          </div>
          <div className={classes.mobileDetail}>
            <Flight fontSize="small" />
            <span>{launch.rocket?.name || 'Unknown'}</span>
          </div>
          <div className={classes.mobileDetail}>
            <Launch fontSize="small" />
            <span>{launch.payloads?.[0]?.orbit || 'Unknown'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LaunchCard;
