// components/Header.js
import Link from 'next/link';

export default function Header(){
  return (
    <header className="container header">
      <div>
        <h1 style={{margin:0}}>Catholic Medical Guild</h1>
        <div className="small">Faith. Medicine. Service.</div>
      </div>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/membership">Membership</Link>
        <Link href="/activities">Activities</Link>
        <Link href="/news">News</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
