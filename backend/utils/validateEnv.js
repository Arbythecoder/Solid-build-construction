/**
 * 🔒 Environment Variable Validator
 * Ensures all required secrets are present before server starts
 */

const validateEnv = () => {
  console.log('\n🔐 Validating environment variables...\n');

  // Required environment variables
  const required = {
    'MONGO_URI': 'MongoDB connection string',
    'JWT_SECRET': 'JWT signing secret',
    'CLOUDINARY_CLOUD_NAME': 'Cloudinary cloud name',
    'CLOUDINARY_API_KEY': 'Cloudinary API key',
    'CLOUDINARY_API_SECRET': 'Cloudinary API secret'
  };

  // Optional but recommended
  const recommended = {
    'PAYSTACK_SECRET_KEY': 'Paystack secret key (for payments)',
    'SENDGRID_API_KEY': 'SendGrid API key (for emails)',
    'CORS_ORIGIN': 'CORS allowed origin'
  };

  let hasErrors = false;
  let hasWarnings = false;

  // Check required variables
  console.log('📋 Required Variables:');
  Object.entries(required).forEach(([key, description]) => {
    if (!process.env[key]) {
      console.error(`   ❌ ${key} - ${description}`);
      hasErrors = true;
    } else {
      console.log(`   ✅ ${key}`);
    }
  });

  // Check recommended variables
  console.log('\n📝 Recommended Variables:');
  Object.entries(recommended).forEach(([key, description]) => {
    if (!process.env[key]) {
      console.warn(`   ⚠️  ${key} - ${description} (optional)`);
      hasWarnings = true;
    } else {
      console.log(`   ✅ ${key}`);
    }
  });

  // Validate JWT secret strength
  console.log('\n🔑 Secret Strength Validation:');
  if (process.env.JWT_SECRET) {
    if (process.env.JWT_SECRET.length < 32) {
      console.error('   ❌ JWT_SECRET is too short (minimum 32 characters)');
      hasErrors = true;
    } else if (process.env.JWT_SECRET === 'your_jwt_secret_here' || 
               process.env.JWT_SECRET === 'changeme') {
      console.error('   ❌ JWT_SECRET is using default/placeholder value');
      hasErrors = true;
    } else {
      console.log(`   ✅ JWT_SECRET length: ${process.env.JWT_SECRET.length} chars`);
    }
  }

  // Check for example/placeholder values
  console.log('\n🚨 Placeholder Detection:');
  const placeholders = ['your_', 'changeme', 'example', 'test123', 'placeholder'];
  const sensitiveVars = ['MONGO_URI', 'JWT_SECRET', 'PAYSTACK_SECRET_KEY'];
  
  sensitiveVars.forEach(key => {
    const value = process.env[key]?.toLowerCase() || '';
    const hasPlaceholder = placeholders.some(p => value.includes(p));
    
    if (hasPlaceholder) {
      console.error(`   ❌ ${key} appears to contain placeholder value`);
      hasErrors = true;
    }
  });

  if (!hasErrors) {
    console.log('   ✅ No placeholder values detected');
  }

  // Environment check
  console.log('\n🌍 Environment:');
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   PORT: ${process.env.PORT || 5000}`);

  // Final verdict
  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    console.error('❌ Environment validation FAILED');
    console.error('Please check the errors above and update your .env file\n');
    process.exit(1);
  }

  if (hasWarnings) {
    console.warn('⚠️  Environment validation passed with warnings');
    console.warn('Some optional variables are missing\n');
  } else {
    console.log('✅ Environment validation PASSED\n');
  }
};

module.exports = validateEnv;
