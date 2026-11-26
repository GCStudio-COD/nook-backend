import { PrismaClient, RoomType, SharingType, RoomStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Hostels & Rooms with 2D coordinates...');

  // 1. Create or Find Hostel 1: Saltmere Ocean Campus
  let hostel1 = await prisma.hostel.findUnique({ where: { code: 'SALT-01' } });
  if (!hostel1) {
    hostel1 = await prisma.hostel.create({
      data: {
        name: 'Saltmere Ocean Campus',
        code: 'SALT-01',
        address: '14 Bayview Promenade, North Coast Highway',
        city: 'Mumbai',
        totalFloors: 3,
        description: 'Flagship coastal hostel facility with panoramic ocean decks, biometric access, silent study pods, and 24/7 chef-managed mess.',
        facilities: [
          'Gigabit Wi-Fi 6',
          'Nutritious Cafeteria & Mess',
          'Modern Gymnasium',
          '24/7 Power Backup',
          'Silent Study Pods & Library',
          'CCTV & Biometric Facial Security',
          'Automatic Laundry',
          'UV + RO Mineral Water',
        ],
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        ],
      },
    });
    console.log('Created Hostel 1:', hostel1.name);
  }

  // 2. Create or Find Hostel 2: Aura Heights Metro Campus
  let hostel2 = await prisma.hostel.findUnique({ where: { code: 'AURA-02' } });
  if (!hostel2) {
    hostel2 = await prisma.hostel.create({
      data: {
        name: 'Aura Heights Metro Campus',
        code: 'AURA-02',
        address: 'Sector 5, Tech City Junction, Powai',
        city: 'Mumbai',
        totalFloors: 4,
        description: 'Contemporary tech-corridor student residence with high-speed fiber internet, private single studios, and executive dorms.',
        facilities: [
          'Gigabit Wi-Fi 6',
          'Nutritious Cafeteria & Mess',
          '24/7 Power Backup',
          'CCTV & Biometric Facial Security',
          'Indoor Sports & Table Tennis',
          'UV + RO Mineral Water',
        ],
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        ],
      },
    });
    console.log('Created Hostel 2:', hostel2.name);
  }

  // 3. Link any existing unlinked rooms to Hostel 1
  await prisma.room.updateMany({
    where: { hostelId: null },
    data: { hostelId: hostel1.id },
  });

  // 4. Upsert structured rooms with 2D positions for Saltmere Ocean Campus
  const saltmereRooms = [
    // Floor 1 - East Wing
    {
      roomNumber: 'D-101',
      floor: 1,
      wing: 'East',
      positionX: 1,
      positionY: 1,
      type: RoomType.DELUXE,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 0,
      priceMonthly: 14500,
      securityDeposit: 15000,
      status: RoomStatus.AVAILABLE,
      amenities: ['Inverter Split AC', 'Attached Designer Bath', 'Geyser / Hot Water', 'Study Desk', 'Wardrobe with Digital Locker'],
      description: 'Private deluxe suite with attached bath and study desk.',
    },
    {
      roomNumber: 'S-102',
      floor: 1,
      wing: 'East',
      positionX: 2,
      positionY: 1,
      type: RoomType.SINGLE,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 1,
      priceMonthly: 11000,
      securityDeposit: 12000,
      status: RoomStatus.FULL,
      amenities: ['Attached Bath', 'Study Desk', 'Full Wardrobe', 'High-Speed Wi-Fi'],
      description: 'Cozy single room with personal washroom and ergonomic study station.',
    },
    // Floor 1 - West Wing
    {
      roomNumber: 'DORM-103',
      floor: 1,
      wing: 'West',
      positionX: 1,
      positionY: 1,
      type: RoomType.DORMITORY,
      sharing: SharingType.FOUR_SHARING,
      capacity: 4,
      occupiedBeds: 3,
      priceMonthly: 6500,
      securityDeposit: 7000,
      status: RoomStatus.AVAILABLE,
      amenities: ['Central Air-Cooling', '4 Personal Steel Lockers', 'Dual Attached Baths', 'Bunk Beds with Ortho Mattresses'],
      description: 'Spacious 4-bed executive dormitory with personal locker stations.',
    },
    {
      roomNumber: 'DORM-104',
      floor: 1,
      wing: 'West',
      positionX: 2,
      positionY: 1,
      type: RoomType.DORMITORY,
      sharing: SharingType.SIX_SHARING,
      capacity: 6,
      occupiedBeds: 6,
      priceMonthly: 5200,
      securityDeposit: 6000,
      status: RoomStatus.FULL,
      amenities: ['Ceiling Fans', '6 Lockers', 'Triple Washrooms', 'Large Study Table'],
      description: 'Community 6-bed dormitory with ample ventilation and study desks.',
    },

    // Floor 2 - East Wing
    {
      roomNumber: 'D-201',
      floor: 2,
      wing: 'East',
      positionX: 1,
      positionY: 1,
      type: RoomType.DELUXE,
      sharing: SharingType.DOUBLE,
      capacity: 2,
      occupiedBeds: 1,
      priceMonthly: 9800,
      securityDeposit: 10000,
      status: RoomStatus.AVAILABLE,
      amenities: ['1.5 Ton Split AC', 'Attached Bath with Geyser', 'Dual Study Stations', 'Separate Full Wardrobes'],
      description: 'Deluxe double sharing room with split AC and modern bathroom.',
    },
    {
      roomNumber: 'S-202',
      floor: 2,
      wing: 'East',
      positionX: 2,
      positionY: 1,
      type: RoomType.SINGLE,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 0,
      priceMonthly: 12000,
      securityDeposit: 12000,
      status: RoomStatus.AVAILABLE,
      amenities: ['Inverter Split AC', 'Attached Bath', 'Study Desk', 'LAN Port'],
      description: 'Premium single AC room on 2nd floor.',
    },
    // Floor 2 - West Wing
    {
      roomNumber: 'DORM-203',
      floor: 2,
      wing: 'West',
      positionX: 1,
      positionY: 1,
      type: RoomType.DORMITORY,
      sharing: SharingType.FOUR_SHARING,
      capacity: 4,
      occupiedBeds: 2,
      priceMonthly: 6800,
      securityDeposit: 7000,
      status: RoomStatus.AVAILABLE,
      amenities: ['Air Conditioner', '4 Lockers', 'Attached Washroom', 'High-Speed Wi-Fi'],
      description: 'Air-conditioned 4-sharing dormitory.',
    },
    {
      roomNumber: 'DORM-204',
      floor: 2,
      wing: 'West',
      positionX: 2,
      positionY: 1,
      type: RoomType.DORMITORY,
      sharing: SharingType.FOUR_SHARING,
      capacity: 4,
      occupiedBeds: 0,
      priceMonthly: 6800,
      securityDeposit: 7000,
      status: RoomStatus.UNDER_MAINTENANCE,
      amenities: ['Air Conditioner', '4 Lockers', 'Under Renovation'],
      description: 'Scheduled AC overhaul and fresh paint.',
    },

    // Floor 3 - East Wing (Penthouse Suites)
    {
      roomNumber: 'D-301',
      floor: 3,
      wing: 'East',
      positionX: 1,
      positionY: 1,
      type: RoomType.DELUXE,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 1,
      priceMonthly: 18500,
      securityDeposit: 20000,
      status: RoomStatus.FULL,
      amenities: ['Dual Split AC', 'Private Sunset Terrace', 'Queen Size Bed', 'Smart TV', 'Jacuzzi Bath'],
      description: 'Exclusive executive suite with private terrace and panoramic views.',
    },
    {
      roomNumber: 'D-302',
      floor: 3,
      wing: 'East',
      positionX: 2,
      positionY: 1,
      type: RoomType.DELUXE,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 0,
      priceMonthly: 17500,
      securityDeposit: 20000,
      status: RoomStatus.AVAILABLE,
      amenities: ['Inverter AC', 'Terrace Deck', 'Attached Designer Bath', 'Mini Refrigerator'],
      description: 'Top floor luxury studio with private balcony.',
    },
    // Floor 3 - West Wing
    {
      roomNumber: 'S-303',
      floor: 3,
      wing: 'West',
      positionX: 1,
      positionY: 1,
      type: RoomType.SINGLE,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 0,
      priceMonthly: 12500,
      securityDeposit: 13000,
      status: RoomStatus.AVAILABLE,
      amenities: ['Inverter AC', 'Attached Bath', 'Study Desk', 'Balcony'],
      description: 'Quiet corner single studio on 3rd floor.',
    },
  ];

  for (const r of saltmereRooms) {
    await prisma.room.upsert({
      where: { roomNumber: r.roomNumber },
      create: {
        ...r,
        hostelId: hostel1.id,
        images: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'],
      },
      update: {
        hostelId: hostel1.id,
        floor: r.floor,
        wing: r.wing,
        positionX: r.positionX,
        positionY: r.positionY,
        type: r.type,
        sharing: r.sharing,
        capacity: r.capacity,
        occupiedBeds: r.occupiedBeds,
        status: r.status,
        amenities: r.amenities,
      },
    });
  }

  // 5. Seed rooms for Aura Heights Metro Campus
  const auraRooms = [
    {
      roomNumber: 'AH-101',
      floor: 1,
      wing: 'East',
      positionX: 1,
      type: RoomType.SINGLE,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 1,
      priceMonthly: 12000,
      securityDeposit: 12000,
      status: RoomStatus.FULL,
      amenities: ['AC', 'Attached Bath', 'LAN Port', 'Study Desk'],
      description: 'Single studio near Tech Park.',
    },
    {
      roomNumber: 'AH-102',
      floor: 1,
      wing: 'West',
      positionX: 1,
      type: RoomType.DORMITORY,
      sharing: SharingType.FOUR_SHARING,
      capacity: 4,
      occupiedBeds: 2,
      priceMonthly: 7000,
      securityDeposit: 8000,
      status: RoomStatus.AVAILABLE,
      amenities: ['AC', 'Personal Lockers', 'Dual Bath', 'Study Desk'],
      description: 'Modern 4-bed dorm with individual power pods.',
    },
    {
      roomNumber: 'AH-201',
      floor: 2,
      wing: 'East',
      positionX: 1,
      type: RoomType.DELUXE,
      sharing: SharingType.DOUBLE,
      capacity: 2,
      occupiedBeds: 0,
      priceMonthly: 10500,
      securityDeposit: 11000,
      status: RoomStatus.AVAILABLE,
      amenities: ['Inverter AC', 'Attached Bath', 'Balcony', 'Wardrobes'],
      description: 'Twin sharing deluxe room on second floor.',
    },
  ];

  for (const r of auraRooms) {
    await prisma.room.upsert({
      where: { roomNumber: r.roomNumber },
      create: {
        ...r,
        hostelId: hostel2.id,
        positionY: 1,
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
      },
      update: {
        hostelId: hostel2.id,
        floor: r.floor,
        wing: r.wing,
        positionX: r.positionX,
        type: r.type,
        sharing: r.sharing,
        capacity: r.capacity,
        occupiedBeds: r.occupiedBeds,
        status: r.status,
        amenities: r.amenities,
      },
    });
  }

  console.log('Hostels and 2D Rooms seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
