// pages/api/apply.js - Membership Application API Endpoint
import fs from 'fs';
import path from 'path';

/**
 * This API endpoint handles membership application submissions
 * 
 * WORKFLOW:
 * 1. Validates incoming data
 * 2. Saves application to a JSON file (database)
 * 3. Sends email notification to admin
 * 4. Sends confirmation email to applicant
 * 5. Returns success/error response
 */

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        });
    }

    try {
        const { name, email, category, message, phone, profession } = req.body;

        // 1. VALIDATION - Check required fields
        if (!name || !email || !category) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields: name, email, and category are required'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email format'
            });
        }

        // 2. CREATE APPLICATION OBJECT with timestamp and unique ID
        const application = {
            id: generateApplicationId(),
            name,
            email,
            category,
            message: message || '',
            phone: phone || '',
            profession: profession || '',
            status: 'pending', // pending, approved, rejected
            submittedAt: new Date().toISOString(),
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        };

        // 3. SAVE TO DATABASE (JSON file)
        await saveApplication(application);

        // 4. SEND EMAIL NOTIFICATIONS
        try {
            // Send to admin
            await sendAdminNotification(application);

            // Send confirmation to applicant
            await sendApplicantConfirmation(application);
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Continue even if email fails
        }

        // 5. RETURN SUCCESS RESPONSE
        return res.status(200).json({
            status: 'ok',
            message: 'Application submitted successfully',
            applicationId: application.id
        });

    } catch (error) {
        console.error('Application submission error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error. Please try again later.'
        });
    }
}

/**
 * Generate a unique application ID
 * Format: APP-YYYYMMDD-RANDOM
 */
function generateApplicationId() {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `APP-${dateStr}-${random}`;
}

/**
 * Save application to JSON file database
 * In production, replace this with a real database (MongoDB, PostgreSQL, etc.)
 */
async function saveApplication(application) {
    const dataDir = path.join(process.cwd(), 'data');
    const dbFile = path.join(dataDir, 'applications.json');

    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing applications
    let applications = [];
    if (fs.existsSync(dbFile)) {
        const fileContent = fs.readFileSync(dbFile, 'utf8');
        applications = JSON.parse(fileContent);
    }

    // Add new application
    applications.push(application);

    // Write back to file
    fs.writeFileSync(dbFile, JSON.stringify(applications, null, 2));

    console.log(`Application ${application.id} saved successfully`);
}

/**
 * Send email notification to admin
 * This uses a simple console log - integrate with actual email service
 * Options: SendGrid, Nodemailer, Resend, etc.
 */
async function sendAdminNotification(application) {
    // TODO: Integrate with your email service

    const emailContent = `
    New Membership Application Received
    ===================================
    
    Application ID: ${application.id}
    Name: ${application.name}
    Email: ${application.email}
    Category: ${application.category}
    Profession: ${application.profession || 'Not provided'}
    Phone: ${application.phone || 'Not provided'}
    
    Message:
    ${application.message || 'No message provided'}
    
    Submitted: ${new Date(application.submittedAt).toLocaleString()}
    
    Please review and approve/reject this application.
  `;

    console.log('=== EMAIL TO ADMIN ===');
    console.log(emailContent);
    console.log('======================');

    // Example with Nodemailer (uncomment and configure):
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'admin@medicalsite.com',
      subject: `New Membership Application - ${application.name}`,
      text: emailContent
    });
    */
}

/**
 * Send confirmation email to applicant
 */
async function sendApplicantConfirmation(application) {
    const emailContent = `
    Dear ${application.name},
    
    Thank you for applying for membership!
    
    We have received your application with the following details:
    
    Application ID: ${application.id}
    Category: ${application.category}
    Submitted: ${new Date(application.submittedAt).toLocaleString()}
    
    Our team will review your application and contact you within 3-5 business days.
    
    ${getFeeInformation(application.category)}
    
    Best regards,
    Medical Guild Team
  `;

    console.log('=== EMAIL TO APPLICANT ===');
    console.log(`To: ${application.email}`);
    console.log(emailContent);
    console.log('==========================');

    // Implement actual email sending here
}

/**
 * Get fee information based on category
 */
function getFeeInformation(category) {
    const fees = {
        'Student': 'Your student membership is FREE! No payment required.',
        'Full Member': 'Annual membership fee: $20. Payment instructions will be sent separately.',
        'Associate': 'Annual membership fee: $15. Payment instructions will be sent separately.',
        'Honorary': 'Honorary membership is by invitation only. No fee required.'
    };

    return fees[category] || 'Membership fee information will be provided.';
}
