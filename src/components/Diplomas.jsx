import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const Diplomas = () => {
  const [selectedDiploma, setSelectedDiploma] = useState(null);

  const diplomas = [
    { 
      id: 1, 
      src: `${import.meta.env.BASE_URL}assets/real_diploma_0.jpg`, 
      alt: 'Certificado de Perfeccionamiento en Maquillaje - ISEM',
      title: 'Perfeccionamiento en Maquillaje',
      institution: 'Instituto Superior de Estética y Moda (ISEM)'
    },
    { 
      id: 2, 
      src: `${import.meta.env.BASE_URL}assets/real_diploma_1.jpg`, 
      alt: 'Certificado de Maquillaje Profesional - ISEM',
      title: 'Maquillaje Profesional',
      institution: 'Instituto Superior de Estética y Moda (ISEM)'
    }
  ];

  // Emil rule: keyboard escape should close modals immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedDiploma) {
        setSelectedDiploma(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDiploma]);

  return (
    <section className="py-24 bg-surface-container-low border-y border-moss-green/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-moss-green font-bold block mb-3">Garantía de Excelencia</span>
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-4"
          >
            Formación &amp; Certificaciones
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rosy-brown to-transparent mx-auto mb-6"
          ></motion.div>
          <p className="text-midnight-green max-w-2xl mx-auto text-lg font-light">
            Para brindarte el mejor servicio, me mantengo en constante capacitación, avalando mis técnicas con las mejores academias e institutos del rubro. Tu rostro está en manos de una profesional certificada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {diplomas.map((diploma, index) => (
            <motion.div
              key={diploma.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setSelectedDiploma(diploma)}
              className="bg-surface-container-lowest p-4 rounded-[2rem] border border-beige shadow-xl hover:shadow-2xl cursor-pointer group relative card-press"
            >
              <div className="overflow-hidden rounded-2xl h-full border border-moss-green/10 bg-surface flex items-center justify-center p-2 relative">
                <img 
                  src={diploma.src} 
                  alt={diploma.alt} 
                  className="w-full h-auto object-contain transition-transform duration-500 ease-out sm:group-hover:scale-[1.02] rounded-lg shadow-sm"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                
                {/* Overlay prompt on hover */}
                <div className="absolute inset-0 bg-dark-green/40 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 rounded-2xl flex items-center justify-center backdrop-blur-xs pointer-events-none">
                  <span className="bg-surface/90 text-dark-green px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg">
                    <ZoomIn size={16} /> Ver certificado completo
                  </span>
                </div>
              </div>
              <div className="mt-4 px-2 text-center">
                <h3 className="font-serif font-bold text-dark-green text-lg">{diploma.title}</h3>
                <p className="text-xs uppercase tracking-wider text-moss-green font-medium mt-1">{diploma.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Diplomas */}
      <AnimatePresence>
        {selectedDiploma && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[100] bg-dark-green/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedDiploma(null)}
          >
            <button 
              className="absolute top-6 right-6 text-surface-dim hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer btn-press"
              onClick={() => setSelectedDiploma(null)}
              aria-label="Cerrar vista previa (Esc)"
            >
              <X size={26} />
            </button>
            
            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                src={selectedDiploma.src}
                alt={selectedDiploma.alt}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/20 bg-white"
              />
              <div className="mt-4 text-center">
                <h4 className="text-white font-serif text-xl font-bold">{selectedDiploma.title}</h4>
                <p className="text-surface-dim text-sm mt-1">{selectedDiploma.institution}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Diplomas;
