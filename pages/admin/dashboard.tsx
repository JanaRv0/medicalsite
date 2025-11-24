// pages/admin/dashboard.tsx - Admin Dashboard
import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

interface MembershipApplication {
  id: string
  fullName: string
  email: string
  phone: string
  membershipType: string
  status: string
  submittedAt: string
}

interface Feedback {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'applications' | 'feedback' | 'settings'>('applications')
  const [applications, setApplications] = useState<MembershipApplication[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [filter, setFilter] = useState('all')

  const getStatusBadge = (status: string) => {
    const styles: any = {
      pending: { bg: '#fef3c7', color: '#92400e', text: 'Pending' },
      approved: { bg: '#d1fae5', color: '#065f46', text: 'Approved' },
      rejected: { bg: '#fee2e2', color: '#991b1b', text: 'Rejected' },
      unread: { bg: '#dbeafe', color: '#1e40af', text: 'Unread' },
      read: { bg: '#e0e7ff', color: '#4338ca', text: 'Read' },
      resolved: { bg: '#d1fae5', color: '#065f46', text: 'Resolved' }
    }
    const style = styles[status] || styles.pending

    return (
      <span style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase'
      }}>
        {style.text}
      </span>
    )
  }

  const getCategoryBadge = (category: string) => {
    const colors: any = {
      'Student': '#10b981',
      'Full Member': '#3b82f6',
      'Associate': '#8b5cf6',
      'Honorary': '#f59e0b'
    }

    return (
      <span style={{
        color: colors[category] || '#6b7280',
        fontWeight: '600',
        fontSize: '14px'
      }}>
        {category}
      </span>
    )
  }

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true
    return app.status === filter
  })

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  }

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'applications') {
        const res = await fetch('/api/admin/applications')
        const data = await res.json()
        if (data.status === 'success') {
          setApplications(data.applications)
        } else if (res.status === 401) {
          router.push('/admin/login')
        }
      } else if (activeTab === 'feedback') {
        const res = await fetch('/api/admin/feedback')
        const data = await res.json()
        if (data.status === 'success') {
          setFeedback(data.feedback)
        } else if (res.status === 401) {
          router.push('/admin/login')
        }
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      if (res.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Error updating application:', error)
    }
  }

  const updateFeedbackStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      if (res.ok) {
        loadData()
      }
    } catch (error) {
      console.error('Error updating feedback:', error)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage(null)

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      })

      const data = await res.json()

      if (data.status === 'success') {
        setPasswordMessage({ type: 'success', text: 'Password changed successfully!' })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setPasswordMessage({ type: 'error', text: data.message || 'Failed to change password' })
      }
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'An error occurred' })
    }
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Medical Site</title>
      </Head>

      <div className="dashboard">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
          </div>

          <nav className="sidebar-nav">
            <button
              className={activeTab === 'applications' ? 'active' : ''}
              onClick={() => setActiveTab('applications')}
            >
              📋 Applications
              {applications.filter(a => a.status === 'pending').length > 0 && (
                <span className="badge">{applications.filter(a => a.status === 'pending').length}</span>
              )}
            </button>
            <button
              className={activeTab === 'feedback' ? 'active' : ''}
              onClick={() => setActiveTab('feedback')}
            >
              💬 Feedback
              {feedback.filter(f => f.status === 'unread').length > 0 && (
                <span className="badge">{feedback.filter(f => f.status === 'unread').length}</span>
              )}
            </button>
            <button
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              ⚙️ Settings
            </button>
          </nav>

          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </aside>

        <main className="main-content">
          <header className="content-header">
            <h1>
              {activeTab === 'applications' && 'Membership Applications'}
              {activeTab === 'feedback' && 'Contact Feedback'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
          </header>

          <div className="content-body">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
                {activeTab === 'applications' && (
                  <div>
                    {/* Statistics Cards */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '16px',
                      marginBottom: '24px'
                    }}>
                      <div className="card" style={{ textAlign: 'center' }}>
                        <h3 style={{ color: '#3b82f6', fontSize: '32px', margin: '8px 0' }}>
                          {stats.total}
                        </h3>
                        <p style={{ margin: 0, color: '#6b7280' }}>Total Applications</p>
                      </div>
                      <div className="card" style={{ textAlign: 'center' }}>
                        <h3 style={{ color: '#f59e0b', fontSize: '32px', margin: '8px 0' }}>
                          {stats.pending}
                        </h3>
                        <p style={{ margin: 0, color: '#6b7280' }}>Pending Review</p>
                      </div>
                      <div className="card" style={{ textAlign: 'center' }}>
                        <h3 style={{ color: '#10b981', fontSize: '32px', margin: '8px 0' }}>
                          {stats.approved}
                        </h3>
                        <p style={{ margin: 0, color: '#6b7280' }}>Approved</p>
                      </div>
                      <div className="card" style={{ textAlign: 'center' }}>
                        <h3 style={{ color: '#ef4444', fontSize: '32px', margin: '8px 0' }}>
                          {stats.rejected}
                        </h3>
                        <p style={{ margin: 0, color: '#6b7280' }}>Rejected</p>
                      </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="card" style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['all', 'pending', 'approved', 'rejected'].map(f => (
                          <button
                            key={f}
                            className="button"
                            onClick={() => setFilter(f)}
                            style={{
                              backgroundColor: filter === f ?
                                (f === 'all' ? '#3b82f6' : f === 'pending' ? '#f59e0b' : f === 'approved' ? '#10b981' : '#ef4444')
                                : '#e5e7eb',
                              color: filter === f ? 'white' : '#374151',
                              padding: '8px 16px',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              textTransform: 'capitalize'
                            }}
                          >
                            {f} ({f === 'all' ? stats.total : stats[f as keyof typeof stats]})
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Applications List */}
                    <div className="applications-list">
                      {filteredApplications.length === 0 ? (
                        <div className="card">
                          <p>No applications found.</p>
                        </div>
                      ) : (
                        filteredApplications.map(app => (
                          <div key={app.id} className="card" style={{
                            marginBottom: '16px',
                            borderLeft: `4px solid ${app.status === 'pending' ? '#f59e0b' :
                              app.status === 'approved' ? '#10b981' : '#ef4444'
                              }`
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'start',
                              marginBottom: '12px',
                              flexWrap: 'wrap',
                              gap: '12px'
                            }}>
                              <div>
                                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{app.fullName}</h3>
                                <p style={{ margin: '0', color: '#6b7280', fontSize: '12px' }}>
                                  ID: {app.id}
                                </p>
                              </div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                {getStatusBadge(app.status)}
                                {getCategoryBadge(app.membershipType)}
                              </div>
                            </div>

                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: '12px',
                              marginBottom: '16px'
                            }}>
                              <div>
                                <strong style={{ fontSize: '14px', color: '#6b7280' }}>Email:</strong>
                                <p style={{ margin: '4px 0 0 0' }}>
                                  <a href={`mailto:${app.email}`} style={{ color: '#3b82f6' }}>
                                    {app.email}
                                  </a>
                                </p>
                              </div>
                              <div>
                                <strong style={{ fontSize: '14px', color: '#6b7280' }}>Phone:</strong>
                                <p style={{ margin: '4px 0 0 0' }}>{app.phone || 'N/A'}</p>
                              </div>
                              <div>
                                <strong style={{ fontSize: '14px', color: '#6b7280' }}>Submitted:</strong>
                                <p style={{ margin: '4px 0 0 0' }}>
                                  {new Date(app.submittedAt).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="card-actions" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>
                              {app.status === 'pending' && (
                                <>
                                  <button
                                    className="btn-approve"
                                    onClick={() => updateApplicationStatus(app.id, 'approved')}
                                  >
                                    ✓ Approve
                                  </button>
                                  <button
                                    className="btn-reject"
                                    onClick={() => updateApplicationStatus(app.id, 'rejected')}
                                  >
                                    ✗ Reject
                                  </button>
                                </>
                              )}
                              <button
                                className="btn-view"
                                onClick={() => setSelectedItem(app)}
                              >
                                👁 View Details
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'feedback' && (
                  <div className="applications-list">
                    {feedback.length === 0 ? (
                      <div className="card">
                        <p>No feedback messages found.</p>
                      </div>
                    ) : (
                      feedback.map(fb => (
                        <div key={fb.id} className="card" style={{
                          marginBottom: '16px',
                          borderLeft: `4px solid ${fb.status === 'unread' ? '#3b82f6' : '#10b981'}`
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                            marginBottom: '12px'
                          }}>
                            <div>
                              <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{fb.subject}</h3>
                              <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                                From: {fb.name}
                              </p>
                            </div>
                            {getStatusBadge(fb.status)}
                          </div>

                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '12px',
                            marginBottom: '12px'
                          }}>
                            <div>
                              <strong style={{ fontSize: '14px', color: '#6b7280' }}>Email:</strong>
                              <p style={{ margin: '4px 0 0 0' }}>
                                <a href={`mailto:${fb.email}`} style={{ color: '#3b82f6' }}>
                                  {fb.email}
                                </a>
                              </p>
                            </div>
                            <div>
                              <strong style={{ fontSize: '14px', color: '#6b7280' }}>Received:</strong>
                              <p style={{ margin: '4px 0 0 0' }}>
                                {new Date(fb.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div style={{
                            backgroundColor: '#f9fafb',
                            padding: '12px',
                            borderRadius: '6px',
                            marginBottom: '16px'
                          }}>
                            <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#4b5563' }}>
                              {fb.message.length > 200 ? fb.message.substring(0, 200) + '...' : fb.message}
                            </p>
                          </div>

                          <div className="card-actions" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>
                            {fb.status === 'unread' && (
                              <button
                                className="btn-approve"
                                onClick={() => updateFeedbackStatus(fb.id, 'read')}
                                style={{ backgroundColor: '#3b82f6' }}
                              >
                                Mark as Read
                              </button>
                            )}
                            {fb.status === 'read' && (
                              <button
                                className="btn-approve"
                                onClick={() => updateFeedbackStatus(fb.id, 'resolved')}
                              >
                                Mark as Resolved
                              </button>
                            )}
                            <button
                              className="btn-view"
                              onClick={() => setSelectedItem(fb)}
                            >
                              👁 View Full Message
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="settings-container">
                    <div className="settings-card">
                      <h2>Change Password</h2>

                      {passwordMessage && (
                        <div className={`message message-${passwordMessage.type}`}>
                          {passwordMessage.text}
                        </div>
                      )}

                      <form onSubmit={handleChangePassword} className="password-form">
                        <div className="form-group">
                          <label>Current Password</label>
                          <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm New Password</label>
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                        <button type="submit" className="btn-primary">
                          Change Password
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Details</h2>
                <button onClick={() => setSelectedItem(null)}>✕</button>
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(selectedItem, null, 2)}</pre>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .dashboard {
            display: flex;
            min-height: 100vh;
            background: #f7fafc;
          }

          .sidebar {
            width: 260px;
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            flex-direction: column;
            padding: 20px;
          }

          .sidebar-header h2 {
            margin: 0 0 30px 0;
            font-size: 24px;
          }

          .sidebar-nav {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .sidebar-nav button {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            padding: 14px 18px;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            font-size: 15px;
            transition: all 0.2s;
            position: relative;
          }

          .sidebar-nav button:hover {
            background: rgba(255, 255, 255, 0.2);
          }

          .sidebar-nav button.active {
            background: white;
            color: #667eea;
            font-weight: 600;
          }

          .badge {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: #fc8181;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
          }

          .logout-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
            transition: all 0.2s;
          }

          .logout-btn:hover {
            background: rgba(255, 77, 77, 0.3);
          }

          .main-content {
            flex: 1;
            padding: 30px;
          }

          .content-header h1 {
            margin: 0 0 30px 0;
            font-size: 32px;
            color: #1a202c;
          }

          .loading {
            text-align: center;
            padding: 60px;
            font-size: 18px;
            color: #718096;
          }

          .applications-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 20px;
          }

          .card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.2s;
          }

          .card:hover {
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          }

          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 16px;
            border-bottom: 2px solid #f7fafc;
            padding-bottom: 12px;
          }

          .card-header h3 {
            margin: 0;
            font-size: 18px;
            color: #1a202c;
          }

          .status-badge {
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }

          .status-pending {
            background: #fef3c7;
            color: #92400e;
          }

          .status-approved {
            background: #d1fae5;
            color: #065f46;
          }

          .status-rejected {
            background: #fee2e2;
            color: #991b1b;
          }

          .status-unread {
            background: #dbeafe;
            color: #1e40af;
          }

          .status-read {
            background: #e0e7ff;
            color: #4338ca;
          }

          .status-resolved {
            background: #d1fae5;
            color: #065f46;
          }

          .card-body p {
            margin: 8px 0;
            color: #4a5568;
            font-size: 14px;
          }

          .card-actions {
            display: flex;
            gap: 8px;
            margin-top: 16px;
          }

          .card-actions button {
            flex: 1;
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.2s;
          }

          .btn-approve {
            background: #48bb78;
            color: white;
          }

          .btn-approve:hover {
            background: #38a169;
          }

          .btn-reject {
            background: #f56565;
            color: white;
          }

          .btn-reject:hover {
            background: #e53e3e;
          }

          .btn-view {
            background: #4299e1;
            color: white;
          }

          .btn-view:hover {
            background: #3182ce;
          }

          .settings-container {
            max-width: 600px;
          }

          .settings-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .settings-card h2 {
            margin: 0 0 20px 0;
            font-size: 20px;
            color: #1a202c;
          }

          .message {
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
          }

          .message-success {
            background: #d1fae5;
            color: #065f46;
          }

          .message-error {
            background: #fee2e2;
            color: #991b1b;
          }

          .password-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .form-group label {
            font-weight: 600;
            color: #2d3748;
            font-size: 14px;
          }

          .form-group input {
            padding: 10px 14px;
            border: 2px solid #e2e8f0;
            border-radius: 6px;
            font-size: 15px;
          }

          .form-group input:focus {
            outline: none;
            border-color: #667eea;
          }

          .btn-primary {
            padding: 12px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 10px;
          }

          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
          }

          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .modal {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow: auto;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
          }

          .modal-header h2 {
            margin: 0;
            font-size: 20px;
          }

          .modal-header button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #718096;
          }

          .modal-body {
            padding: 20px;
          }

          .modal-body pre {
            background: #f7fafc;
            padding: 16px;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 13px;
          }
        `}</style>
      </div>
    </>
  )
}
