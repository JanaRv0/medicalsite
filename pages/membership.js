// pages/membership.js - Enhanced Membership Application Form
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Membership() {
  // State management
  const [status, setStatus] = useState(null); // null, 'sending', 'submitted', 'error'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profession: '',
    category: 'Student',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [applicationId, setApplicationId] = useState(null);

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  /**
   * Validate form data before submission
   */
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.phone) || formData.phone.trim().length < 8) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  async function handleSubmit(e) {
    e.preventDefault();

    // Reset previous submission status
    setStatus(null);
    setApplicationId(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Set loading state
    setStatus('sending');

    try {
      // Send application to API
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();

      if (json.status === 'ok') {
        setStatus('submitted');
        setApplicationId(json.applicationId);
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          phone: '',
          profession: '',
          category: 'Student',
          message: ''
        });
      } else {
        setStatus('error');
        console.error('Submission error:', json.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('error');
    }
  }

  /**
   * Get fee information based on selected category
   */
  const getFeeInfo = (category) => {
    const fees = {
      'Student': { amount: 'Free', color: '#10b981' },
      'Full Member': { amount: '$20/year', color: '#3b82f6' },
      'Associate': { amount: '$15/year', color: '#8b5cf6' },
      'Honorary': { amount: 'By invitation', color: '#f59e0b' }
    };
    return fees[category] || fees['Student'];
  };

  const currentFee = getFeeInfo(formData.category);

  return (
    <Layout>
      <h2>Membership</h2>

      <div className="card">
        <h3>Who can join</h3>
        <p>Doctors, nurses, allied health professionals, medical students, and anyone working in healthcare who agrees with the guild's mission.</p>

        <h3>Benefits</h3>
        <ul>
          <li>Access to CME and ethical guidance</li>
          <li>Pastoral support and networking</li>
          <li>Participation in outreach programs</li>
          <li>Professional development opportunities</li>
          <li>Community events and conferences</li>
        </ul>

        <h3>Categories & Fees</h3>
        <ul>
          <li><strong>Student</strong> — Free</li>
          <li><strong>Full Member</strong> — Annual fee: $20</li>
          <li><strong>Associate</strong> — Annual fee: $15</li>
          <li><strong>Honorary</strong> — By invitation only</li>
        </ul>
      </div>

      <div className="card">
        <h3>Online Application</h3>

        {/* Success Message */}
        {status === 'submitted' && (
          <div style={{
            backgroundColor: '#d1fae5',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <h4 style={{ color: '#065f46', marginTop: 0 }}>✓ Application Submitted Successfully!</h4>
            <p style={{ color: '#047857', margin: '8px 0' }}>
              Thank you for applying! We have received your application.
            </p>
            {applicationId && (
              <p style={{ color: '#047857', margin: '8px 0', fontSize: '14px' }}>
                <strong>Application ID:</strong> {applicationId}
              </p>
            )}
            <p style={{ color: '#047857', margin: '8px 0', fontSize: '14px' }}>
              We will review your application and contact you within 3-5 business days at <strong>{formData.email || 'your email'}</strong>.
            </p>
          </div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <div style={{
            backgroundColor: '#fee2e2',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <h4 style={{ color: '#991b1b', marginTop: 0 }}>✗ Submission Failed</h4>
            <p style={{ color: '#b91c1c', margin: '8px 0' }}>
              There was an error submitting your application. Please try again or contact us directly.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-field">
            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              name="name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'sending'}
              placeholder="Enter your full name"
              required
            />
            {errors.name && (
              <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                {errors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="form-field">
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'sending'}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && (
              <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Phone Field */}
          <div className="form-field">
            <label htmlFor="phone">Phone Number (Optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="input"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'sending'}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <span style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                {errors.phone}
              </span>
            )}
          </div>

          {/* Profession Field */}
          <div className="form-field">
            <label htmlFor="profession">Profession / Specialty (Optional)</label>
            <input
              id="profession"
              name="profession"
              className="input"
              value={formData.profession}
              onChange={handleChange}
              disabled={status === 'sending'}
              placeholder="e.g., Cardiologist, Nurse, Medical Student"
            />
          </div>

          {/* Category Field */}
          <div className="form-field">
            <label htmlFor="category">Membership Category *</label>
            <select
              id="category"
              name="category"
              className="input"
              value={formData.category}
              onChange={handleChange}
              disabled={status === 'sending'}
              required
            >
              <option value="Student">Student</option>
              <option value="Full Member">Full Member</option>
              <option value="Associate">Associate</option>
              <option value="Honorary">Honorary</option>
            </select>
            <div style={{
              marginTop: '8px',
              padding: '8px 12px',
              backgroundColor: '#f3f4f6',
              borderRadius: '6px',
              fontSize: '14px',
              color: currentFee.color,
              fontWeight: '600'
            }}>
              Fee: {currentFee.amount}
            </div>
          </div>

          {/* Message Field */}
          <div className="form-field">
            <label htmlFor="message">Message / Qualifications (Optional)</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="input"
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'sending'}
              placeholder="Tell us about your qualifications, experience, or why you want to join..."
            />
          </div>

          {/* Submit Button */}
          <button
            className="button"
            type="submit"
            disabled={status === 'sending'}
            style={{
              opacity: status === 'sending' ? 0.6 : 1,
              cursor: status === 'sending' ? 'not-allowed' : 'pointer'
            }}
          >
            {status === 'sending' ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Payment Methods</h3>
        <p>
          After your application is approved, you will receive payment instructions via email.
        </p>
        <p>
          <strong>Payment Options:</strong>
        </p>
        <ul>
          <li>Bank Transfer - Details will be provided after approval</li>
          <li>Online Payment - Secure payment link will be sent</li>
          <li>Student Members - No payment required</li>
        </ul>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '16px' }}>
          <em>Please include your name and 'Membership Fee' in the payment reference.</em>
        </p>
      </div>
    </Layout>
  );
}

