// pages/api/admin/login.ts - Admin Login API
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { verifyPassword, createToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            status: 'error',
            message: 'Method not allowed'
        })
    }

    try {
        const { email, password } = req.body

        console.log('🔐 Login attempt:', { email, passwordLength: password?.length })

        // Validation
        if (!email || !password) {
            console.log('❌ Missing credentials')
            return res.status(400).json({
                status: 'error',
                message: 'Email and password are required'
            })
        }

        // Find admin by email
        console.log('🔍 Looking for admin with email:', email)
        const admin = await prisma.admin.findUnique({
            where: { email }
        })

        if (!admin) {
            console.log('❌ Admin not found for email:', email)
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            })
        }

        console.log('✅ Admin found:', { id: admin.id, email: admin.email })
        console.log('🔑 Verifying password...')

        // Verify password
        const isValidPassword = await verifyPassword(password, admin.password)

        console.log('Password verification result:', isValidPassword)

        if (!isValidPassword) {
            console.log('❌ Password verification failed')
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            })
        }

        console.log('✅ Password verified successfully')

        // Create JWT token
        const token = await createToken({
            id: admin.id,
            email: admin.email,
            name: admin.name
        })

        console.log('🎫 JWT token created')

        // Set cookie with SameSite=Lax to allow redirects
        const cookieValue = `admin-token=${token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}; SameSite=Lax`
        res.setHeader('Set-Cookie', cookieValue)

        console.log('🍪 Cookie set:', cookieValue.substring(0, 50) + '...')

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name
            }
        })

    } catch (error: any) {
        console.error('Login error:', error)
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        })
    }
}
