// pages/api/admin/change-password.ts - Change Password API
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { verifyPassword, hashPassword, getUserFromRequest } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        })
    }

    try {
        // Get user from request
        const user = await getUserFromRequest(req as any)
        if (!user || !user.id) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            })
        }

        const { currentPassword, newPassword } = req.body

        // Validation
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Current password and new password are required'
            })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                status: 'error',
                message: 'New password must be at least 6 characters long'
            })
        }

        // Find admin
        const admin = await prisma.admin.findUnique({
            where: { id: user.id }
        })

        if (!admin) {
            return res.status(404).json({
                status: 'error',
                message: 'Admin not found'
            })
        }

        // Verify current password
        const isValidPassword = await verifyPassword(currentPassword, admin.password)
        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Current password is incorrect'
            })
        }

        // Hash new password
        const hashedPassword = await hashPassword(newPassword)

        // Update password
        await prisma.admin.update({
            where: { id: admin.id },
            data: { password: hashedPassword }
        })

        return res.status(200).json({
            status: 'success',
            message: 'Password changed successfully'
        })

    } catch (error: any) {
        console.error('Change password error:', error)
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}
