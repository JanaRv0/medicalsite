// pages/api/applications.js - Get all membership applications
import fs from 'fs';
import path from 'path';

/**
 * API endpoint to retrieve all membership applications
 * In production, add authentication to protect this endpoint
 */
export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        });
    }

    try {
        const dataDir = path.join(process.cwd(), 'data');
        const dbFile = path.join(dataDir, 'applications.json');

        // Check if file exists
        if (!fs.existsSync(dbFile)) {
            return res.status(200).json({
                status: 'ok',
                applications: [],
                count: 0
            });
        }

        // Read applications
        const fileContent = fs.readFileSync(dbFile, 'utf8');
        const applications = JSON.parse(fileContent);

        // Sort by submission date (newest first)
        applications.sort((a, b) =>
            new Date(b.submittedAt) - new Date(a.submittedAt)
        );

        return res.status(200).json({
            status: 'ok',
            applications,
            count: applications.length
        });

    } catch (error) {
        console.error('Error retrieving applications:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
}
