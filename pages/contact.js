// pages/contact.js
import Layout from '../components/Layout';
import { useState } from 'react';

export default function Contact(){
  const [status, setStatus] = useState(null);

  async function submitHandler(e){
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)
    });
    const json = await res.json();
    setStatus(json.status === 'ok' ? 'sent' : 'error');
  }

  return (
    <Layout>
      <h2>Contact Us</h2>
      <div className="card">
        <p>Email: <strong>info@example.org</strong></p>
        <p>Phone: +94 11 123 4567</p>
        <p>Office: St. Joseph's Parish, Colombo</p>
      </div>

      <div className="card">
        <h3>Feedback / Message</h3>
        <form onSubmit={submitHandler}>
          <div className="form-field"><label>Name</label><input name="name" className="input" required /></div>
          <div className="form-field"><label>Email</label><input name="email" type="email" className="input" required /></div>
          <div className="form-field"><label>Message</label><textarea name="message" rows="5" className="input" required /></div>
          <button className="button" type="submit">Send</button>
        </form>
        {status === 'sending' && <div className="small">Sending...</div>}
        {status === 'sent' && <div className="small">Thank you — we will reply soon.</div>}
        {status === 'error' && <div className="small">Error sending message.</div>}
      </div>
    </Layout>
  );
}
