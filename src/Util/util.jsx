// Utility functions for SpaceX Dashboard

// In util.js
export const formatDate = (dateString, short = false) => {
  const date = new Date(dateString);
  if (short) {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: '2-digit'
    });
  }
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const filterLaunchesByDateRange = (launches, dateRange) => {
  const now = new Date();
  let startDate = new Date();
  
  switch (dateRange) {
    case 'past-week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'past-month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'past-3-months':
      startDate.setMonth(now.getMonth() - 3);
      break;
    case 'past-6-months':
      startDate.setMonth(now.getMonth() - 6);
      break;
    case 'past-year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    case 'past-2-years':
      startDate.setFullYear(now.getFullYear() - 2);
      break;
    default:
      return launches;
  }
  
  return launches.filter(launch => {
    const launchDate = new Date(launch.date_utc);
    return launchDate >= startDate && launchDate <= now;
  });
};