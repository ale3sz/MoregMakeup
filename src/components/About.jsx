import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sparkles, X, ZoomIn, Play } from 'lucide-react';

const About = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const mediaItems = [
    { type: 'image', src: `${import.meta.env.BASE_URL}assets/working_1.jpeg`, alt: 'Morena maquillando - Detalle de ojos' },
    { type: 'image', src: `${import.meta.env.BASE_URL}assets/working_5_0.jpg`, alt: 'Morena en sesión de maquillaje' },
    { type: 'video', src: `${import.meta.env.BASE_URL}assets/working_video.mp4`, alt: 'Morena en plena acción - Backstage' },
    { type: 'image', src: `${import.meta.env.BASE_URL}assets/working_3.jpeg`, alt: 'Morena en backstage' }
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
            {/* Grid of working photos & video */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                {/* Photo 1 */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white"
                  onClick={() => setSelectedMedia(mediaItems[0])}
                >
                  <img src={mediaItems[0].src} alt={mediaItems[0].alt} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
                {/* Photo 2 */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white"
                  onClick={() => setSelectedMedia(mediaItems[1])}
                >
                  <img src={mediaItems[1].src} alt={mediaItems[1].alt} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Video Reel */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-xl border-4 border-white bg-dark-green h-64"
                  onClick={() => setSelectedMedia(mediaItems[2])}
                >
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                    <source src={mediaItems[2].src} type="video/mp4" />
                  </video>
                  
                  {/* Badge 'En acción' */}
                  <div className="absolute top-3 left-3 bg-dark-green/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20 shadow-sm pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-rosy-brown animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest text-beige font-bold">En acción</span>
                  </div>

                  {/* Play icon overlay on hover */}
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg">
                      <Play className="text-white fill-white ml-0.5" size={22} />
                    </div>
                  </div>
                </div>

                {/* Photo 4 */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white"
                  onClick={() => setSelectedMedia(mediaItems[3])}
                >
                  <img src={mediaItems[3].src} alt={mediaItems[3].alt} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest/95 backdrop-blur-md p-6 rounded-2xl shadow-[0_20px_50px_rgba(10,51,35,0.15)] z-20 border border-rosy-brown/30 max-w-[220px] hidden sm:block">
              <span className="text-xs uppercase tracking-widest text-moss-green font-bold block mb-1">Trayectoria</span>
              <p className="text-rosy-brown font-serif italic text-2xl font-bold mb-1">Experiencia</p>
              <p className="text-dark-green font-bold text-xs leading-relaxed">Telefe, La Capital + &amp; Producciones</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-moss-green font-bold block mb-3">Sobre Mí</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-6 leading-tight">Conocé un poco <br className="hidden sm:block" />sobre mi trabajo</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-rosy-brown to-transparent mb-8"></div>
            
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

      {/* Lightbox Modal for Media (Images & Video) */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-green/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
              className="absolute top-6 right-6 text-surface-dim hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => setSelectedMedia(null)}
              aria-label="Cerrar vista previa"
            >
              <X size={26} />
            </button>
            
            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              {selectedMedia.type === 'video' ? (
                <video 
                  controls 
                  autoPlay 
                  playsInline 
                  className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl border border-white/20 bg-black"
                >
                  <source src={selectedMedia.src} type="video/mp4" />
                </video>
              ) : (
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  src={selectedMedia.src}
                  alt={selectedMedia.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
                />
              )}
              <p className="text-surface-dim text-sm mt-3 font-medium">{selectedMedia.alt}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
