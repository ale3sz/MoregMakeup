import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

const TrustBanner = () => {
  const highlights = [
    {
      icon: <Award size={20} className="text-rosy-brown" />,
      title: 'Maquilladora Certificada',
      subtitle: 'Egresada ISEM Profesional'
    },
    {
      icon: <Sparkles size={20} className="text-rosy-brown" />,
      title: 'Experiencia en Medios',
      subtitle: 'Telefe & Diario La Capital'
    },
    {
      icon: <ShieldCheck size={20} className="text-rosy-brown" />,
      title: 'Higiene & Skincare Clínico',
      subtitle: 'Sanitización estricta de brochas'
    },
    {
      icon: <HeartHandshake size={20} className="text-rosy-brown" />,
      title: 'Fijación 16 Horas',
      subtitle: 'A prueba de agua y emociones'
    }
  ];

  return (
    <section className="relative z-20 bg-dark-green text-surface border-y border-rosy-brown/25 py-8 md:py-10 overflow-hidden shadow-xl">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Logo badge item */}
          <div className="flex items-center gap-4 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-rosy-brown/20 pb-6 lg:pb-0 lg:pr-8 w-full lg:w-auto justify-center lg:justify-start">
            <img 
              src={`${import.meta.env.BASE_URL}logos/sello_badge_circular_vector.svg`} 
              alt="Morena Garnica Sello de Calidad" 
              className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 animate-[spin_40s_linear_infinite]"
            />
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-rosy-brown font-bold block">
                Atelier Profesional
              </span>
              <p className="font-serif text-lg md:text-xl font-bold text-beige leading-tight">
                Garantía de Calidad
              </p>
              <p className="text-xs text-beige/70 font-light">
                Rosario &bull; Servicio Exclusivo
              </p>
            </div>
          </div>

          {/* Value props grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
            {highlights.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl flex-shrink-0 backdrop-blur-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-beige leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-beige/70 font-light mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
