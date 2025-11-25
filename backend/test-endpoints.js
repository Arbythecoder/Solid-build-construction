// Test script for all API endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Colors for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, method, url, data = null, token = null) {
    try {
        const config = {
            method,
            url: `${BASE_URL}${url}`,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            data,
        };

        const response = await axios(config);
        log(`✅ ${name}: SUCCESS (${response.status})`, 'green');
        return { success: true, data: response.data };
    } catch (error) {
        const status = error.response?.status || 'No response';
        const message = error.response?.data?.message || error.message;
        log(`❌ ${name}: FAILED (${status}) - ${message}`, 'red');
        return { success: false, error: message };
    }
}

async function runTests() {
    log('\n🧪 STARTING API TESTS\n', 'blue');

    let landlordToken = null;
    let tenantToken = null;
    let propertyId = null;

    // ==================== AUTHENTICATION TESTS ====================
    log('\n📋 AUTHENTICATION TESTS', 'yellow');

    // Test 1: Register Landlord
    const registerResult = await testEndpoint(
        'Register Landlord',
        'POST',
        '/auth/register',
        {
            name: 'Test Landlord',
            email: `landlord_${Date.now()}@test.com`,
            password: 'Test123456',
            phone: '08012345678',
            role: 'landlord'
        }
    );

    if (registerResult.success) {
        landlordToken = registerResult.data.token;
    }

    // Test 2: Register Tenant
    const tenantRegister = await testEndpoint(
        'Register Tenant',
        'POST',
        '/auth/register',
        {
            name: 'Test Tenant',
            email: `tenant_${Date.now()}@test.com`,
            password: 'Test123456',
            phone: '08087654321',
            role: 'tenant'
        }
    );

    if (tenantRegister.success) {
        tenantToken = tenantRegister.data.token;
    }

    // Test 3: Login
    await testEndpoint(
        'Login Landlord',
        'POST',
        '/auth/login',
        {
            email: registerResult.data?.user?.email,
            password: 'Test123456'
        }
    );

    // ==================== PROPERTY TESTS ====================
    log('\n📋 PROPERTY TESTS', 'yellow');

    // Test 4: Create Property (requires auth)
    if (landlordToken) {
        const createProperty = await testEndpoint(
            'Create Property',
            'POST',
            '/properties',
            {
                title: 'Test Luxury Villa',
                description: 'Beautiful 5-bedroom villa in prime location',
                type: 'villa',
                listingType: 'For Sale',
                price: 150000000,
                location: {
                    address: '123 Test Street',
                    city: 'Lekki',
                    state: 'Lagos'
                },
                features: {
                    bedrooms: 5,
                    bathrooms: 6,
                    size: 450
                },
                amenities: ['Swimming Pool', 'Gym', 'Security']
            },
            landlordToken
        );

        if (createProperty.success) {
            propertyId = createProperty.data?.data?._id;
        }
    }

    // Test 5: Get All Properties
    await testEndpoint('Get All Properties', 'GET', '/properties');

    // Test 6: Get Property by ID
    if (propertyId) {
        await testEndpoint('Get Property by ID', 'GET', `/properties/${propertyId}`);
    }

    // Test 7: Update Property
    if (propertyId && landlordToken) {
        await testEndpoint(
            'Update Property',
            'PUT',
            `/properties/${propertyId}`,
            { price: 155000000 },
            landlordToken
        );
    }

    // ==================== LANDLORD TESTS ====================
    log('\n📋 LANDLORD TESTS', 'yellow');

    if (landlordToken) {
        // Test 8: Get Landlord Properties
        await testEndpoint('Get My Properties', 'GET', '/landlords/properties', null, landlordToken);

        // Test 9: Get Landlord Stats
        await testEndpoint('Get Landlord Stats', 'GET', '/landlords/stats', null, landlordToken);

        // Test 10: Get Maintenance Requests
        await testEndpoint('Get Maintenance', 'GET', '/landlords/maintenance', null, landlordToken);
    }

    // ==================== DELETE TESTS ====================
    log('\n📋 CLEANUP TESTS', 'yellow');

    // Test 11: Delete Property
    if (propertyId && landlordToken) {
        await testEndpoint('Delete Property', 'DELETE', `/properties/${propertyId}`, null, landlordToken);
    }

    // ==================== SUMMARY ====================
    log('\n\n📊 TEST SUMMARY', 'blue');
    log('✅ Tests completed! Check results above.\n', 'green');
    log('Next steps:', 'yellow');
    log('1. Fix any failed endpoints', 'reset');
    log('2. Test in browser at http://localhost:3002', 'reset');
    log('3. Create real test users and properties\n', 'reset');
}

// Run tests
runTests().catch(error => {
    log(`\n❌ Test suite failed: ${error.message}`, 'red');
    process.exit(1);
});
