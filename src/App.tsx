import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/sections/Navbar';
import Footer from './components/sections/Footer';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import OnlineStorePage from './pages/OnlineStorePage';
import CustomServicePage from './pages/CustomServicePage';
import CheckoutPage from './pages/CheckoutPage';
import StyleguidePage from './pages/StyleguidePage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import ManagePortfolio from './pages/admin/ManagePortfolio';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageBlog from './pages/admin/ManageBlog';
import ManageOrders from './pages/admin/ManageOrders';
import ManagePricing from './pages/admin/ManagePricing';
import ProfileSettings from './pages/admin/ProfileSettings';
import ManageTeam from './pages/admin/ManageTeam';
import ManageContent from './pages/admin/ManageContent';

import { ContentProvider } from './lib/ContentContext';
import ScrollToTop from './components/utils/ScrollToTop';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <ContentProvider>
      <div className="min-h-screen bg-white">
        {!isAdminPath && <Navbar />}
        <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/layanan" element={<ServicesPage />} />
          <Route path="/tentang-kami" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/layanan-toko-online" element={<OnlineStorePage />} />
          <Route path="/layanan-custom" element={<CustomServicePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/styleguide" element={<StyleguidePage />} />
          
          {/* Admin Auth */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Protected Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="portfolio" element={<ManagePortfolio />} />
            <Route path="orders" element={<ManageOrders />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="blog" element={<ManageBlog />} />
            <Route path="pricing" element={<ManagePricing />} />
            <Route path="team" element={<ManageTeam />} />
            <Route path="content" element={<ManageContent />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
        </Routes>
      </main>
      {!isAdminPath && (
        <>
          <FloatingWhatsApp />
          <Footer />
        </>
      )}
    </div>
    </ContentProvider>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
