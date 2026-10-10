import React from 'react';
import { motion } from 'framer-motion';

const Diplomas = () => {
  const diplomas = [
    { id: 1, src: '/assets/cropped_diploma1.jpeg', alt: 'Título de Maquilladora Profesional' },
    { id: 2, src: '/assets/cropped_diploma2.jpeg', alt: 'Certificación de Especialización' },
    { id: 3, src: '/assets/cropped_diploma3.jpeg', alt: 'Certificación Masterclass' }
  ];

  return (
    <section className="py-24 bg-surface-container-low border-y border-moss-green/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-moss-green font-bold block mb-4">Garantía de Excelencia</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-6"
          >
            Formación &amp; Certificaciones
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-rosy-brown mx-auto mb-6"
          ></motion.div>
          <p className="text-midnight-green max-w-2xl mx-auto text-lg font-light">
            Para brindarte el mejor servicio, me mantengo en constante capacitación, avalando mis técnicas con las mejores academias e institutos del rubro. Tu rostro está en manos de una profesional certificada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {diplomas.map((diploma, index) => (
            <motion.div
              key={diploma.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-surface-container-lowest p-3 rounded-2xl border border-beige shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="overflow-hidden rounded-xl h-full border border-moss-green/10">
                <img 
                  src={diploma.src} 
                  alt={diploma.alt} 
                  className="w-full h-full object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Diplomas;
