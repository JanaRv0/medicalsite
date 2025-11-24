// pages/api/feedback/submit.ts - Feedback/Contact Form API
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        })
    }

    try {
        const { name, email, phone, subject, message } = req.body

        // Validation
        if (!name || !email || !subject || !message) {
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
        const feedback = await prisma.feedback.create({
            data: {
                name,
                email,
                phone: phone || null,
                subject,
                message,
                status: 'unread'
            }
        })

        return res.status(200).json({
            status: 'success',
            message: 'Feedback submitted successfully',
            feedbackId: feedback.id
        })

    } catch (error: any) {
        console.error('Feedback submission error:', error)
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error. Please try again later.'
        })
    }
}
