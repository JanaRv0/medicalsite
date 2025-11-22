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
          </div>
        ))}
      </div>
    </Layout>
  );
}
