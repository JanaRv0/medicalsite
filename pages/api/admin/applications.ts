// pages/api/admin/applications.ts - Get/Update Membership Applications
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { getUserFromRequest } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log('📋 Applications API called, method:', req.method)

        // Check authentication
        console.log('🔐 Checking authentication...')
        const user = await getUserFromRequest(req as any)

        console.log('👤 User from request:', user)

        if (!user || !user.id) {
            console.log('❌ Authentication failed - no valid user')
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            })
        }

        console.log('✅ User authenticated:', { id: user.id, email: user.email })

        // GET - Fetch all applications
        if (req.method === 'GET') {
            const applications = await prisma.membershipApplication.findMany({
                orderBy: { submittedAt: 'desc' }
            })

            return res.status(200).json({
                status: 'success',
                applications
            })
        }

        // PATCH - Update application status
        if (req.method === 'PATCH') {
            const { id, status } = req.body

            if (!id || !status) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Application ID and status are required'
                })
            }

            if (!['pending', 'approved', 'rejected'].includes(status)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid status'
                })
            }

            const application = await prisma.membershipApplication.update({
                where: { id },
                data: { status }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Application updated successfully',
                application
            })
        }

        // DELETE - Delete application
        if (req.method === 'DELETE') {
            const { id } = req.body

            if (!id) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Application ID is required'
                })
            }

            await prisma.membershipApplication.delete({
                where: { id }
            })

            return res.status(200).json({
                status: 'success',
                message: 'Application deleted successfully'
            })
        }

        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        })

    } catch (error: any) {
        console.error('Applications API error:', error)
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}
