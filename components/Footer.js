// components/Footer.js
export default function Footer(){
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Catholic Medical Guild — All rights reserved</div>
      <div className="small">Parish: St. Joseph's Parish — Email: info@example.org</div>
    </footer>
  );
}
