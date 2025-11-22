// pages/guidelines.js
import Layout from '../components/Layout';

export default function Guidelines(){
  return (
    <Layout>
      <h2>Medical & Ethical Guidelines (Catholic perspective)</h2>

      <div className="card">
        <h3>End-of-life care</h3>
        <p>Supportive/palliative care is encouraged; disproportionate or futile treatment is not obligatory.</p>
      </div>

      <div className="card">
        <h3>Abortion / Euthanasia</h3>
        <p>The Church teaches respect for life from conception to natural death — see official documents for nuance.</p>
      </div>

      <div className="card">
        <h3>Contraception, IVF, Stem cells</h3>
        <p>Refer to official Church statements and Dignitas Personae for details.</p>
        <p><a href="https://www.vatican.va">Vatican documents</a></p>
      </div>
    </Layout>
  );
}
