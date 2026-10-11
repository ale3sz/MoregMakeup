import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Diplomas from './components/Diplomas';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import AdminBar from './components/admin/AdminBar';
import LoginModal from './components/admin/LoginModal';
import AdminModal from './components/admin/AdminModal';

function MainContent() {
  const { isLoggedIn } = useAuth();

  return (
    <div className={`min-h-screen font-sans transition-all ${isLoggedIn ? 'pt-12' : ''}`}>
      <AdminBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Diplomas />
        <Testimonials />
        <Booking />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
      
      {/* Editor & Admin Modals */}
      <LoginModal />
      <AdminModal />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <MainContent />
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
