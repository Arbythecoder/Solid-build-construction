require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User');
const Property = require('./models/Property');

// Property images (using placeholder luxury property images)
const propertyImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800'
];

// Seed data
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});
    console.log('Cleared existing data...');

    // Create Admin user
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const admin = await User.create({
      name: 'Afodams Admin',
      email: 'admin@afodamsproperty.com',
      password: adminPassword,
      role: 'admin',
      verified: true,
      phone: '+234 801 234 5678'
    });
    console.log('Admin user created:', admin.email);

    // Create Landlord users
    const landlordPassword = await bcrypt.hash('Landlord@123', 10);

    const landlord1 = await User.create({
      name: 'Chief Adebayo Williams',
      email: 'landlord1@afodams.com',
      password: landlordPassword,
      role: 'landlord',
      verified: true,
      phone: '+234 802 345 6789'
    });

    const landlord2 = await User.create({
      name: 'Mrs. Chidinma Okonkwo',
      email: 'landlord2@afodams.com',
      password: landlordPassword,
      role: 'landlord',
      verified: true,
      phone: '+234 803 456 7890'
    });

    const landlord3 = await User.create({
      name: 'Alhaji Musa Ibrahim',
      email: 'landlord3@afodams.com',
      password: landlordPassword,
      role: 'landlord',
      verified: true,
      phone: '+234 804 567 8901'
    });

    console.log('Landlord users created...');

    // Create a tenant for testing
    const tenantPassword = await bcrypt.hash('Tenant@123', 10);
    await User.create({
      name: 'John Tenant',
      email: 'tenant@afodams.com',
      password: tenantPassword,
      role: 'tenant',
      verified: true,
      phone: '+234 805 678 9012'
    });
    console.log('Tenant user created...');

    // Properties in Gbagada Estate, Lagos (3 properties)
    const gbagadaProperties = [
      {
        title: 'Luxury 4 Bedroom Duplex in Gbagada Estate',
        description: 'Exquisite 4 bedroom fully detached duplex in the serene Gbagada Estate. Features include modern architecture, spacious living areas, fitted kitchen with granite tops, all rooms ensuite, ample parking space, 24/7 security, and a beautiful garden. Perfect for families seeking comfort and luxury in a prime Lagos location.',
        type: 'house',
        status: 'available',
        isPremium: true,
        price: 85000000,
        location: {
          address: '15 Gbagada Estate Close',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Gbagada'
        },
        features: {
          bedrooms: 4,
          bathrooms: 5,
          parkingSpaces: 3,
          furnished: true,
          airConditioned: true,
          swimmingPool: false,
          gym: false,
          security: true
        },
        images: [
          { url: propertyImages[0], isPrimary: true },
          { url: propertyImages[1], isPrimary: false }
        ],
        owner: landlord1._id,
        views: 156
      },
      {
        title: 'Modern 3 Bedroom Flat in Gbagada Phase 2',
        description: 'Newly built 3 bedroom apartment in Gbagada Phase 2. Features include POP ceiling, quality tiles, modern bathroom fittings, spacious rooms, balcony with city view, water heater, and dedicated parking. Located in a gated estate with 24-hour security. Close to schools, markets, and major roads.',
        type: 'apartment',
        status: 'available',
        isPremium: false,
        price: 35000000,
        location: {
          address: '8 Phase 2 Road, Gbagada',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Gbagada'
        },
        features: {
          bedrooms: 3,
          bathrooms: 3,
          parkingSpaces: 2,
          furnished: false,
          airConditioned: true,
          swimmingPool: false,
          gym: false,
          security: true
        },
        images: [
          { url: propertyImages[2], isPrimary: true },
          { url: propertyImages[3], isPrimary: false }
        ],
        owner: landlord1._id,
        views: 89
      },
      {
        title: 'Executive 5 Bedroom Mansion in Gbagada',
        description: 'Magnificent 5 bedroom mansion sitting on 800sqm in the heart of Gbagada. This property boasts of Italian marble flooring, smart home features, cinema room, private swimming pool, boys quarters, and a beautiful landscape garden. A true definition of luxury living in Lagos.',
        type: 'luxury',
        status: 'featured',
        isPremium: true,
        price: 250000000,
        location: {
          address: '1 Premium Estate, Gbagada',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Gbagada'
        },
        features: {
          bedrooms: 5,
          bathrooms: 6,
          parkingSpaces: 5,
          furnished: true,
          airConditioned: true,
          swimmingPool: true,
          gym: true,
          security: true
        },
        images: [
          { url: propertyImages[4], isPrimary: true },
          { url: propertyImages[5], isPrimary: false }
        ],
        owner: landlord1._id,
        views: 342
      }
    ];

    // Properties in Ikeja/Allen, Lagos (3 properties)
    const ikejaProperties = [
      {
        title: 'Stunning 4 Bedroom Terrace in Allen Avenue',
        description: 'Beautiful 4 bedroom terrace duplex on Allen Avenue, Ikeja. Features contemporary design, open-plan living area, modern kitchen, quality finishes throughout, all rooms ensuite, private compound, and CCTV security. Walking distance to Ikeja City Mall and excellent road network.',
        type: 'house',
        status: 'available',
        isPremium: true,
        price: 95000000,
        location: {
          address: '22 Allen Avenue',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Ikeja'
        },
        features: {
          bedrooms: 4,
          bathrooms: 4,
          parkingSpaces: 2,
          furnished: false,
          airConditioned: true,
          swimmingPool: false,
          gym: false,
          security: true
        },
        images: [
          { url: propertyImages[6], isPrimary: true },
          { url: propertyImages[0], isPrimary: false }
        ],
        owner: landlord2._id,
        views: 203
      },
      {
        title: 'Serviced 2 Bedroom Apartment in Ikeja GRA',
        description: 'Fully serviced 2 bedroom luxury apartment in the prestigious Ikeja GRA. Comes with 24/7 power supply, treated water, gym access, swimming pool, professional management, and top-notch security. Perfect for expatriates and corporate executives seeking comfort.',
        type: 'apartment',
        status: 'available',
        isPremium: true,
        price: 45000000,
        location: {
          address: '5 Joel Ogunnaike Street, Ikeja GRA',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Ikeja'
        },
        features: {
          bedrooms: 2,
          bathrooms: 2,
          parkingSpaces: 1,
          furnished: true,
          airConditioned: true,
          swimmingPool: true,
          gym: true,
          security: true
        },
        images: [
          { url: propertyImages[1], isPrimary: true },
          { url: propertyImages[2], isPrimary: false }
        ],
        owner: landlord2._id,
        views: 178
      },
      {
        title: 'Commercial Property on Allen Avenue',
        description: 'Prime commercial property on the bustling Allen Avenue, Ikeja. 4-storey building with elevator, open floor plan ideal for office space, banking hall, or showroom. High visibility location with heavy foot traffic. Document intact with C of O.',
        type: 'commercial',
        status: 'available',
        isPremium: false,
        price: 450000000,
        location: {
          address: '45 Allen Avenue',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Ikeja'
        },
        features: {
          bedrooms: 0,
          bathrooms: 8,
          parkingSpaces: 20,
          furnished: false,
          airConditioned: true,
          swimmingPool: false,
          gym: false,
          security: true
        },
        images: [
          { url: propertyImages[3], isPrimary: true },
          { url: propertyImages[4], isPrimary: false }
        ],
        owner: landlord2._id,
        views: 95
      }
    ];

    // Properties in Ogba, Lagos (3 properties)
    const ogbaProperties = [
      {
        title: 'Affordable 3 Bedroom Bungalow in Ogba',
        description: 'Well-maintained 3 bedroom bungalow in Ogba. Features include spacious compound, modern tiles, ceiling fans, prepaid meter, good road network, and friendly neighborhood. Close to Ogba Bus Stop, markets, and schools. Perfect starter home for young families.',
        type: 'house',
        status: 'available',
        isPremium: false,
        price: 28000000,
        location: {
          address: '12 Oke-Ira Road, Ogba',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Ogba'
        },
        features: {
          bedrooms: 3,
          bathrooms: 2,
          parkingSpaces: 2,
          furnished: false,
          airConditioned: false,
          swimmingPool: false,
          gym: false,
          security: true
        },
        images: [
          { url: propertyImages[5], isPrimary: true },
          { url: propertyImages[6], isPrimary: false }
        ],
        owner: landlord3._id,
        views: 67
      },
      {
        title: 'Newly Built 4 Bedroom Duplex in Ogba',
        description: 'Brand new 4 bedroom semi-detached duplex in a gated estate in Ogba. Modern architecture, quality finishing, fitted kitchen, all rooms ensuite, spacious living room, balcony, and boys quarters. Located in a serene environment with excellent security.',
        type: 'house',
        status: 'available',
        isPremium: true,
        price: 65000000,
        location: {
          address: '3 Harmony Estate, Ogba',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Ogba'
        },
        features: {
          bedrooms: 4,
          bathrooms: 5,
          parkingSpaces: 2,
          furnished: false,
          airConditioned: true,
          swimmingPool: false,
          gym: false,
          security: true
        },
        images: [
          { url: propertyImages[7], isPrimary: true },
          { url: propertyImages[8], isPrimary: false }
        ],
        owner: landlord3._id,
        views: 124
      },
      {
        title: 'Plot of Land in Ogba Industrial Area',
        description: 'Strategic plot of land measuring 1200sqm in Ogba Industrial area. Ideal for warehouse, factory, or commercial development. Fenced and gated with valid documentation. Easy access to major highways and close to industrial hubs. Serious buyers only.',
        type: 'land',
        status: 'available',
        isPremium: false,
        price: 75000000,
        location: {
          address: 'Industrial Layout, Ogba',
          city: 'Lagos',
          state: 'Lagos',
          area: 'Ogba'
        },
        features: {
          bedrooms: 0,
          bathrooms: 0,
          parkingSpaces: 0,
          furnished: false,
          airConditioned: false,
          swimmingPool: false,
          gym: false,
          security: true
        },
        images: [
          { url: propertyImages[8], isPrimary: true },
          { url: propertyImages[0], isPrimary: false }
        ],
        owner: landlord3._id,
        views: 45
      }
    ];

    // Insert all properties
    const allProperties = [...gbagadaProperties, ...ikejaProperties, ...ogbaProperties];
    await Property.insertMany(allProperties);

    console.log(`\n✅ Seed completed successfully!`);
    console.log(`📊 Created:`);
    console.log(`   - 1 Admin user`);
    console.log(`   - 3 Landlord users`);
    console.log(`   - 1 Tenant user`);
    console.log(`   - ${allProperties.length} Properties`);
    console.log(`\n🔑 Login Credentials:`);
    console.log(`   Admin: admin@afodamsproperty.com / Admin@123`);
    console.log(`   Landlord: landlord1@afodams.com / Landlord@123`);
    console.log(`   Tenant: tenant@afodams.com / Tenant@123`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
