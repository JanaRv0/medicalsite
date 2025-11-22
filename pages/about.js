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

       <section className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Mission */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Mission</h2>
          <p className="text-gray-700">
            To serve with compassion and uphold medical ethics guided by faith.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Vision</h2>
          <p className="text-gray-700">
            To inspire physicians to integrate spirituality and service in healthcare.
          </p>
        </div>

        {/* Objective */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Objective</h2>
          <p className="text-gray-700">
            To build a community that promotes learning, outreach, and ethical practice.
          </p>
        </div>

      </div>
    </section>


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
