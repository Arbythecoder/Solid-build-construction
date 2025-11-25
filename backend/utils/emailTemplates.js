// Email template styles
const styles = {
  container: `
    font-family: 'Poppins', Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `,
  header: `
    background: linear-gradient(135deg, #D4AF37 0%, #FF8C42 50%, #4A2C2A 100%);
    padding: 40px 30px;
    text-align: center;
  `,
  logo: `
    font-size: 28px;
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
    letter-spacing: 2px;
  `,
  body: `
    padding: 40px 30px;
    background-color: #ffffff;
  `,
  title: `
    font-size: 24px;
    color: #0A0A0A;
    margin-bottom: 20px;
    font-weight: 600;
  `,
  text: `
    font-size: 16px;
    color: #333333;
    line-height: 1.6;
    margin-bottom: 20px;
  `,
  button: `
    display: inline-block;
    background: linear-gradient(135deg, #D4AF37 0%, #FF8C42 100%);
    color: #ffffff;
    padding: 14px 32px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    margin: 20px 0;
  `,
  footer: `
    background-color: #0A0A0A;
    padding: 30px;
    text-align: center;
  `,
  footerText: `
    color: #888888;
    font-size: 14px;
    margin: 5px 0;
  `,
  highlight: `
    background-color: #f8f8f8;
    border-left: 4px solid #D4AF37;
    padding: 15px 20px;
    margin: 20px 0;
    border-radius: 0 8px 8px 0;
  `,
  propertyCard: `
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
    background-color: #fafafa;
  `
};

// Welcome email template
const welcomeEmail = (userName, role) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Afodams Property</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f4f4f4;">
  <div style="${styles.container}">
    <div style="${styles.header}">
      <span style="${styles.logo}">AFODAMS PROPERTY</span>
    </div>
    <div style="${styles.body}">
      <h1 style="${styles.title}">Welcome to Afodams Property, ${userName}!</h1>
      <p style="${styles.text}">
        Thank you for joining Nigeria's premier luxury real estate platform. We're excited to have you as a ${role}.
      </p>
      <div style="${styles.highlight}">
        <p style="margin: 0; color: #333;">
          <strong>Your account is now active!</strong><br>
          Start exploring premium properties across Nigeria.
        </p>
      </div>
      <p style="${styles.text}">
        With Afodams Property, you get access to:
      </p>
      <ul style="${styles.text}">
        <li>Exclusive luxury property listings</li>
        <li>Virtual property tours</li>
        <li>Expert investment guidance</li>
        <li>Secure payment processing</li>
        <li>24/7 customer support</li>
      </ul>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" style="${styles.button}">
        Go to Dashboard
      </a>
    </div>
    <div style="${styles.footer}">
      <p style="${styles.footerText}">Afodams Property Limited</p>
      <p style="${styles.footerText}">Lagos, Nigeria</p>
      <p style="${styles.footerText}">&copy; ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
`;

// Inquiry received email (for landlords)
const inquiryReceivedEmail = (landlordName, propertyTitle, inquirerName, inquirerEmail, message) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Property Inquiry</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f4f4f4;">
  <div style="${styles.container}">
    <div style="${styles.header}">
      <span style="${styles.logo}">AFODAMS PROPERTY</span>
    </div>
    <div style="${styles.body}">
      <h1 style="${styles.title}">New Inquiry Received!</h1>
      <p style="${styles.text}">
        Dear ${landlordName},<br><br>
        Great news! Someone is interested in your property.
      </p>
      <div style="${styles.propertyCard}">
        <h3 style="margin-top: 0; color: #D4AF37;">📍 ${propertyTitle}</h3>
        <p style="margin: 10px 0 0 0; color: #666;">
          <strong>From:</strong> ${inquirerName}<br>
          <strong>Email:</strong> ${inquirerEmail}
        </p>
      </div>
      <div style="${styles.highlight}">
        <p style="margin: 0; color: #333;">
          <strong>Message:</strong><br>
          "${message}"
        </p>
      </div>
      <p style="${styles.text}">
        We recommend responding within 24 hours to maximize your chances of closing this deal.
      </p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" style="${styles.button}">
        View in Dashboard
      </a>
    </div>
    <div style="${styles.footer}">
      <p style="${styles.footerText}">Afodams Property Limited</p>
      <p style="${styles.footerText}">&copy; ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
`;

// Property approved email
const propertyApprovedEmail = (landlordName, propertyTitle, propertyId) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Property Approved</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f4f4f4;">
  <div style="${styles.container}">
    <div style="${styles.header}">
      <span style="${styles.logo}">AFODAMS PROPERTY</span>
    </div>
    <div style="${styles.body}">
      <h1 style="${styles.title}">🎉 Your Property is Live!</h1>
      <p style="${styles.text}">
        Dear ${landlordName},<br><br>
        Congratulations! Your property has been approved and is now visible to potential buyers and tenants.
      </p>
      <div style="${styles.propertyCard}">
        <h3 style="margin-top: 0; color: #D4AF37;">✅ ${propertyTitle}</h3>
        <p style="margin: 10px 0 0 0; color: #28a745;">
          <strong>Status: APPROVED</strong>
        </p>
      </div>
      <p style="${styles.text}">
        Tips to increase visibility:
      </p>
      <ul style="${styles.text}">
        <li>Add high-quality photos</li>
        <li>Complete all property details</li>
        <li>Consider premium listing for priority placement</li>
        <li>Respond quickly to inquiries</li>
      </ul>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/properties/${propertyId}" style="${styles.button}">
        View Property
      </a>
    </div>
    <div style="${styles.footer}">
      <p style="${styles.footerText}">Afodams Property Limited</p>
      <p style="${styles.footerText}">&copy; ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
`;

// Payment confirmation email
const paymentConfirmationEmail = (userName, amount, propertyTitle, transactionRef) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmed</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f4f4f4;">
  <div style="${styles.container}">
    <div style="${styles.header}">
      <span style="${styles.logo}">AFODAMS PROPERTY</span>
    </div>
    <div style="${styles.body}">
      <h1 style="${styles.title}">Payment Successful! ✓</h1>
      <p style="${styles.text}">
        Dear ${userName},<br><br>
        Your payment has been received and confirmed.
      </p>
      <div style="${styles.propertyCard}">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <strong>Amount:</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right; color: #D4AF37; font-size: 20px;">
              ₦${amount.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <strong>Property:</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">
              ${propertyTitle}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong>Reference:</strong>
            </td>
            <td style="padding: 10px 0; text-align: right; font-family: monospace;">
              ${transactionRef}
            </td>
          </tr>
        </table>
      </div>
      <p style="${styles.text}">
        Please keep this email for your records. Our team will be in touch shortly with next steps.
      </p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" style="${styles.button}">
        View Transaction
      </a>
    </div>
    <div style="${styles.footer}">
      <p style="${styles.footerText}">Afodams Property Limited</p>
      <p style="${styles.footerText}">&copy; ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
`;

// Password reset email
const passwordResetEmail = (userName, resetLink) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f4f4f4;">
  <div style="${styles.container}">
    <div style="${styles.header}">
      <span style="${styles.logo}">AFODAMS PROPERTY</span>
    </div>
    <div style="${styles.body}">
      <h1 style="${styles.title}">Reset Your Password</h1>
      <p style="${styles.text}">
        Dear ${userName},<br><br>
        We received a request to reset your password. Click the button below to create a new password.
      </p>
      <div style="text-align: center;">
        <a href="${resetLink}" style="${styles.button}">
          Reset Password
        </a>
      </div>
      <div style="${styles.highlight}">
        <p style="margin: 0; color: #666; font-size: 14px;">
          ⚠️ This link expires in 1 hour.<br>
          If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>
    <div style="${styles.footer}">
      <p style="${styles.footerText}">Afodams Property Limited</p>
      <p style="${styles.footerText}">&copy; ${new Date().getFullYear()} All rights reserved</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = {
  welcomeEmail,
  inquiryReceivedEmail,
  propertyApprovedEmail,
  paymentConfirmationEmail,
  passwordResetEmail
};
