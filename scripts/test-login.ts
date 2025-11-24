// Test script to verify admin credentials
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testLogin() {
    const email = 'admin@medicalsite.com'
    const password = 'admin123'

    console.log('🔍 Testing admin login...\n')

    // Find admin
    const admin = await prisma.admin.findUnique({
        where: { email }
    })

    if (!admin) {
        console.log('❌ Admin not found in database!')
        return
    }

    console.log('✅ Admin found:')
    console.log('   Email:', admin.email)
    console.log('   Name:', admin.name)
    console.log('   ID:', admin.id)
    console.log('   Password hash:', admin.password.substring(0, 20) + '...')

    // Test password
    const isValid = await bcrypt.compare(password, admin.password)

    if (isValid) {
        console.log('\n✅ Password verification: SUCCESS')
        console.log('   The credentials are correct!')
    } else {
        console.log('\n❌ Password verification: FAILED')
        console.log('   The password does not match!')
    }
}

testLogin()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })
