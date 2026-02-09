// Seed database with sample data
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Property = require('./models/Property');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Error:', error.message);
        process.exit(1);
    }
};

const sampleProperties = [
    {
        title: 'Luxury 5-Bedroom Villa with Ocean View',
        description: 'Stunning modern villa featuring panoramic ocean views, infinity pool, home theater, and smart home automation. Located in the prestigious Lekki Peninsula.',
        type: 'villa',
        listingType: 'For Sale',
        price: 250000000,
        location: {
            address: '15 Atlantic Boulevard',
            city: 'Lekki',
            state: 'Lagos',
            country: 'Nigeria'
        },
        features: {
            bedrooms: 5,
            bathrooms: 6,
            size: 550,
            furnished: true,
            parking: 4
        },
        amenities: ['Swimming Pool', 'Gym', 'Security', 'Generator', 'Air Conditioning', 'Garden', 'CCTV'],
        status: 'approved',
        images: [
            { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800' },
            { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' }
        ]
    },
    {
        title: 'Modern 3-Bedroom Apartment in Ikoyi',
        description: 'Contemporary apartment with floor-to-ceiling windows, Italian kitchen, and premium finishes in the heart of Ikoyi.',
        type: 'apartment',
        listingType: 'For Rent',
        price: 5000000,
        location: {
            address: '24 Bourdillon Road',
            city: 'Ikoyi',
            state: 'Lagos',
            country: 'Nigeria'
        },
        features: {
            bedrooms: 3,
            bathrooms: 4,
            size: 220,
            furnished: true,
            parking: 2
        },
        amenities: ['Security', 'Generator', 'Air Conditioning', 'Elevator', 'Gym'],
        status: 'approved',
        images: [
            { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' }
        ]
    },
    {
        title: '4-Bedroom Detached Duplex - Lekki Phase 1',
        description: 'Spacious family home with modern amenities, large compound, and excellent finishing.',
        type: 'house',
        listingType: 'For Sale',
        price: 120000000,
        location: {
            address: '12 Admiralty Way',
            city: 'Lekki Phase 1',
            state: 'Lagos',
            country: 'Nigeria'
        },
        features: {
            bedrooms: 4,
            bathrooms: 5,
            size: 350,
            furnished: false,
            parking: 3
        },
        amenities: ['Security', 'Generator', 'Parking', 'Garden', 'Balcony'],
        status: 'approved',
        images: [
            { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' }
        ]
    },
    {
        title: 'Commercial Office Space - Victoria Island',
        description: 'Prime office space in VI business district. Fully serviced with backup power and high-speed internet.',
        type: 'office',
        listingType: 'For Rent',
        price: 8000000,
        location: {
            address: '45 Adeola Odeku Street',
            city: 'Victoria Island',
            state: 'Lagos',
            country: 'Nigeria'
        },
        features: {
            bedrooms: 0,
            bathrooms: 4,
            size: 400,
            furnished: true,
            parking: 10
        },
        amenities: ['Security', 'Generator', 'Elevator', 'Air Conditioning', 'CCTV'],
        status: 'approved',
        images: [
            { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800' }
        ]
    },
    {
        title: '2-Bedroom Serviced Apartment - Ikeja',
        description: 'Fully furnished serviced apartment with daily housekeeping, gym access, and 24/7 security.',
        type: 'apartment',
        listingType: 'For Rent',
        price: 3500000,
        location: {
            address: '78 Allen Avenue',
            city: 'Ikeja',
            state: 'Lagos',
            country: 'Nigeria'
        },
        features: {
            bedrooms: 2,
            bathrooms: 2,
            size: 120,
            furnished: true,
            parking: 1
        },
        amenities: ['Security', 'Generator', 'Air Conditioning', 'Gym', 'Swimming Pool'],
        status: 'approved',
        images: [
            { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800' }
        ]
    },
    {
        title: 'Luxury Penthouse - Banana Island',
        description: 'Ultra-luxury penthouse with private elevator, rooftop terrace, and breathtaking lagoon views.',
        type: 'apartment',
        listingType: 'For Sale',
        price: 500000000,
        location: {
            address: 'Banana Island',
            city: 'Ikoyi',
            state: 'Lagos',
            country: 'Nigeria'
        },
        features: {
            bedrooms: 4,
            bathrooms: 5,
            size: 450,
            furnished: true,
            parking: 4
        },
        amenities: ['Swimming Pool', 'Gym', 'Security', 'Generator', 'Air Conditioning', 'CCTV', 'Elevator', 'Garden'],
        status: 'approved',
        isPremium: true,
        images: [
            { url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800' }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('\n🗑️  Cleaning database...');
        await User.deleteMany({});
        await Property.deleteMany({});
        console.log('✅ Database cleaned');

        console.log('\n👥 Creating users...');

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@afodams.com',
            password: 'Admin123!',
            phone: '08012345001',
            role: 'admin'
        });
        console.log('✅ Admin created: admin@solidbuild.com / Admin123!');

        // Create Landlords
        const landlord1 = await User.create({
            name: 'John Landlord',
            email: 'landlord@test.com',
            password: 'Test123456',
            phone: '08012345002',
            role: 'landlord'
        });
        console.log('✅ Landlord created: landlord@test.com / Test123456');

        const landlord2 = await User.create({
            name: 'Sarah Property Owner',
            email: 'sarah@properties.com',
            password: 'Test123456',
            phone: '08012345003',
            role: 'landlord'
        });

        // Create Tenant
        const tenant = await User.create({
            name: 'Mike Tenant',
            email: 'tenant@test.com',
            password: 'Test123456',
            phone: '08012345004',
            role: 'tenant'
        });
        console.log('✅ Tenant created: tenant@test.com / Test123456');

        // Create Investor
        const investor = await User.create({
            name: 'David Investor',
            email: 'investor@test.com',
            password: 'Test123456',
            phone: '08012345005',
            role: 'investor',
            investorToken: 'INV-' + Math.random().toString(36).substr(2, 12).toUpperCase()
        });
        console.log('✅ Investor created: investor@test.com / Test123456');

        // Create Agent
        const agent = await User.create({
            name: 'Lisa Agent',
            email: 'agent@test.com',
            password: 'Test123456',
            phone: '08012345006',
            role: 'agent'
        });
        console.log('✅ Agent created: agent@test.com / Test123456');

        console.log('\n🏠 Creating properties...');

        // Assign properties to landlords
        for (let i = 0; i < sampleProperties.length; i++) {
            const propertyData = {
                ...sampleProperties[i],
                owner: i < 3 ? landlord1._id : landlord2._id
            };
            await Property.create(propertyData);
            console.log(`✅ Created: ${sampleProperties[i].title}`);
        }

        // Create some pending properties
        await Property.create({
            title: 'Pending Property - Awaiting Approval',
            description: 'This property is pending approval from admin.',
            type: 'apartment',
            listingType: 'For Sale',
            price: 75000000,
            location: {
                address: '99 Test Street',
                city: 'Surulere',
                state: 'Lagos',
                country: 'Nigeria'
            },
            features: {
                bedrooms: 3,
                bathrooms: 3,
                size: 180,
                furnished: false,
                parking: 2
            },
            amenities: ['Security', 'Parking'],
            status: 'pending',
            owner: landlord1._id
        });
        console.log('✅ Created: Pending Property (for admin approval testing)');

        console.log('\n\n🎉 DATABASE SEEDED SUCCESSFULLY!\n');
        console.log('📋 TEST ACCOUNTS:');
        console.log('================================');
        console.log('Admin:     admin@solidbuild.com / Admin123!');
        console.log('Landlord:  landlord@test.com / Test123456');
        console.log('Tenant:    tenant@test.com / Test123456');
        console.log('Investor:  investor@test.com / Test123456');
        console.log('Agent:     agent@test.com / Test123456');
        console.log('================================\n');
        console.log('✅ Total Properties: ' + (sampleProperties.length + 1));
        console.log('✅ Approved: ' + sampleProperties.length);
        console.log('✅ Pending: 1\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed failed:', error.message);
        process.exit(1);
    }
};

seedDatabase();
