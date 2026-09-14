import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { SiteProvider, useSiteContext } from './context/SiteContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { StickyMobileBar } from './components/common/StickyMobileBar';
import { BookingForm } from './components/booking/BookingForm';
import { BookingSuccessModal } from './components/booking/BookingSuccessModal';
import { ServiceBookingLead } from './types';

// Page imports
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { LocalityDetailPage } from './pages/LocalityDetailPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { BookServicePage } from './pages/BookServicePage';
import { BlogPage } from './pages/BlogPage';
import { LegalPages } from './pages/LegalPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { TechnicianDashboardPage } from './pages/TechnicianDashboardPage';

// Booking Modal overlay wrapper
interface BookingModalProps {
  isOpen: boolean;
  initialServiceSlug?: string;
  initialLocality?: string;
  onClose: () => void;
  onSuccess: (lead: ServiceBookingLead) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, initialServiceSlug, initialLocality, onClose, onSuccess }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 relative mb-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close booking form"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6">
          <BookingForm
            initialServiceId={initialServiceSlug}
            initialLocality={initialLocality}
            onSuccess={onSuccess}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [successLead, setSuccessLead] = useState<ServiceBookingLead | null>(null);
  const { pathname } = useLocation();
  const { businessInfo } = useSiteContext();

  const hideHeaderFooter = pathname.startsWith('/admin') || pathname.startsWith('/login') || pathname.startsWith('/portal');

  // "Book Now" directly dials the business — no form modal
  const openBooking = (_serviceSlug?: string, _localityName?: string) => {
    window.location.href = `tel:${businessInfo.phone}`;
  };

  const handleBookingSuccess = (lead: ServiceBookingLead) => {
    setSuccessLead(lead);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {!hideHeaderFooter && <Header onOpenBooking={openBooking} />}

      <main className="flex-1">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage onOpenBooking={openBooking} />} />
          <Route path="/services/" element={<ServicesPage onOpenBooking={openBooking} />} />

          {/* 5 Service Pages */}
          <Route path="/ac-repair/" element={<ServiceDetailPage onOpenBooking={openBooking} />} />
          <Route path="/washing-machine-repair/" element={<ServiceDetailPage onOpenBooking={openBooking} />} />
          <Route path="/refrigerator-repair/" element={<ServiceDetailPage onOpenBooking={openBooking} />} />
          <Route path="/microwave-repair/" element={<ServiceDetailPage onOpenBooking={openBooking} />} />
          <Route path="/geyser-repair/" element={<ServiceDetailPage onOpenBooking={openBooking} />} />
          {/* Generic service slug catch-all */}
          <Route path="/:serviceSlug/" element={<ServiceDetailPage onOpenBooking={openBooking} />} />

          {/* Ranchi Service Area Pages */}
          <Route path="/service-areas/" element={<ServiceAreasPage onOpenBooking={openBooking} />} />
          <Route path="/service-areas/ranchi/" element={<ServiceAreasPage onOpenBooking={openBooking} />} />
          <Route path="/service-areas/ranchi/:localitySlug/" element={<LocalityDetailPage onOpenBooking={openBooking} />} />
          <Route path="/service-areas/ranchi/:localitySlug/:serviceSlug/" element={<LocalityDetailPage onOpenBooking={openBooking} />} />

          {/* Company Pages */}
          <Route path="/about-us/" element={<AboutUsPage />} />
          <Route path="/reviews/" element={<ReviewsPage />} />
          <Route path="/faq/" element={<FaqPage />} />
          <Route path="/contact/" element={<ContactPage />} />
          <Route path="/book-service/" element={<BookServicePage onSuccess={handleBookingSuccess} />} />

          {/* Blog */}
          <Route path="/blog/" element={<BlogPage onOpenBooking={openBooking} />} />
          <Route path="/blog/:blogSlug/" element={<BlogPage onOpenBooking={openBooking} />} />

          {/* Legal */}
          <Route path="/privacy-policy/" element={<LegalPages />} />
          <Route path="/terms-and-conditions/" element={<LegalPages />} />
          <Route path="/cancellation-policy/" element={<LegalPages />} />

          {/* Auth & Portal Pages */}
          <Route path="/login/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/portal/" element={<LoginPage />} />
          <Route path="/portal" element={<LoginPage />} />
          <Route path="/dashboard/" element={<CustomerDashboardPage onOpenBooking={openBooking} />} />
          <Route path="/dashboard" element={<CustomerDashboardPage onOpenBooking={openBooking} />} />
          <Route path="/technician/" element={<TechnicianDashboardPage />} />
          <Route path="/technician" element={<TechnicianDashboardPage />} />

          {/* Admin */}
          <Route path="/admin/*" element={<AdminPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage onOpenBooking={openBooking} />} />
        </Routes>
      </main>

      {!hideHeaderFooter && <Footer />}
      {!hideHeaderFooter && <StickyMobileBar onOpenBooking={openBooking} />}




      {/* Booking Success Modal */}
      {successLead && (
        <BookingSuccessModal
          lead={successLead}
          onClose={() => setSuccessLead(null)}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SiteProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </SiteProvider>
  );
};

export default App;
