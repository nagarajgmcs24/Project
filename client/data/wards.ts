export interface Ward {
  id: string;
  name: string;
  councillor: string;
  party: string;
  phone: string;
  email: string;
  location: string;
  area: string;
}

export const bengaluruWards: Ward[] = [
  {
    id: 'ward_1',
    name: 'Hebbal',
    councillor: 'Suresh Kumar',
    party: 'Bharatiya Janata Party (BJP)',
    phone: '+91 9876543210',
    email: 'hebbal@bmcward.gov.in',
    location: 'North Bengaluru',
    area: '23.5 sq km',
  },
  {
    id: 'ward_2',
    name: 'Whitefield',
    councillor: 'Ravi Shankar',
    party: 'Indian National Congress (INC)',
    phone: '+91 9876543211',
    email: 'whitefield@bmcward.gov.in',
    location: 'East Bengaluru',
    area: '18.7 sq km',
  },
  {
    id: 'ward_3',
    name: 'Indiranagar',
    councillor: 'Priya Sharma',
    party: 'Bharatiya Janata Party (BJP)',
    phone: '+91 9876543212',
    email: 'indiranagar@bmcward.gov.in',
    location: 'East Bengaluru',
    area: '15.2 sq km',
  },
  {
    id: 'ward_4',
    name: 'Basavangudi',
    councillor: 'Mahesh Reddy',
    party: 'Indian National Congress (INC)',
    phone: '+91 9876543213',
    email: 'basavangudi@bmcward.gov.in',
    location: 'Central Bengaluru',
    area: '12.8 sq km',
  },
  {
    id: 'ward_5',
    name: 'Malleshwaram',
    councillor: 'Anita Desai',
    party: 'Janata Dal (Secular) (JDS)',
    phone: '+91 9876543214',
    email: 'malleshwaram@bmcward.gov.in',
    location: 'North Bengaluru',
    area: '16.4 sq km',
  },
  {
    id: 'ward_6',
    name: 'Koramangala',
    councillor: 'Vikram Singh',
    party: 'Bharatiya Janata Party (BJP)',
    phone: '+91 9876543215',
    email: 'koramangala@bmcward.gov.in',
    location: 'South Bengaluru',
    area: '14.1 sq km',
  },
  {
    id: 'ward_7',
    name: 'Jayanagar',
    councillor: 'Neelam Patel',
    party: 'Indian National Congress (INC)',
    phone: '+91 9876543216',
    email: 'jayanagar@bmcward.gov.in',
    location: 'South Bengaluru',
    area: '13.6 sq km',
  },
  {
    id: 'ward_8',
    name: 'Rajajinagar',
    councillor: 'Deepak Nair',
    party: 'Janata Dal (Secular) (JDS)',
    phone: '+91 9876543217',
    email: 'rajajinagar@bmcward.gov.in',
    location: 'West Bengaluru',
    area: '17.3 sq km',
  },
  {
    id: 'ward_9',
    name: 'Bellandur',
    councillor: 'Sarah Khan',
    party: 'Bharatiya Janata Party (BJP)',
    phone: '+91 9876543218',
    email: 'bellandur@bmcward.gov.in',
    location: 'East Bengaluru',
    area: '22.1 sq km',
  },
  {
    id: 'ward_10',
    name: 'Yelahanka',
    councillor: 'Rajesh Verma',
    party: 'Indian National Congress (INC)',
    phone: '+91 9876543219',
    email: 'yelahanka@bmcward.gov.in',
    location: 'North Bengaluru',
    area: '19.8 sq km',
  },
];

export function getWardById(id: string): Ward | undefined {
  return bengaluruWards.find((ward) => ward.id === id);
}

export function getWardByName(name: string): Ward | undefined {
  return bengaluruWards.find((ward) => ward.name.toLowerCase() === name.toLowerCase());
}
