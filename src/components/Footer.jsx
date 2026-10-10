import React from 'react';
import { MapPin, Mail, Phone, Instagram } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-dark-green text-surface-dim py-16 border-t border-rosy-brown/20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-midnight-green/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          
          {/* Brand & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-3xl font-serif font-bold text-surface mb-6">Morena G.</h3>
            <p className="text-beige/70 mb-8 max-w-sm font-light leading-relaxed">
              Maquillaje profesional especializado en resaltar tu belleza auténtica con acabados de alta costura botánica.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/moreg.makeup" target="_blank" rel="noopener noreferrer" className="bg-midnight-green p-3 rounded-full text-surface hover:text-dark-green hover:bg-rosy-brown transition-all duration-300 shadow-lg">
                <Instagram size={22} />
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
                    duration={800}
                    className="text-beige/80 hover:text-surface hover:underline underline-offset-4 decoration-rosy-brown transition-all cursor-pointer font-light"
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
                <span className="font-light text-beige/80">Rosario, Santa Fe</span>
              </li>
              <li className="flex items-center justify-center md:justify-start group">
                <Phone size={20} className="text-moss-green mr-3 group-hover:text-rosy-brown transition-colors" />
                <span className="font-light text-beige/80">+54 9 341 378 0411</span>
              </li>
              <li className="flex items-center justify-center md:justify-start group">
                <Mail size={20} className="text-moss-green mr-3 group-hover:text-rosy-brown transition-colors" />
                <span className="font-light text-beige/80">morenagarnica16@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-beige/50">
          <p>&copy; {new Date().getFullYear()} Morena Garnica Makeup. Todos los derechos reservados.</p>
          <p>Diseñado con dedicación.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
