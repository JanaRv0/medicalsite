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
      <div className="card" tabIndex={0}>
        <p>Email: <strong>info@example.org</strong></p>
        <p>Phone: +94 11 123 4567</p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/maria-perera" target="_blank" rel="noopener noreferrer">Maria Perera</a></p>
        <p>Office: St. Joseph's Parish, Colombo</p>

        <div className="overlay" aria-hidden="true">
          <div className="links">
            <a href="mailto:info@example.org" title="Email info@example.org">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
            </a>

            <a href="tel:+94111234567" title="Call +94 11 123 4567">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.5.74 3.83.74a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.33.26 2.63.74 3.83a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>
            </a>

            <a href="https://www.linkedin.com/in/maria-perera" target="_blank" rel="noopener noreferrer" title="Maria Perera on LinkedIn">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-9.75 7.5H7.5V18h1.75V10.5zM8.38 9.3a1.02 1.02 0 1 0 .02-2.04 1.02 1.02 0 0 0-.02 2.04zM16.5 12.75c0-2.25-1.2-3.3-2.8-3.3-1.28 0-1.85.7-2.17 1.2V10.5H9.5V18h1.75v-3.8c0-.2.01-.41.08-.56.18-.44.59-.9 1.27-.9.9 0 1.26.68 1.26 1.68V18H16.5v-5.25z"/></svg>
            </a>
          </div>
        </div>
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
