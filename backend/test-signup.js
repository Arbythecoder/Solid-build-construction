const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

const testSignups = async () => {
    const roles = [
        {
            role: 'landlord',
            data: {
                name: 'Test Landlord',
                email: `landlord-${Date.now()}@test.com`,
                password: 'Test@123',
                phone: '+2349012345678',
                address: '123 Test Street, Lagos',
                numberOfProperties: '1-5',
                propertyTypes: ['Apartment', 'House'],
                hearAboutUs: 'Google'
            }
        },
        {
            role: 'tenant',
            data: {
                name: 'Test Tenant',
                email: `tenant-${Date.now()}@test.com`,
                password: 'Test@123',
                phone: '+2349012345679',
                occupation: 'Engineer',
                employer: 'Tech Corp',
                monthlyIncome: '100k-250k',
                preferredLocation: 'Lekki',
                moveInDate: '2026-03-01'
            }
        },
        {
            role: 'investor',
            data: {
                name: 'Test Investor',
                email: `investor-${Date.now()}@test.com`,
                password: 'Test@123',
                phone: '+2349012345680',
                occupation: 'Business Owner',
                investmentBudget: '10m-25m',
                investmentGoal: 'Capital appreciation',
                riskTolerance: 'moderate',
                investmentHorizon: '5-10 years'
            }
        },
        {
            role: 'agent',
            data: {
                name: 'Test Agent',
                email: `agent-${Date.now()}@test.com`,
                password: 'Test@123',
                phone: '+2349012345681',
                yearsOfExperience: '3-5',
                currentEmployer: 'Real Estate Co',
                licenseNumber: 'REN12345',
                specialization: ['Residential Sales'],
                motivation: 'Career growth'
            }
        }
    ];

    console.log('🧪 Starting Signup Tests...\n');

    for (const test of roles) {
        try {
            console.log(`Testing ${test.role.toUpperCase()} signup...`);
            const response = await axios.post(`${API_URL}/auth/register`, {
                ...test.data,
                role: test.role
            });

            if (response.data.success) {
                console.log(`✅ ${test.role} signup successful`);
                console.log(`   User ID: ${response.data.user.id}`);
                console.log(`   Email: ${response.data.user.email}`);
                console.log(`   Phone: ${response.data.user.phone || 'Not provided'}`);
                if (test.role === 'investor' && response.data.user.investorToken) {
                    console.log(`   Investor Token: ${response.data.user.investorToken}`);
                }
                console.log(`   Token: ${response.data.token.substring(0, 30)}...`);
            } else {
                console.log(`⚠️  ${test.role} signup returned no success flag`);
            }
        } catch (error) {
            console.log(`❌ ${test.role} signup failed`);
            if (error.response?.data) {
                console.log(`   Error: ${error.response.data.message || JSON.stringify(error.response.data)}`);
            } else {
                console.log(`   Error: ${error.message}`);
            }
        }
        console.log('');
    }

    console.log('🎉 Signup tests complete!');
};

testSignups().catch(console.error);
