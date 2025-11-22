// pages/index.js
import Layout from '../components/Layout';
import EventCard from '../components/EventCard';
import events from '../data/events.json';

export default function Home(){
  return (
    <Layout>
        <section>
  

  <div className="overflow-hidden whitespace-nowrap">
    <div className="inline-flex animate-marquee gap-6">
      {events.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
    </div>
  </div>
</section>

      <section className="hero">
        <h2>Our Mission</h2>
        <p>To support healthcare professionals in living out their Catholic faith while providing compassionate medical care.</p>
        <p className="small">Welcome to the official site of the Catholic Medical Guild. We combine clinical excellence with pastoral care.</p>
      </section>

      <section>
        <h2>Quick Links</h2>
        <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          <a className="card" href="/membership">Join the Guild</a>
          <a className="card" href="/activities">Events & Activities</a>
          <a className="card" href="/resources">Faith & Resources</a>
          <a className="card" href="/contact">Contact Us</a>
        </div>
      </section>

      <section>
        <h2 style={{marginTop:20}}>Upcoming Events</h2>
        <div className="grid">
          {events.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      </section>
    </Layout>
  );
}
