import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-surface/95 backdrop-blur-md shadow-sm py-4 border-b border-moss-green/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 cursor-pointer">
            <Link to="hero" smooth={true} duration={800} className={`font-serif text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-dark-green' : 'text-beige'}`}>
              Morena G.
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={800}
                offset={-70}
                className={`cursor-pointer text-sm uppercase tracking-wider font-semibold transition-all hover:text-rosy-brown ${scrolled ? 'text-midnight-green' : 'text-beige/90 hover:text-white'}`}
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
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled ? 'text-dark-green' : 'text-beige'} focus:outline-none`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-primary-50 hover:text-primary-600 rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                to="booking"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsOpen(false)}
                className="block text-center w-full bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors mt-2"
              >
                Reservar Turno
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
