import React from 'react';
import { MapPin, Mail, Phone, Lock } from 'lucide-react';
import { Link } from 'react-scroll';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { content } = useContent();
  const { openLoginModal, isLoggedIn } = useAuth();
  const contact = content?.contact || {};

  return (
    <footer className="bg-dark-green text-surface-dim py-16 border-t border-rosy-brown/20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-midnight-green/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          
          {/* Brand & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3.5 mb-4">
              <img 
                src={`${import.meta.env.BASE_URL}brand/isotipo_mg_rose.svg`}
                alt="MG"
                className="h-12 w-auto object-contain filter drop-shadow-md"
              />
              <div className="flex flex-col text-left">
                <span className="font-serif text-2xl font-bold tracking-tight text-surface leading-none">
                  Morena Garnica
                </span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-rosy-brown font-semibold mt-1">
                  Make-up Artist
                </span>
              </div>
            </div>
            <p className="text-beige/70 mb-8 max-w-sm font-light leading-relaxed text-sm">
              Maquillaje profesional especializado en resaltar tu belleza auténtica con acabados de alta costura botánica.
            </p>
            <div className="flex items-center space-x-3">
              <a 
                href={contact.instagramUrl || "https://www.instagram.com/morennagar/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram @morennagar"
                className="bg-midnight-green p-3 rounded-full text-surface hover:text-dark-green hover:bg-rosy-brown shadow-lg flex items-center justify-center group btn-press"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href={contact.instagramUrl || "https://www.instagram.com/morennagar/"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-beige/80 hover:text-rosy-brown text-sm font-light tracking-wide transition-colors btn-press"
              >
                {contact.instagramHandle || '@morennagar'}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs uppercase tracking-widest font-bold text-rosy-brown mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4">
              {['Inicio', 'Servicios', 'Portfolio', 'Sobre Mí', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item.toLowerCase() === 'inicio' ? 'hero' : item.toLowerCase().replace(' ', '')} 
                    smooth={true} 
                    duration={450}
                    className="text-beige/80 hover:text-surface hover:underline underline-offset-4 decoration-rosy-brown transition-colors cursor-pointer font-light btn-press"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xs uppercase tracking-widest font-bold text-rosy-brown mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start group">
                <MapPin size={20} className="text-moss-green mr-3 group-hover:text-rosy-brown transition-colors" />
                <span className="font-light text-beige/80">{contact.location || 'Rosario, Santa Fe'}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start group">
                <Phone size={20} className="text-moss-green mr-3 group-hover:text-rosy-brown transition-colors" />
                <span className="font-light text-beige/80">{contact.phone || '+54 9 341 378 0411'}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start group">
                <Mail size={20} className="text-moss-green mr-3 group-hover:text-rosy-brown transition-colors" />
                <span className="font-light text-beige/80">{contact.email || 'morenagarnica16@gmail.com'}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-beige/50">
          <p>&copy; {new Date().getFullYear()} Morena Garnica Makeup. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-4">
            <p>Diseñado con dedicación.</p>
            <button
              type="button"
              onClick={openLoginModal}
              className="text-beige/40 hover:text-rosy-brown transition-colors flex items-center gap-1.5 cursor-pointer py-1 px-2 rounded hover:bg-white/5 btn-press"
              title="Acceso al panel de administración"
            >
              <Lock size={12} />
              <span>{isLoggedIn ? 'Modo Editor Activo' : 'Acceso Morena'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
