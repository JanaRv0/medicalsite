// pages/membership.js
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Membership(){
  const [status, setStatus] = useState(null);

  async function handleSubmit(e){
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    setStatus(json.status === 'ok' ? 'submitted' : 'error');
  }

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
        </ul>

        <h3>Categories & Fees</h3>
        <ul>
          <li>Student — Free</li>
          <li>Full Member — Annual fee: $20</li>
          <li>Associate — $15</li>
          <li>Honorary — By invitation</li>
        </ul>
      </div>

      <div className="card">
        <h3>Online Application</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name</label>
            <input name="name" className="input" required />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input name="email" type="email" className="input" required />
          </div>
          <div className="form-field">
            <label>Category</label>
            <select name="category" className="input">
              <option>Student</option>
              <option>Full Member</option>
              <option>Associate</option>
              <option>Honorary</option>
            </select>
          </div>
          <div className="form-field">
            <label>Short message / qualifications</label>
            <textarea name="message" rows="4" className="input" />
          </div>
          <button className="button" type="submit">Apply</button>
        </form>

        {status === 'sending' && <div className="small">Sending...</div>}
        {status === 'submitted' && <div className="small">Application submitted — we will contact you.</div>}
        {status === 'error' && <div className="small">Error submitting application.</div>}
      </div>

      <div className="card">
        <h3>Payment Methods</h3>
        <p>Bank transfer to Guild Account — (Bank details shown here). Please include your name and 'Membership Fee' in the reference.</p>
      </div>
    </Layout>
  );
}
