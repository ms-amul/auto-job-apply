/**
 * Marketing Layout
 * 
 * Applied to: /, /about, /pricing, etc.
 * Includes: Header, Footer, Cookie Consent
 */

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

