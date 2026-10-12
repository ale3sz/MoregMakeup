import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sparkles, X, ZoomIn, Play } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from './admin/EditableText';

const About = () => {
  const { content } = useContent();
  const about = content?.about || {};
  const [selectedMedia, setSelectedMedia] = useState(null);

  const mediaItems = [
    { type: 'image', src: `${import.meta.env.BASE_URL}assets/working_1.jpeg`, alt: 'Morena maquillando - Detalle de ojos' },
    { type: 'image', src: `${import.meta.env.BASE_URL}assets/working_5_0.jpg`, alt: 'Morena en sesión de maquillaje' },
    { type: 'video', src: `${import.meta.env.BASE_URL}assets/working_video.mp4`, alt: 'Morena en plena acción - Backstage' },
    { type: 'image', src: `${import.meta.env.BASE_URL}assets/working_3.jpeg`, alt: 'Morena en backstage' }
  ];

  // Emil rule: keyboard escape should close modals immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedMedia) {
        setSelectedMedia(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia]);

  return (
    <section id="about" className="py-24 bg-surface overflow-hidden relative">
      {/* Subtle luxury brand watermark in background */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 opacity-[0.03] pointer-events-none select-none">
        <img 
          src={`${import.meta.env.BASE_URL}brand/isotipo_completo_dark.svg`} 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Grid of working photos & video */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                {/* Photo 1 */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white card-press"
                  onClick={() => setSelectedMedia(mediaItems[0])}
                >
                  <img src={mediaItems[0].src} alt={mediaItems[0].alt} className="w-full h-48 object-cover transition-transform duration-500 ease-out sm:group-hover:scale-105" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
                {/* Photo 2 */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white card-press"
                  onClick={() => setSelectedMedia(mediaItems[1])}
                >
                  <img src={mediaItems[1].src} alt={mediaItems[1].alt} className="w-full h-64 object-cover transition-transform duration-500 ease-out sm:group-hover:scale-105" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Video Reel */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-xl border-4 border-white bg-dark-green h-64 card-press"
                  onClick={() => setSelectedMedia(mediaItems[2])}
                >
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out sm:group-hover:scale-105"
                  >
                    <source src={mediaItems[2].src} type="video/mp4" />
                  </video>
                  
                  {/* Badge 'En acción' */}
                  <div className="absolute top-3 left-3 bg-dark-green/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20 shadow-sm pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-rosy-brown animate-pulse"></span>
                    <span className="text-[10px] uppercase tracking-widest text-beige font-bold">En acción</span>
                  </div>

                  {/* Play icon overlay on hover */}
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full shadow-lg">
                      <Play className="text-white fill-white ml-0.5" size={22} />
                    </div>
                  </div>
                </div>

                {/* Photo 4 */}
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-[2rem] shadow-lg border-4 border-white card-press"
                  onClick={() => setSelectedMedia(mediaItems[3])}
                >
                  <img src={mediaItems[3].src} alt={mediaItems[3].alt} className="w-full h-48 object-cover transition-transform duration-500 ease-out sm:group-hover:scale-105" />
                  <div className="absolute inset-0 bg-dark-green/30 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <ZoomIn className="text-white drop-shadow-md" size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Experience Badge with Circular Seal */}
            <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_20px_50px_rgba(10,51,35,0.15)] z-20 border border-rosy-brown/30 max-w-[240px] hidden sm:flex items-center gap-4">
              <img 
                src={`${import.meta.env.BASE_URL}brand/sello_badge_circular_vector.svg`} 
                alt="Sello Oficial Morena Garnica" 
                className="w-12 h-12 flex-shrink-0 animate-[spin_30s_linear_infinite]"
              />
              <div>
                <span className="text-[10px] uppercase tracking-widest text-moss-green font-bold block mb-0.5">
                  <EditableText section="about" field="badgeExperienceTitle" value={about.badgeExperienceTitle || 'Trayectoria'} />
                </span>
                <p className="text-rosy-brown font-serif italic text-lg font-bold leading-none mb-1">
                  <EditableText section="about" field="badgeExperienceDesc" value={about.badgeExperienceDesc || 'Experiencia'} />
                </p>
                <p className="text-dark-green font-bold text-[11px] leading-tight">Telefe, La Capital + &amp; Producciones</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-full lg:w-1/2"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-moss-green font-bold block mb-3">
              <EditableText section="about" field="badge" value={about.badge} />
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-6 leading-tight">
              <EditableText section="about" field="title" value={about.title} />
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-rosy-brown to-transparent mb-8"></div>
            
            <p className="text-lg text-midnight-green mb-6 leading-relaxed">
              <EditableText section="about" field="p1" value={about.p1} multiline={true} />
            </p>
            
            <p className="text-lg text-midnight-green mb-10 leading-relaxed font-light">
              <EditableText section="about" field="p2" value={about.p2} multiline={true} />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-beige shadow-sm hover:shadow-md transition-shadow">
                <Leaf className="text-moss-green mb-4" size={32} />
                <h3 className="font-serif font-bold text-dark-green text-xl mb-2">
                  <EditableText section="about" field="feature1Title" value={about.feature1Title} />
                </h3>
                <p className="text-midnight-green text-sm">
                  <EditableText section="about" field="feature1Desc" value={about.feature1Desc} multiline={true} />
                </p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-beige shadow-sm hover:shadow-md transition-shadow">
                <Sparkles className="text-rosy-brown mb-4" size={32} />
                <h3 className="font-serif font-bold text-dark-green text-xl mb-2">
                  <EditableText section="about" field="feature2Title" value={about.feature2Title} />
                </h3>
                <p className="text-midnight-green text-sm">
                  <EditableText section="about" field="feature2Desc" value={about.feature2Desc} multiline={true} />
                </p>
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
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[100] bg-dark-green/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
              className="absolute top-6 right-6 text-surface-dim hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer btn-press"
              onClick={() => setSelectedMedia(null)}
              aria-label="Cerrar vista previa (Esc)"
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
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
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
