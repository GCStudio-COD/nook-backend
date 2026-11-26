import { PrismaClient, RoomType, SharingType, RoomStatus, ServiceType, UrgencyLevel, ServiceStatus, PaymentType, PaymentStatus, AdmissionStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.payment.deleteMany({});
  await prisma.serviceRequest.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.admission.deleteMany({});
  await prisma.facility.deleteMany({});
  await prisma.room.deleteMany({});

  console.log('Seeding facilities...');
  await prisma.facility.createMany({
    data: [
      {
        name: 'Gigabit Wi-Fi 6',
        category: 'Connectivity',
        description: 'Blazing fast 500+ Mbps fiber internet across all rooms, study lounges, and corridors with zero dead zones.',
        icon: 'Wifi',
        timing: '24/7 Unlimited',
        isIncluded: true,
        features: ['500 Mbps Speed', 'Mesh coverage on all floors', 'Backup secondary ISP', 'Low latency for study & gaming'],
      },
      {
        name: 'Modern Gymnasium & Cardio Studio',
        category: 'Fitness & Health',
        description: 'Fully equipped fitness zone with treadmills, free weights, cross-trainers, and yoga mats.',
        icon: 'Dumbbell',
        timing: '05:30 AM - 10:30 PM',
        isIncluded: true,
        features: ['Treadmills & Ellipticals', 'Free weights up to 40kg', 'Yoga & Stretch zone', 'Certified morning instructor'],
      },
      {
        name: '24/7 Uninterrupted Power Backup',
        category: 'Essentials',
        description: 'Heavy-duty silent diesel generator and online industrial UPS guarantee 100% uninterrupted electricity for ACs, Wi-Fi, and lights.',
        icon: 'Zap',
        timing: '24/7 Automatic Cutover',
        isIncluded: true,
        features: ['Dual 125 KVA DG Sets', 'Instant 5-second automatic switch', 'Powers ACs & water heaters', 'Zero blackout guarantee'],
      },
      {
        name: 'Nutritious 4-Meal Mess & Cafeteria',
        category: 'Dining',
        description: 'Hygienic multi-cuisine dining hall serving wholesome Breakfast, Lunch, Evening Snacks with Tea/Coffee, and Dinner.',
        icon: 'Utensils',
        timing: '07:30 AM - 10:00 PM',
        isIncluded: true,
        features: ['Pure RO filtered cooking water', 'Unlimited servings', 'Special Sunday feast', 'Weekly changing curated menu'],
      },
      {
        name: 'Silent Study Pods & Library',
        category: 'Academic',
        description: 'Sound-dampened dedicated study hall equipped with ergonomic chairs, individual plug points, and high-speed Wi-Fi.',
        icon: 'BookOpen',
        timing: '24/7 Open',
        isIncluded: true,
        features: ['Individual study cubicles', 'Ergonomic mesh chairs', 'Dedicated charging sockets', 'Zero disturbance zone'],
      },
      {
        name: 'CCTV & Biometric Facial Security',
        category: 'Safety',
        description: 'High-definition 360-degree security surveillance with AI entry-exit facial recognition and 24/7 security guard patrol.',
        icon: 'ShieldCheck',
        timing: '24/7 Monitored',
        isIncluded: true,
        features: ['64 HD CCTV Cameras', 'Biometric turnstile entry', 'Security guard desk 24/7', 'Visitor registry log'],
      },
      {
        name: 'Automatic Laundry & Steam Ironing',
        category: 'Hygiene & Care',
        description: 'Modern front-load commercial washing machines and steam pressing station for all residents.',
        icon: 'Sparkles',
        timing: '07:00 AM - 09:00 PM',
        isIncluded: true,
        features: ['4 Commercial Washers & Dryers', 'Dedicated steam iron station', 'Scheduled hostel laundry pickup', 'Fabric softener included'],
      },
      {
        name: 'UV + RO Mineral Water Stations',
        category: 'Health',
        description: 'Industrial 1000 LPH multi-stage Reverse Osmosis with UV purification & temperature controllers on every single floor.',
        icon: 'Coffee',
        timing: '24/7 Available',
        isIncluded: true,
        features: ['Chilled, Normal & Hot dispensing', 'TDS < 80 guaranteed', 'Bi-weekly filter sterilization', 'Available on every floor'],
      },
    ],
  });

  console.log('Seeding rooms...');
  const room1 = await prisma.room.create({
    data: {
      roomNumber: 'D-101',
      floor: 1,
      type: RoomType.DELUXE_AC,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 0,
      priceMonthly: 14500,
      securityDeposit: 15000,
      amenities: ['Inverter Split AC', 'Attached Designer Bath', 'Ceiling Fan', 'King Single Bed & Ortho Mattress', 'Custom Study Desk & Bookshelf', 'Wardrobe with Digital Locker', 'Smart LED TV', 'Mini Refrigerator'],
      images: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Ultra-luxurious private single room with custom acoustic isolation, premium split air-conditioner, and individual ensuite bathroom.',
      status: RoomStatus.AVAILABLE,
    },
  });

  const room2 = await prisma.room.create({
    data: {
      roomNumber: 'D-202',
      floor: 2,
      type: RoomType.DELUXE_AC,
      sharing: SharingType.DOUBLE,
      capacity: 2,
      occupiedBeds: 1,
      priceMonthly: 9800,
      securityDeposit: 10000,
      amenities: ['1.5 Ton Split AC', 'Attached Bathroom with Geyser', 'Dual Study Stations', 'Separate Full Wardrobes', 'High-speed LAN Ports', 'Large Panoramic Window'],
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Spacious Deluxe 2-sharing room with high-efficiency inverter AC, individual ergonomic study desks, and premium attached bathroom.',
      status: RoomStatus.AVAILABLE,
    },
  });

  const room3 = await prisma.room.create({
    data: {
      roomNumber: 'SD-305',
      floor: 3,
      type: RoomType.SUPER_DELUXE_AC,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 0,
      priceMonthly: 18500,
      securityDeposit: 20000,
      amenities: ['Dual Split AC & Climate Control', 'Jacuzzi Style Bath & Rain Shower', 'Private Sunset Terrace', 'Queen Size Bed', 'Lounge Sofa & Coffee Table', 'High-End 50" 4K Smart TV', 'Double Door Wardrobe'],
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Exclusive Executive Suite on the top floor with private terrace deck, rainfall shower, lounge furniture, and hotel-grade comforts.',
      status: RoomStatus.AVAILABLE,
    },
  });

  const room4 = await prisma.room.create({
    data: {
      roomNumber: 'N-108',
      floor: 1,
      type: RoomType.NORMAL_NON_AC,
      sharing: SharingType.DOUBLE,
      capacity: 2,
      occupiedBeds: 1,
      priceMonthly: 6800,
      securityDeposit: 7000,
      amenities: ['High-speed BLDC Ceiling Fan', 'Attached Bathroom', 'Dual Wardrobes', 'Study Tables with Lamps', 'Cross Ventilation Windows', 'Shoe Rack'],
      images: [
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Well-ventilated and breezy standard double-sharing room with attached bathroom, solid wooden study units, and natural sunlight.',
      status: RoomStatus.AVAILABLE,
    },
  });

  const room5 = await prisma.room.create({
    data: {
      roomNumber: 'N-204',
      floor: 2,
      type: RoomType.NORMAL_NON_AC,
      sharing: SharingType.SINGLE,
      capacity: 1,
      occupiedBeds: 0,
      priceMonthly: 8500,
      securityDeposit: 9000,
      amenities: ['High-speed BLDC Fan', 'Attached Bathroom with Geyser', 'Study Desk', 'Lockable Wooden Wardrobe', 'Balcony Access', 'Full Length Mirror'],
      images: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Comfortable private non-AC single room for quiet study and personal focus with attached bath and private balcony.',
      status: RoomStatus.AVAILABLE,
    },
  });

  const room6 = await prisma.room.create({
    data: {
      roomNumber: 'S-302',
      floor: 3,
      type: RoomType.STANDARD_NON_AC,
      sharing: SharingType.TRIPLE,
      capacity: 3,
      occupiedBeds: 2,
      priceMonthly: 5200,
      securityDeposit: 5500,
      amenities: ['Dual Ceiling Fans', 'Common Clean Washroom Hub', '3 Personal Lockers', 'Triple Study Units', 'Shoe Cabinets', 'Air Cooler Hookup'],
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Budget-friendly student 3-sharing room with individual lockers, dedicated study desks, and regular daily housekeeping.',
      status: RoomStatus.AVAILABLE,
    },
  });

  const room7 = await prisma.room.create({
    data: {
      roomNumber: 'D-206',
      floor: 2,
      type: RoomType.DELUXE_AC,
      sharing: SharingType.DOUBLE,
      capacity: 2,
      occupiedBeds: 2,
      priceMonthly: 9800,
      securityDeposit: 10000,
      amenities: ['Split AC', 'Attached Bath', 'Balcony', 'Study Table', 'Smart TV'],
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      ],
      description: 'Fully occupied Deluxe room.',
      status: RoomStatus.FULL,
    },
  });

  console.log('Seeding bookings & admissions...');
  const admission1 = await prisma.admission.create({
    data: {
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      gender: 'Male',
      dateOfBirth: '2004-05-14',
      collegeOrWork: 'Tech Institute of Engineering (B.Tech CS)',
      guardianName: 'Rajesh Sharma',
      guardianPhone: '+91 98111 22334',
      address: 'House 42, Sector 15, Chandigarh',
      idProofType: 'Aadhaar Card',
      idProofNumber: '7845-9821-3401',
      roomTypePreference: RoomType.DELUXE_AC,
      foodPreference: 'Vegetarian',
      status: AdmissionStatus.ADMITTED,
      assignedRoomId: room2.id,
      notes: 'Verified documents and advance paid.',
      admittedAt: new Date(),
    },
  });

  const admission2 = await prisma.admission.create({
    data: {
      fullName: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 98222 33445',
      gender: 'Female',
      dateOfBirth: '2003-11-20',
      collegeOrWork: 'National Design Academy',
      guardianName: 'Kirit Patel',
      guardianPhone: '+91 98222 99887',
      address: '203 Sunrise Tower, Ahmedabad, Gujarat',
      idProofType: 'Passport',
      idProofNumber: 'P8923011',
      roomTypePreference: RoomType.SUPER_DELUXE_AC,
      foodPreference: 'Vegetarian',
      status: AdmissionStatus.APPROVED,
      notes: 'Approved by Warden. Pending final check-in.',
    },
  });

  const admission3 = await prisma.admission.create({
    data: {
      fullName: 'Rohan Deshmukh',
      email: 'rohan.deshmukh@example.com',
      phone: '+91 97665 11223',
      gender: 'Male',
      dateOfBirth: '2005-02-18',
      collegeOrWork: 'Apex Medical College',
      guardianName: 'Anil Deshmukh',
      guardianPhone: '+91 97665 88990',
      address: 'Flat 12, Lotus Park, Pune, Maharashtra',
      idProofType: 'Student ID',
      idProofNumber: 'MED-2025-089',
      roomTypePreference: RoomType.NORMAL_NON_AC,
      foodPreference: 'Non-Vegetarian',
      status: AdmissionStatus.PENDING,
      notes: 'New admission request submitted via website.',
    },
  });

  const booking1 = await prisma.booking.create({
    data: {
      bookingNumber: 'HST-2026-001',
      residentName: 'Aarav Sharma',
      residentEmail: 'aarav.sharma@example.com',
      residentPhone: '+91 98765 43210',
      roomId: room2.id,
      checkInDate: new Date('2026-10-01'),
      tenureMonths: 6,
      monthlyRent: 9800,
      securityDeposit: 10000,
      totalAmount: 19800,
      status: 'CONFIRMED',
    },
  });

  console.log('Seeding service requests...');
  await prisma.serviceRequest.createMany({
    data: [
      {
        residentName: 'Aarav Sharma',
        residentPhone: '+91 98765 43210',
        roomNumber: 'D-202',
        serviceType: ServiceType.ROOM_CLEANING,
        preferredDate: new Date('2026-10-21'),
        timeSlot: '09:00 AM - 11:00 AM',
        urgency: UrgencyLevel.NORMAL,
        instructions: 'Please sweep, mop with floor disinfectant, and clean the attached bathroom mirrors.',
        status: ServiceStatus.ASSIGNED,
        assignedStaff: 'Ramesh Kumar (Housekeeping)',
      },
      {
        residentName: 'Kunal Verma',
        residentPhone: '+91 98333 44556',
        roomNumber: 'S-302',
        serviceType: ServiceType.AC_MAINTENANCE,
        preferredDate: new Date('2026-10-21'),
        timeSlot: '02:00 PM - 04:00 PM',
        urgency: UrgencyLevel.HIGH,
        instructions: 'AC filter cleaning and cooling check needed before weekend exams.',
        status: ServiceStatus.REQUESTED,
        assignedStaff: null,
      },
      {
        residentName: 'Vikram Mehta',
        residentPhone: '+91 98444 55667',
        roomNumber: 'N-108',
        serviceType: ServiceType.LAUNDRY,
        preferredDate: new Date('2026-10-20'),
        timeSlot: '04:00 PM - 06:00 PM',
        urgency: UrgencyLevel.NORMAL,
        instructions: '2 bedsheets, 2 pillow covers, and 4 shirts for steam wash & fold.',
        status: ServiceStatus.COMPLETED,
        assignedStaff: 'Sunita Devi (Laundry Care)',
        resolutionNotes: 'Clothes washed, ironed, and delivered to room.',
      },
      {
        residentName: 'Deepak Joshi',
        residentPhone: '+91 98555 66778',
        roomNumber: 'D-101',
        serviceType: ServiceType.PLUMBING,
        preferredDate: new Date('2026-10-21'),
        timeSlot: '11:00 AM - 01:00 PM',
        urgency: UrgencyLevel.EMERGENCY,
        instructions: 'Bathroom faucet has a slight leak, needs washer replacement.',
        status: ServiceStatus.REQUESTED,
        assignedStaff: null,
      },
    ],
  });

  console.log('Seeding payments...');
  await prisma.payment.createMany({
    data: [
      {
        transactionId: 'TXN-HOSTEL-90214',
        invoiceNumber: 'INV-2026-1001',
        bookingId: booking1.id,
        payerName: 'Aarav Sharma',
        payerEmail: 'aarav.sharma@example.com',
        amount: 19800,
        paymentType: PaymentType.ROOM_RENT,
        paymentMethod: 'UPI (GPay / PhonePe)',
        status: PaymentStatus.SUCCESS,
        paidAt: new Date('2026-10-01T10:30:00Z'),
      },
      {
        transactionId: 'TXN-HOSTEL-90215',
        invoiceNumber: 'INV-2026-1002',
        payerName: 'Priya Patel',
        payerEmail: 'priya.patel@example.com',
        amount: 2500,
        paymentType: PaymentType.ADMISSION_FEE,
        paymentMethod: 'Credit Card (Visa)',
        status: PaymentStatus.SUCCESS,
        paidAt: new Date('2026-10-18T14:15:00Z'),
      },
      {
        transactionId: 'TXN-HOSTEL-90216',
        invoiceNumber: 'INV-2026-1003',
        payerName: 'Vikram Mehta',
        payerEmail: 'vikram.m@example.com',
        amount: 350,
        paymentType: PaymentType.SERVICE_CHARGE,
        paymentMethod: 'UPI (Paytm)',
        status: PaymentStatus.SUCCESS,
        paidAt: new Date('2026-10-20T17:00:00Z'),
      },
    ],
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
