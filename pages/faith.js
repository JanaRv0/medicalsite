// pages/resources.js
import Layout from '../components/Layout';

export default function Resources(){
  return (
    <Layout>
      <h2>Faith & Spiritual Resources</h2>

      <div className="card">
        <h3>Daily Bible Reflections</h3>
        <p>Short reflections for healthcare workers — updated daily (sample content).</p>
      </div>

      <div className="card">
        <h3>Catholic Medical Ethics</h3>
        <p>Guides on how Church teaching applies to clinical practice: end-of-life care, reproductive ethics, and more.</p>
        <ul>
          <li><a href="/guidelines">Medical & Ethical Guidelines</a></li>
          <li><a href="https://www.vatican.va">Vatican resources</a></li>
        </ul>
      </div>

      <div className="card">
        <h3>Prayers for Healthcare Workers</h3>
        <p>Short prayers to use before shift or after difficult cases.</p>
      </div>
    </Layout>
  );
}
