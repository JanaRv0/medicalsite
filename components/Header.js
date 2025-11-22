// components/Header.js
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Header(){
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="header-sticky">
      <header className="container header">
        <div className="header__title-group">
          <div className="logo"></div>
          <div className="header__text">
            <h1 style={{margin:0}}>Catholic Medical Guild</h1>
            <div className="small">Faith. Medicine. Service.</div>
          </div>
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(!isMenuOpen)} aria-label="toggle navigation">
          <span className="hamburger"></span>
        </button>
        <nav className={`nav ${isMenuOpen ? 'nav--visible' : ''}`} onClick={() => setMenuOpen(false)}>
          <Link href="/" className={router.pathname === "/" ? "active" : ""}>Home</Link>
          <Link href="/about" className={router.pathname === "/about" ? "active" : ""}>About</Link>
          <Link href="/membership" className={router.pathname === "/membership" ? "active" : ""}>Membership</Link>
          <Link href="/executives" className={router.pathname === "/executives" ? "active" : ""}>Executive Committee</Link>
          <Link href="/activities" className={router.pathname === "/activities" ? "active" : ""}>Activities</Link>
          <Link href="/news" className={router.pathname === "/news" ? "active" : ""}>News</Link>
          <Link href="/faith" className={router.pathname === "/faith" ? "active" : ""}>Faith</Link>
          <Link href="/guidelines" className={router.pathname === "/guidelines" ? "active" : ""}>Guidelines</Link>
          <Link href="/outreach" className={router.pathname === "/outreach" ? "active" : ""}>Outreach</Link>
          <Link href="/contact" className={router.pathname === "/contact" ? "active" : ""}>Contact</Link>
        </nav>
      </header>
    </div>
  );
}
