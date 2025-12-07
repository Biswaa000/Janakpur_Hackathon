export const navLinks = [
  { id: 1, name: 'Dashboard', path: '/', icon: '📊' },
  { id: 2, name: 'Reports', path: '/reports', icon: '📋' },
  { id: 3, name: 'NGOs', path: '/ngos', icon: '🏢' },
];

export const reportStatus = {
  PENDING: 'pending',
  GENUINE: 'genuine',
  FAKE: 'fake',
  FORWARDED: 'forwarded'
};

export const ngoStatus = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected'
};

// Blue theme color classes for dynamic usage
export const themeColors = {
  primary: {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
    hover: 'hover:bg-blue-700',
    light: 'bg-blue-50',
  },
  card: {
    bg: 'bg-white',
    border: 'border-blue-200',
    shadow: 'shadow-md',
  }
};