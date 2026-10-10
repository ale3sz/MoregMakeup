import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sparkles, X, ZoomIn } from 'lucide-react';

const About = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    { src: `${import.meta.env.BASE_URL}assets/working_1.jpeg`, alt: 'Morena maquillando - Detalle de ojos' },
    { src: `${import.meta.env.BASE_URL}assets/working_5_0.jpg`, alt: 'Morena en sesión de maquillaje' },
    { src: `${import.meta.env.BASE_URL}assets/working_2.jpeg`, alt: 'Morena preparando piel' },
    { src: `${import.meta.env.BASE_URL}assets/working_3.jpeg`, alt: 'Morena en backstage' }
  ];

  return (
    <section id="about" className="py-24 bg-surface overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Grid of working photos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white"
                  onClick={() => setSelectedPhoto(photos[0])}
                >
                  <img src={photos[0].src} alt={photos[0].alt} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white"
                  onClick={() => setSelectedPhoto(photos[1])}
                >
                  <img src={photos[1].src} alt={photos[1].alt} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white"
                  onClick={() => setSelectedPhoto(photos[2])}
                >
                  <img src={photos[2].src} alt={photos[2].alt} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white"
                  onClick={() => setSelectedPhoto(photos[3])}
                >
                  <img src={photos[3].src} alt={photos[3].alt} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-[0_20px_40px_rgba(10,51,35,0.1)] z-20 border border-beige max-w-[200px] hidden sm:block">
              <p className="text-rosy-brown font-serif italic text-xl mb-1">Experiencia</p>
              <p className="text-dark-green font-bold text-sm leading-tight">Telefe, La Capital + &amp; Producciones</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-sm uppercase tracking-widest text-moss-green font-bold block mb-4">Sobre Mí</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-6 leading-tight">Conocé un poco <br/>sobre mi trabajo</h2>
            <div className="w-20 h-1 bg-rosy-brown mb-10"></div>
            
            <p className="text-lg text-midnight-green mb-6 leading-relaxed">
              Soy Morena Garnica, maquilladora profesional y experta en belleza radicada en Rosario, especializada en el maquillaje social, producciones fotográficas y diferentes eventos. 
            </p>
            
            <p className="text-lg text-midnight-green mb-10 leading-relaxed font-light">
              Me caracterizo por un trabajo prolijo, el cuidado extremo de la piel y mi capacidad de adaptación a la estética de cada producción. A lo largo de mi carrera, he tenido la oportunidad de trabajar en televisión para canales como <strong>La Capital +</strong> y <strong>Telefe</strong>, y colaborado con agencias como <em>"Hi Management"</em> e <em>"Instituto IESERH"</em>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-beige shadow-sm hover:shadow-md transition-shadow">
                <Leaf className="text-moss-green mb-4" size={32} />
                <h3 className="font-serif font-bold text-dark-green text-xl mb-2">Cuidado de la Piel</h3>
                <p className="text-midnight-green text-sm">Preparación dermatológica y protocolo clínico antes de cada maquillaje.</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-beige shadow-sm hover:shadow-md transition-shadow">
                <Sparkles className="text-rosy-brown mb-4" size={32} />
                <h3 className="font-serif font-bold text-dark-green text-xl mb-2">Acabado Prolijo</h3>
                <p className="text-midnight-green text-sm">Texturas sedosas, luminosidad orgánica y fijación de larga duración.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox for About photos */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-green/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              className="absolute top-6 right-6 text-surface-dim hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Cerrar vista previa"
            >
              <X size={26} />
            </button>
            
            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <p className="text-surface-dim text-sm mt-3">{selectedPhoto.alt}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
