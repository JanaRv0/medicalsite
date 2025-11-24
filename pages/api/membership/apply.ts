// pages/api/membership/apply.ts - Membership Application API with Database
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        })
    }

    try {
        const {
            fullName,
            email,
            phone,
            dateOfBirth,
            address,
            city,
            state,
            zipCode,
            membershipType,
            specialization,
            licenseNumber,
            yearsOfExperience,
            medicalSchool
        } = req.body

        // Validation
        if (!fullName || !email || !membershipType) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields'
            })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email format'
            })
        }

        // Save to database
        const application = await prisma.membershipApplication.create({
            data: {
                fullName,
                email,
                phone,
                dateOfBirth: dateOfBirth || '',
                address: address || '',
                city: city || '',
                state: state || '',
                zipCode: zipCode || '',
                membershipType,
                specialization: specialization || null,
                licenseNumber: licenseNumber || null,
                yearsOfExperience: yearsOfExperience || null,
                medicalSchool: medicalSchool || null,
                status: 'pending'
            }
        })

        return res.status(200).json({
            status: 'success',
            message: 'Application submitted successfully',
            applicationId: application.id
        })

    } catch (error: any) {
        console.error('Application submission error:', error)
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error. Please try again later.'
        })
    }
}
