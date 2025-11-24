// pages/api/admin/feedback.ts - Get/Update Feedback
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { getUserFromRequest } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check authentication
        const user = await getUserFromRequest(req as any)
        if (!user || !user.id) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            })
        }

        // GET - Fetch all feedback
        if (req.method === 'GET') {
            const feedback = await prisma.feedback.findMany({
                orderBy: { createdAt: 'desc' }
            })

            return res.status(200).json({
                status: 'success',
                feedback
            })
        }

        // PATCH - Update feedback status
        if (req.method === 'PATCH') {
            const { id, status } = req.body

            if (!id || !status) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Feedback ID and status are required'
                })
            }

            if (!['unread', 'read', 'resolved'].includes(status)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid status'
                })
            }

            const feedbackItem = await prisma.feedback.update({
                where: { id },
                data: { status }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Feedback updated successfully',
                feedback: feedbackItem
            })
        }

        // DELETE - Delete feedback
        if (req.method === 'DELETE') {
            const { id } = req.body

            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Feedback ID is required'
                })
            }

            await prisma.feedback.delete({
                where: { id }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Feedback deleted successfully'
            })
        }

        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        })

    } catch (error: any) {
        console.error('Feedback API error:', error)
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}
