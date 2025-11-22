// components/Layout.js
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, footerClass }){
  return (
    <>
      <Header />
      <main className={"container" + (footerClass ? ' with-fixed-footer' : '')}>{children}</main>
      <Footer className={footerClass} />
    </>
  );
}
