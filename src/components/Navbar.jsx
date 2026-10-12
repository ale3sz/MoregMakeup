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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', to: 'hero', offset: 0 },
    { name: 'Servicios', to: 'services', offset: -70 },
    { name: 'Portfolio', to: 'portfolio', offset: -70 },
    { name: 'Sobre Mí', to: 'about', offset: -70 },
    { name: 'FAQ', to: 'faq', offset: -70 },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-[background-color,padding,border-color,backdrop-filter] duration-200 ${isLoggedIn ? 'top-11 md:top-12' : 'top-0'} ${scrolled ? 'bg-surface/95 dark:bg-[#061D13]/95 backdrop-blur-md shadow-sm py-3.5 border-b border-moss-green/10 dark:border-rosy-brown/20' : 'bg-transparent py-5'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="hero" smooth={true} duration={450} className="flex items-center gap-3.5 group btn-press">
              {/* MG Monogram Icon */}
              <div className="relative flex items-center justify-center">
                <img 
                  src={`${import.meta.env.BASE_URL}brand/isotipo_mg_rose.svg`}
                  alt="MG"
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105 filter drop-shadow-sm"
                />
              </div>

              {/* Brand Name Typography */}
              <div className="flex flex-col text-left">
                <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight leading-none transition-colors duration-200 ${scrolled ? 'text-dark-green dark:text-[#F7F4D5]' : 'text-beige'}`}>
                  Morena Garnica
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-rosy-brown font-semibold mt-1">
                  Make-up Artist
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={450}
                offset={link.offset ?? -70}
                className={`cursor-pointer text-sm uppercase tracking-wider font-semibold transition-colors duration-150 hover:text-rosy-brown ${scrolled ? 'text-midnight-green dark:text-beige/90' : 'text-beige/90 hover:text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="booking"
              smooth={true}
              duration={450}
              offset={-70}
              className={`cursor-pointer px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-md btn-press ${scrolled ? 'bg-dark-green text-surface hover:bg-moss-green' : 'bg-rosy-brown text-dark-green hover:bg-beige'}`}
            >
              Reservar
            </Link>
            <ThemeToggle scrolled={scrolled} />
          </div>

          {/* Mobile Menu Button + Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle scrolled={scrolled} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors duration-150 btn-press ${scrolled ? 'text-dark-green dark:text-[#F7F4D5]' : 'text-beige hover:text-white'} focus:outline-none cursor-pointer`}
              aria-label="Abrir menú de navegación"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-dark-green/95 dark:bg-[#04140D]/98 backdrop-blur-xl border-b border-rosy-brown/20 shadow-2xl"
          >
            <div className="px-6 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={400}
                  offset={link.offset ?? -70}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-serif tracking-wider text-beige/90 hover:text-white hover:bg-white/5 rounded-xl transition-colors duration-150 cursor-pointer btn-press"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-white/5">
                  <span className="text-sm font-serif tracking-wider text-beige">Tema de color</span>
                  <ThemeToggle showLabel={true} scrolled={false} />
                </div>
                <Link
                  to="booking"
                  smooth={true}
                  duration={400}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className="block text-center w-full bg-rosy-brown hover:bg-beige text-dark-green px-6 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(211,150,140,0.3)] cursor-pointer btn-press"
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
