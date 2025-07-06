// Utility functions for SpaceX Dashboard

export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const filterLaunchesByDateRange = (launches, dateRange) => {
  if (!dateRange || dateRange === 'all') {
    return launches;
  }

  const now = new Date();
  let cutoffDate;

  switch (dateRange) {
    case 'past-week':
      cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'past-month':
      cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case 'past-3-months':
      cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    case 'past-6-months':
      cutoffDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      break;
    case 'past-year':
      cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      break;
    case 'past-2-years':
      cutoffDate = new Date(now.getTime() - 730 * 24 * 60 * 60 * 1000);
      break;
    default:
      return launches;
  }

  return launches.filter(launch => {
    const launchDate = new Date(launch.date_utc);
    return launchDate >= cutoffDate;
  });
};