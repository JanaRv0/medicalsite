// pages/admin/login.tsx - Admin Login Page
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    console.log('🔐 Frontend: Attempting login with:', { email, passwordLength: password.length })

    try {
      console.log('📡 Frontend: Sending request to /api/admin/login')

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      console.log('📨 Frontend: Response status:', response.status, response.statusText)

      const data = await response.json()

      console.log('📦 Frontend: Response data:', data)

      if (data.status === 'success') {
        console.log('✅ Frontend: Login successful, redirecting to dashboard...')
        router.push('/admin/dashboard')
      } else {
        console.log('❌ Frontend: Login failed:', data.message)
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      console.error('❌ Frontend: Error during login:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - Medical Site</title>
      </Head>

      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <h1>Admin Login</h1>
            <p>Sign in to access the dashboard</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@medicalsite.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <style jsx>{`
          .admin-login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
          }

          .admin-login-box {
            background: white;
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 440px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          }

          .admin-login-header h1 {
            margin: 0 0 8px 0;
            font-size: 28px;
            color: #1a202c;
          }

          .admin-login-header p {
            margin: 0 0 30px 0;
            color: #718096;
            font-size: 14px;
          }

          .error-message {
            background: #fed7d7;
            color: #c53030;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
          }

          .admin-login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .form-group label {
            font-weight: 600;
            color: #2d3748;
            font-size: 14px;
          }

          .form-group input {
            padding: 12px 16px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.2s;
          }

          .form-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .form-group input:disabled {
            background: #f7fafc;
            cursor: not-allowed;
          }

          .btn-primary {
            padding: 14px 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 10px;
          }

          .btn-primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          }

          .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </>
  )
}
