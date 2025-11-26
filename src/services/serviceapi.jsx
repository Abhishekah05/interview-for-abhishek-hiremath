export const mockLaunches = [
  {
    id: 1,
    flightNumber: 1,
    name: 'FalconSat',
    date: '2006-03-24T22:30:00Z',
    success: false,
    upcoming: false,
    rocket: 'Falcon 9',
    payloadType: 'Satellite',
    orbit: 'LEO',
    launchSite: 'Kwajalein Atoll',
    details: 'Engine failure at 33 seconds and loss of vehicle',
    manufacturer: 'SpaceX',
    nationality: 'United States',
    rocketVersion: 'v1.0'
  },
  {
    id: 2,
    flightNumber: 2,
    name: 'RatSat',
    date: '2008-09-28T23:15:00Z',
    success: true,
    upcoming: false,
    rocket: 'Falcon 9',
    payloadType: 'Satellite',
    orbit: 'LEO',
    launchSite: 'Kwajalein Atoll',
    details: 'Successful first stage burn and separation',
    manufacturer: 'SpaceX',
    nationality: 'United States',
    rocketVersion: 'v1.0'
  },
  {
    id: 3,
    flightNumber: 3,
    name: 'Falcon 9 Test Flight',
    date: '2010-06-04T18:45:00Z',
    success: true,
    upcoming: false,
    rocket: 'Falcon 9',
    payloadType: 'Dragon Spacecraft',
    orbit: 'LEO',
    launchSite: 'CCAFS SLC 40',
    details: 'Successful orbital insertion achieved',
    manufacturer: 'SpaceX',
    nationality: 'United States',
    rocketVersion: 'v1.1'
  },
  {
    id: 4,
    flightNumber: 4,
    name: 'CRS-21',
    date: '2020-12-06T16:17:00Z',
    success: null,
    upcoming: true,
    rocket: 'Falcon 9',
    payloadType: 'Dragon 2.0',
    orbit: 'ISS',
    launchSite: 'KSC LC 39A',
    details: 'Commercial resupply mission to ISS',
    manufacturer: 'SpaceX',
    nationality: 'United States',
    rocketVersion: 'v1.2'
  }
];

export const fetchLaunches = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  return mockLaunches;
};

export const fetchLaunchDetails = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockLaunches.find(launch => launch.id === id);
};