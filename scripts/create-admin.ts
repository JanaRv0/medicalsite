// scripts/create-admin.ts - Create initial admin user
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'admin@medicalsite.com'
    const password = 'admin123' // Change this after first login!
    const name = 'Admin User'

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
        where: { email }
    })

    if (existingAdmin) {
        console.log('❌ Admin user already exists!')
        return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin
    const admin = await prisma.admin.create({
        data: {
            email,
            password: hashedPassword,
            name
        }
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', email)
    console.log('🔑 Password:', password)
    console.log('⚠️  IMPORTANT: Please change the password after first login!')
}

main()
    .catch((error) => {
        console.error('Error creating admin:', error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
