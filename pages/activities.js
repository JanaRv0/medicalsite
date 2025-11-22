// pages/activities.js
import Layout from '../components/Layout';
import events from '../data/events.json';
import EventCard from '../components/EventCard';

export default function Activities(){
  return (
    <Layout>
      <h2>Activities & Events</h2>
      <section>
        <h3>Upcoming</h3>
        <div className="grid">
          {events.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      </section>

      <section>
        <h3>Past Highlights</h3>
        <div className="card">
          <p>Past events include medical outreach, retreats, and CME programs. See gallery for photos.</p>
        </div>
      </section>

      <section>
        <h3>Annual Calendar</h3>
        <div className="card">
          <ul>
            <li>Jan: Retreat</li>
            <li>Mar: Free clinic</li>
            <li>Sep: Annual CME</li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
