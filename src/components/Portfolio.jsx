import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const [filter, setFilter] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['Todos', 'Social', 'Novias', 'Eventos'];
  
  const images = [
    { id: 1, src: `${import.meta.env.BASE_URL}assets/foto_1_tiara_ojos_abiertos.png`, category: 'Novias', alt: 'Maquillaje de Novia con Tiara' },
    { id: 2, src: `${import.meta.env.BASE_URL}assets/foto_2_tiara_ojos_cerrados.png`, category: 'Novias', alt: 'Detalle Sombras Ojos Cerrados' },
    { id: 3, src: `${import.meta.env.BASE_URL}assets/foto_3_xv_ojos_abiertos.png`, category: 'Eventos', alt: 'Maquillaje Quinceañera Iluminado' },
    { id: 4, src: `${import.meta.env.BASE_URL}assets/foto_4_xv_ojos_cerrados.png`, category: 'Eventos', alt: 'Detalle Maquillaje de Fiesta' },
    { id: 5, src: `${import.meta.env.BASE_URL}assets/quinceaniera.jpeg`, category: 'Eventos', alt: 'Producción Quinceañera' },
    { id: 6, src: `${import.meta.env.BASE_URL}assets/model_10_0.jpg`, category: 'Social', alt: 'Look Social Glamour' },
    { id: 7, src: `${import.meta.env.BASE_URL}assets/model_10_1.jpg`, category: 'Social', alt: 'Look Social Natural Glow' },
    { id: 8, src: `${import.meta.env.BASE_URL}assets/model_11_0.jpg`, category: 'Novias', alt: 'Novia Editorial' },
    { id: 9, src: `${import.meta.env.BASE_URL}assets/model_11_1.jpg`, category: 'Social', alt: 'Make Up para Eventos' },
    { id: 10, src: `${import.meta.env.BASE_URL}assets/model_11_2.jpg`, category: 'Social', alt: 'Maquillaje de Noche' },
    { id: 11, src: `${import.meta.env.BASE_URL}assets/model_9_0.jpg`, category: 'Novias', alt: 'Producción Novia Clásica' },
    { id: 12, src: `${import.meta.env.BASE_URL}assets/model_9_1.jpg`, category: 'Eventos', alt: 'Make Up de Alta Cobertura' },
  ];

  const filteredImages = filter === 'Todos' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-moss-green font-semibold block mb-4">Galería de Trabajos</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-8">Portfolio</h2>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-midnight-green text-white shadow-md' 
                    : 'bg-surface-container text-dark-green hover:bg-surface-container-high border border-moss-green/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="masonry">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={img.id}
                className="masonry-item cursor-pointer group relative rounded-2xl overflow-hidden shadow-sm border border-moss-green/10 mb-6 break-inside-avoid"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                
                {/* Overlay hover with zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green/90 via-dark-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  <div className="self-end bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <ZoomIn size={18} className="text-white" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-rosy-brown font-bold block mb-1">{img.category}</span>
                    <p className="text-surface font-serif text-base font-medium">{img.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-green/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-surface-dim hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar imagen"
            >
              <X size={26} />
            </button>
            
            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
              <div className="mt-4 text-center">
                <span className="text-rosy-brown text-xs uppercase tracking-widest font-semibold">{selectedImage.category}</span>
                <p className="text-white font-serif text-lg font-medium mt-1">{selectedImage.alt}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
