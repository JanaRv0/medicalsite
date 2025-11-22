// pages/gallery.js
import Layout from '../components/Layout';

export default function Gallery(){
  // For demo, use public images in /public/images
  const photos = [
    '/images/placeholder-event.jpg',
    '/images/member-1.jpg',
    '/images/placeholder-event.jpg'
  ];

  return (
    <Layout>
      <h2>Gallery</h2>
      <div className="grid">
        {photos.map((p,i) => (
          <div className="card" key={i}>
            <img src={p} className="img-thumb" alt={`gallery-${i}`} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
