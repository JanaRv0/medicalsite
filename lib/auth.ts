import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production-12345'
)

// Hash password
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
}

// Create JWT token
export async function createToken(payload: any): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET)
}

// Verify JWT token
export async function verifyToken(token: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET)
        return payload
    } catch (error) {
        return null
    }
}

// Get user from NextJS API request cookies
export async function getUserFromRequest(request: any): Promise<any> {
    try {
        // NextJS API routes have cookies in req.cookies or req.headers.cookie
        let cookieHeader: string | null = null

        // Try req.cookies first (NextJS parsed cookies)
        if (request.cookies && request.cookies['admin-token']) {
            const token = request.cookies['admin-token']
            console.log('🍪 Found token in req.cookies')
            return await verifyToken(token)
        }

        // Try req.headers.cookie (raw cookie string)
        if (request.headers && request.headers.cookie) {
            cookieHeader = request.headers.cookie
        }

        if (!cookieHeader) {
            console.log('❌ No cookies found in request')
            return null
        }

        const cookies = Object.fromEntries(
            cookieHeader.split('; ').map(c => {
                const [key, ...v] = c.split('=')
                return [key, v.join('=')]
            })
        )

        const token = cookies['admin-token']
        if (!token) {
            console.log('❌ No admin-token in cookies')
            return null
        }

        console.log('✅ Found token in cookies, verifying...')
        return await verifyToken(token)
    } catch (error) {
        console.error('❌ Error getting user from request:', error)
        return null
    }
}
