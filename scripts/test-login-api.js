// Test the login API directly
async function testLoginAPI() {
    console.log('🧪 Testing Login API Endpoint\n')

    const testData = {
        email: 'admin@medicalsite.com',
        password: 'admin123'
    }

    console.log('Sending login request...')
    console.log('Email:', testData.email)
    console.log('Password:', testData.password)
    console.log('')

    try {
        const response = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        })

        console.log('Response Status:', response.status)
        console.log('Response Status Text:', response.statusText)
        console.log('')

        const data = await response.json()
        console.log('Response Data:', JSON.stringify(data, null, 2))

        if (response.ok) {
            console.log('\n✅ Login successful!')
            console.log('🍪 Cookie:', response.headers.get('set-cookie'))
        } else {
            console.log('\n❌ Login failed!')
            console.log('Check the server terminal for detailed logs')
        }
    } catch (error) {
        console.error('\n❌ Error:', error.message)
        console.error('Make sure the dev server is running on http://localhost:3000')
    }
}

testLoginAPI()
