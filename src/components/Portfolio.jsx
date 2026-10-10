import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const [filter, setFilter] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['Todos', 'Social', 'Novias', 'Eventos'];
  
  const images = [
    { id: 1, src: `${import.meta.env.BASE_URL}assets/quinceaniera.jpeg`, category: 'Eventos', alt: 'Maquillaje Quinceañera' },
    { id: 2, src: `${import.meta.env.BASE_URL}assets/model_9_0.jpg`, category: 'Novias', alt: 'Trabajo Novias 1' },
    { id: 3, src: `${import.meta.env.BASE_URL}assets/model_9_1.jpg`, category: 'Eventos', alt: 'Trabajo Eventos 1' },
    { id: 4, src: `${import.meta.env.BASE_URL}assets/model_10_0.jpg`, category: 'Social', alt: 'Trabajo Social 1' },
    { id: 5, src: `${import.meta.env.BASE_URL}assets/model_10_1.jpg`, category: 'Social', alt: 'Trabajo Social 2' },
    { id: 6, src: `${import.meta.env.BASE_URL}assets/model_11_0.jpg`, category: 'Novias', alt: 'Trabajo Novias 2' },
    { id: 7, src: `${import.meta.env.BASE_URL}assets/model_11_1.jpg`, category: 'Eventos', alt: 'Trabajo Eventos 2' },
    { id: 8, src: `${import.meta.env.BASE_URL}assets/model_11_2.jpg`, category: 'Social', alt: 'Trabajo Social 3' },
    { id: 9, src: `${import.meta.env.BASE_URL}assets/model_11_3.jpg`, category: 'Novias', alt: 'Trabajo Novias 3' },
    { id: 10, src: `${import.meta.env.BASE_URL}assets/model_11_4.jpg`, category: 'Social', alt: 'Trabajo Social 4' },
    { id: 11, src: `${import.meta.env.BASE_URL}assets/model_11_5.jpg`, category: 'Eventos', alt: 'Trabajo Eventos 3' },
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
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green/80 via-dark-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-surface font-semibold tracking-widest uppercase text-sm border-b border-rosy-brown pb-1">{img.category}</span>
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
            className="fixed inset-0 z-[100] bg-dark-green/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-surface-dim hover:text-white transition-colors p-2 bg-white/10 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-surface font-semibold tracking-widest uppercase text-sm bg-black/50 px-6 py-2 rounded-full backdrop-blur-md">
              {selectedImage.category}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
