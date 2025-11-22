// pages/about.js
import Layout from '../components/Layout';

export default function About(){
  return (
    <Layout>
      <h2>About the Guild</h2>

      <div className="card">
        <h3>History</h3>
        <p>Founded in 1998 by a group of Catholic healthcare professionals to support faith-based medical practice and outreach.</p>
      </div>

      <div className="card">
        <h3>Vision / Mission / Objectives</h3>
        <ul>
          <li>Promote Catholic medical ethics within practice.</li>
          <li>Provide pastoral support to healthcare workers.</li>
          <li>Organize community medical outreach and education.</li>
        </ul>
      </div>

      <div className="card">
        <h3>Patron Saints</h3>
        <p><strong>St. Luke the Evangelist</strong> – patron of physicians and surgeons.</p>
      </div>

      <div className="card">
        <h3>Constitution / Governing Structure</h3>
        <p>The guild is led by an Executive Committee elected every two years. Committees oversee outreach, education, and pastoral care.</p>
      </div>

      <div className="card">
        <h3>Message from the President</h3>
        <p>Dear members — it is my honour to serve. We will continue focusing on clinical excellence rooted in faith and charity.</p>
      </div>
    </Layout>
  );
}
