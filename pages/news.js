// pages/news.js
import Layout from '../components/Layout';
import news from '../data/news.json';

export default function News(){
  return (
    <Layout footerClass="footer--fixed">
      <h2>News & Announcements</h2>
      <div>
        {news.map(n => (
          <div className="card" key={n.id}>
            <h3>{n.title}</h3>
            <div className="small">{n.date}</div>
            <p>{n.summary}</p>
            <a href={n.link}>Read more</a>
          </div>
        ))}
      </div>
    </Layout>
  );
}
