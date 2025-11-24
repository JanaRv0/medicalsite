import { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import EventCard from "../components/EventCard";
import events from "../data/events.json";
import eventImages from "../data/eventImages.json";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = eventImages.length;
  const intervalRef = useRef(null);

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  // Auto-slide every 3s; pause on hover
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPaused && total > 1) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % total);
      }, 3000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused, total]);

  if (total === 0) {
    return (
      <Layout>
        <p className="p-8 text-center">No event images available.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Image Slider */}
      <section className="relative flex justify-center items-center mt-6">
        <div
          className="relative w-full max-w-5xl aspect-[1260/406] overflow-hidden rounded-xl shadow-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* stacked images with fade transition */}
          {eventImages.map((img, i) => {
            // if JSON contains filenames like "img1.jpg", build public path
            const src = img.src
              ? img.src.startsWith("/") || img.src.startsWith("http")
                ? img.src
                : `/images/events/${img.src}`
              : `/images/events/placeholder.jpg`; // fallback
            return (
              <img
                key={src + i}
                src={src}
                alt={img.alt || `Slide ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              />
            );
          })}

          {/* left/right gradient overlays for better contrast on buttons */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/40 to-transparent pointer-events-none rounded-l-xl" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/40 to-transparent pointer-events-none rounded-r-xl" />

          {/* Prev Button */}
          <button
            onClick={() => {
              prev();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 2500);
            }}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 z-30"
          >
            <span className="text-lg select-none">◀</span>
          </button>

          {/* Next Button */}
          <button
            onClick={() => {
              next();
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 2500);
            }}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 z-30"
          >
            <span className="text-lg select-none">▶</span>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {eventImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 2500);
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
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