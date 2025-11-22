// components/EventCard.js
export default function EventCard({ event }){
  return (
    <div className="card">
      <img src={event.image || '/images/placeholder-event.jpg'} className="img-thumb" alt={event.title} />
      <h3>{event.title}</h3>
      <div className="small">{event.date} • {event.location}</div>
      <p>{event.summary}</p>
    </div>
  );
}
