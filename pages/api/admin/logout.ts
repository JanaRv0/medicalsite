// pages/api/admin/logout.ts - Admin Logout API
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        })
    }

    // Clear the admin token cookie
    res.setHeader('Set-Cookie', 'admin-token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict')

    return res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    })
}
