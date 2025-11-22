// components/Footer.js
export default function Footer({ className }){
  return (
    <footer className={"footer" + (className ? ` ${className}` : '')}>
      <div>© {new Date().getFullYear()} Catholic Medical Guild — All rights reserved</div>
      <div className="small">Parish: St. Joseph's Parish — Email: info@example.org</div>
    </footer>
  );
}
