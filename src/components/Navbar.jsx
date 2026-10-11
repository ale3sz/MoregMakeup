import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Servicios', to: 'services' },
    { name: 'Portfolio', to: 'portfolio' },
    { name: 'Sobre Mí', to: 'about' },
    { name: 'FAQ', to: 'faq' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isLoggedIn ? 'top-11 md:top-12' : 'top-0'} ${scrolled ? 'bg-surface/95 dark:bg-[#061D13]/95 backdrop-blur-md shadow-sm py-4 border-b border-moss-green/10 dark:border-rosy-brown/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="hero" smooth={true} duration={800} className={`font-serif text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-dark-green dark:text-[#F7F4D5]' : 'text-beige'}`}>
              More G.
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={800}
                offset={-70}
                className={`cursor-pointer text-sm uppercase tracking-wider font-semibold transition-all hover:text-rosy-brown ${scrolled ? 'text-midnight-green dark:text-beige/90' : 'text-beige/90 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="booking"
              smooth={true}
              duration={800}
              offset={-70}
              className={`cursor-pointer px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all shadow-md ${scrolled ? 'bg-dark-green text-surface hover:bg-moss-green' : 'bg-rosy-brown text-dark-green hover:bg-beige'}`}
            >
              Reservar
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button + Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-dark-green dark:text-[#F7F4D5]' : 'text-beige'} focus:outline-none cursor-pointer`}
              aria-label="Abrir menú de navegación"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-dark-green/95 dark:bg-[#04140D]/98 backdrop-blur-xl border-b border-rosy-brown/20 shadow-2xl"
          >
            <div className="px-6 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={600}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-serif tracking-wider text-beige/90 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link
                  to="booking"
                  smooth={true}
                  duration={600}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full bg-rosy-brown hover:bg-beige text-dark-green px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(211,150,140,0.3)] cursor-pointer"
                >
                  Reservar Turno
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
