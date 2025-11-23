import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import events from "../data/events.json";
import eventImages from "../data/eventImages.json";

export default function Home() {
  const [index, setIndex] = useState(0);
  const total = eventImages.length;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  // ✅ Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <Layout>
      {/* Image Slider */}
      <section className="relative flex justify-center items-center mt-6">
        <div className="relative w-[1260px] h-[406px] overflow-hidden rounded shadow-lg">
          <img
            src={eventImages[index].src}
            alt={eventImages[index].alt}
            width={1260}
            height={406}
            className="w-[1260px] h-[406px] object-cover"
          />

          {/* Prev Button */}
          <button
            onClick={prev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
          >
            ◀
          </button>

          {/* Next Button */}
          <button
            onClick={next}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="hero mt-8 text-center">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p>
          To support healthcare professionals in living out their Catholic faith
          while providing compassionate medical care.
        </p>
        <p className="small">
          Welcome to the official site of the Catholic Medical Guild. We combine
          clinical excellence with pastoral care.
        </p>
      </section>

      {/* Quick Links */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <div className="flex gap-3 flex-wrap justify-center mt-4">
          <a className="card" href="/membership">Join the Guild</a>
          <a className="card" href="/activities">Events & Activities</a>
          <a className="card" href="/resources">Faith & Resources</a>
          <a className="card" href="/contact">Contact Us</a>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>
    </Layout>
  );
}