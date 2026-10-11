import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const FloatingWhatsApp = () => {
  const { content } = useContent();
  const [hovered, setHovered] = useState(false);
  const phone = content?.contact?.whatsappNumber || '5493413780411';
  const defaultText = encodeURIComponent('¡Hola Morena! Te contacto desde tu página web para hacerte una consulta.');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip / Label */}
      <div 
        className={`bg-dark-green text-surface text-xs font-semibold uppercase tracking-wider py-2 px-3.5 rounded-full shadow-xl border border-beige/30 transition-all duration-300 pointer-events-none hidden sm:block ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        ¿Tenés dudas? Consulta Rápida
      </div>

      {/* Floating Button */}
      <a
        href={`https://wa.me/${phone}?text=${defaultText}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Contactar por WhatsApp"
        className="relative group bg-[#25D366] hover:bg-[#1EBE5D] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center focus:outline-none"
      >
        {/* Pulse ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping -z-10 opacity-75"></span>
        
        <MessageCircle size={28} className="fill-white stroke-none" />
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
