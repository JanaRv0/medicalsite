// pages/executive.js
import Layout from '../components/Layout';
import members from '../data/members.json';

export default function Executive(){
  return (
    <Layout>
      <h2>Executive Committee</h2>
      <div className="grid">
        {members.map(m => (
          <div className="card" key={m.id}>
            <img src={m.photo} className="img-thumb" alt={m.name} />
            <h3>{m.name}</h3>
            <div className="small">{m.role}</div>
            <p>{m.bio}</p>
            <div className="small">Contact: {m.contact}</div>

            <div className="overlay" aria-hidden="true">
              <div className="links">
                <a href={`mailto:${m.contact}`} title={`Email ${m.name}`}>
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <span>Email</span>
                </a>

                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" title={`${m.name} on LinkedIn`}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-9.75 7.5H7.5V18h1.75V10.5zM8.38 9.3a1.02 1.02 0 1 0 .02-2.04 1.02 1.02 0 0 0-.02 2.04zM16.5 12.75c0-2.25-1.2-3.3-2.8-3.3-1.28 0-1.85.7-2.17 1.2V10.5H9.5V18h1.75v-3.8c0-.2.01-.41.08-.56.18-.44.59-.9 1.27-.9.9 0 1.26.68 1.26 1.68V18H16.5v-5.25z"/></svg>
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </Layout>
  );
}
