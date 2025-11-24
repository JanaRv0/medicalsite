// pages/admin-applications.js - Admin Dashboard to View Applications
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';

export default function AdminApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/applications');
            const data = await res.json();

            if (data.status === 'ok') {
                setApplications(data.applications);
            } else {
                setError('Failed to load applications');
            }
        } catch (err) {
            setError('Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        return app.status === filter;
    });

    const getStatusBadge = (status) => {
        const styles = {
            pending: { bg: '#fef3c7', color: '#92400e', text: 'Pending' },
            approved: { bg: '#d1fae5', color: '#065f46', text: 'Approved' },
            rejected: { bg: '#fee2e2', color: '#991b1b', text: 'Rejected' }
        };
        const style = styles[status] || styles.pending;

        return (
            <span style={{
                backgroundColor: style.bg,
                color: style.color,
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
            }}>
                {style.text}
            </span>
        );
    };

    const getCategoryBadge = (category) => {
        const colors = {
            'Student': '#10b981',
            'Full Member': '#3b82f6',
            'Associate': '#8b5cf6',
            'Honorary': '#f59e0b'
        };

        return (
            <span style={{
                color: colors[category] || '#6b7280',
                fontWeight: '600'
            }}>
                {category}
            </span>
        );
    };

    const stats = {
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length
    };

    return (
        <Layout>
            <h2>Membership Applications Dashboard</h2>

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
                    <button
                        className="button"
                        onClick={() => setFilter('all')}
                        style={{
                            backgroundColor: filter === 'all' ? '#3b82f6' : '#e5e7eb',
                            color: filter === 'all' ? 'white' : '#374151'
                        }}
                    >
                        All ({stats.total})
                    </button>
                    <button
                        className="button"
                        onClick={() => setFilter('pending')}
                        style={{
                            backgroundColor: filter === 'pending' ? '#f59e0b' : '#e5e7eb',
                            color: filter === 'pending' ? 'white' : '#374151'
                        }}
                    >
                        Pending ({stats.pending})
                    </button>
                    <button
                        className="button"
                        onClick={() => setFilter('approved')}
                        style={{
                            backgroundColor: filter === 'approved' ? '#10b981' : '#e5e7eb',
                            color: filter === 'approved' ? 'white' : '#374151'
                        }}
                    >
                        Approved ({stats.approved})
                    </button>
                    <button
                        className="button"
                        onClick={() => setFilter('rejected')}
                        style={{
                            backgroundColor: filter === 'rejected' ? '#ef4444' : '#e5e7eb',
                            color: filter === 'rejected' ? 'white' : '#374151'
                        }}
                    >
                        Rejected ({stats.rejected})
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="card">
                    <p>Loading applications...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="card" style={{
                    backgroundColor: '#fee2e2',
                    borderColor: '#ef4444'
                }}>
                    <p style={{ color: '#991b1b' }}>Error: {error}</p>
                    <button className="button" onClick={fetchApplications}>
                        Retry
                    </button>
                </div>
            )}

            {/* Applications List */}
            {!loading && !error && (
                <div>
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
                                        <h3 style={{ margin: '0 0 4px 0' }}>{app.name}</h3>
                                        <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                                            {app.id}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        {getStatusBadge(app.status)}
                                        {getCategoryBadge(app.category)}
                                    </div>
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
                                            <a href={`mailto:${app.email}`} style={{ color: '#3b82f6' }}>
                                                {app.email}
                                            </a>
                                        </p>
                                    </div>
                                    {app.phone && (
                                        <div>
                                            <strong style={{ fontSize: '14px', color: '#6b7280' }}>Phone:</strong>
                                            <p style={{ margin: '4px 0 0 0' }}>{app.phone}</p>
                                        </div>
                                    )}
                                    {app.profession && (
                                        <div>
                                            <strong style={{ fontSize: '14px', color: '#6b7280' }}>Profession:</strong>
                                            <p style={{ margin: '4px 0 0 0' }}>{app.profession}</p>
                                        </div>
                                    )}
                                    <div>
                                        <strong style={{ fontSize: '14px', color: '#6b7280' }}>Submitted:</strong>
                                        <p style={{ margin: '4px 0 0 0' }}>
                                            {new Date(app.submittedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {app.message && (
                                    <div style={{
                                        backgroundColor: '#f9fafb',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        marginTop: '12px'
                                    }}>
                                        <strong style={{ fontSize: '14px', color: '#6b7280' }}>Message:</strong>
                                        <p style={{ margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>
                                            {app.message}
                                        </p>
                                    </div>
                                )}

                                {/* Action Buttons (Future enhancement) */}
                                <div style={{
                                    marginTop: '12px',
                                    paddingTop: '12px',
                                    borderTop: '1px solid #e5e7eb',
                                    display: 'flex',
                                    gap: '8px'
                                }}>
                                    <button
                                        className="button"
                                        style={{
                                            fontSize: '14px',
                                            padding: '6px 12px',
                                            backgroundColor: '#10b981',
                                            color: 'white'
                                        }}
                                        onClick={() => alert('Approve feature coming soon!')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="button"
                                        style={{
                                            fontSize: '14px',
                                            padding: '6px 12px',
                                            backgroundColor: '#ef4444',
                                            color: 'white'
                                        }}
                                        onClick={() => alert('Reject feature coming soon!')}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="button"
                                        style={{
                                            fontSize: '14px',
                                            padding: '6px 12px',
                                            backgroundColor: '#6b7280',
                                            color: 'white'
                                        }}
                                        onClick={() => alert('Contact feature coming soon!')}
                                    >
                                        Contact
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </Layout>
    );
}
