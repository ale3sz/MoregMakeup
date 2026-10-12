import React, { useState, useEffect } from 'react';
import { X, ZoomIn, Plus, Trash2, Pencil, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { resolveAssetUrl } from '../utils/assets';

const Portfolio = () => {
  const { content, deleteItem, updateItem, processImageFile } = useContent();
  const { isEditMode, openAdminModal } = useAuth();
  const [filter, setFilter] = useState('Todos');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSwappingPhoto, setIsSwappingPhoto] = useState(false);

  const categories = ['Todos', 'Social', 'Novias', 'Eventos'];
  const images = content?.portfolio || [];

  const filteredImages = filter === 'Todos' 
    ? images 
    : images.filter(img => img.category === filter);

  // Emil rule: keyboard escape should close modals immediately
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const handleDeletePhoto = (e, imgId) => {
    e.stopPropagation();
    if (window.confirm('¿Deseas eliminar esta foto del portfolio?')) {
      deleteItem('portfolio', imgId);
      if (selectedImage?.id === imgId) {
        setSelectedImage(null);
      }
    }
  };

  const handleSwapPhotoFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !selectedImage) return;

    setIsSwappingPhoto(true);
    try {
      const dataUrl = await processImageFile(file);
      setSelectedImage(prev => ({ ...prev, src: dataUrl }));
      updateItem('portfolio', selectedImage.id, { src: dataUrl });
    } catch (err) {
      alert(err.message || 'Error al cambiar la foto');
    } finally {
      setIsSwappingPhoto(false);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-moss-green font-bold block mb-3">Galería de Trabajos</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-4">Portfolio</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rosy-brown to-transparent mx-auto mb-8"></div>
          
          {/* Filters & Add photo button if in edit mode */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wider cursor-pointer btn-press ${
                  filter === cat 
                    ? 'bg-midnight-green text-white shadow-md' 
                    : 'bg-surface-container text-dark-green hover:bg-surface-container-high border border-moss-green/20'
                }`}
              >
                {cat}
              </button>
            ))}

            {isEditMode && (
              <button
                type="button"
                onClick={openAdminModal}
                className="px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider bg-rosy-brown hover:bg-rosy-brown-dark text-dark-green hover:text-white shadow-md flex items-center gap-2 cursor-pointer btn-press"
              >
                <Plus size={16} />
                <span>Gestionar Fotos</span>
              </button>
            )}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="masonry">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                key={img.id}
                className="masonry-item cursor-pointer group relative rounded-2xl overflow-hidden shadow-sm border border-moss-green/10 mb-6 break-inside-avoid card-press"
                onClick={() => setSelectedImage(img)}
              >
                <img 
                  src={resolveAssetUrl(img.src)} 
                  alt={img.alt} 
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out sm:group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Delete button if in edit mode */}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={(e) => handleDeletePhoto(e, img.id)}
                    title="Eliminar foto"
                    className="absolute top-3 right-3 z-30 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer btn-press"
                  >
                    <Trash2 size={15} />
                  </button>
                )}

                {/* Overlay hover with zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green/90 via-dark-green/30 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-6 pointer-events-none">
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

        {/* Ver más en Instagram CTA */}
        <div className="mt-14 text-center">
          <a
            href={content?.contact?.instagramUrl || "https://www.instagram.com/morennagar/"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-moss-green/30 bg-surface-container-lowest hover:bg-rosy-brown hover:text-dark-green text-dark-green shadow-sm hover:shadow-md font-semibold text-xs uppercase tracking-wider group cursor-pointer btn-press"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rosy-brown group-hover:text-dark-green transition-colors"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span>Ver más trabajos en {content?.contact?.instagramHandle || '@morennagar'}</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[100] bg-dark-green/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-surface-dim hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer btn-press"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar imagen (Esc)"
            >
              <X size={26} />
            </button>
            
            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative group max-h-[70vh] flex items-center justify-center">
                <motion.img
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                  src={resolveAssetUrl(selectedImage.src)}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/20"
                />

                {/* Swap photo button if in edit mode */}
                {isEditMode && (
                  <label 
                    className="absolute bottom-4 right-4 bg-dark-green/90 hover:bg-moss-green text-surface px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl border border-rosy-brown/40 cursor-pointer btn-press"
                    title="Reemplazar esta foto por otra"
                  >
                    <Camera size={14} className="text-rosy-brown" />
                    <span>{isSwappingPhoto ? 'Cambiando...' : 'Cambiar Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSwapPhotoFile}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Caption: Read-only for visitors, Editable when isEditMode is true */}
              <div className="mt-4 text-center w-full max-w-lg">
                {isEditMode ? (
                  <div className="bg-surface-container-lowest/95 p-4 rounded-2xl border border-rosy-brown/50 shadow-2xl text-dark-green space-y-3">
                    <div className="flex items-center justify-between gap-3 border-b border-moss-green/15 pb-2">
                      <span className="text-[11px] uppercase tracking-widest text-moss-green font-bold flex items-center gap-1.5">
                        <Pencil size={13} className="text-rosy-brown" />
                        Editar Tipo & Subtítulo
                      </span>
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] uppercase tracking-wider font-semibold text-dark-green/70">Tipo:</label>
                        <select
                          value={selectedImage.category}
                          onChange={(e) => {
                            const newCategory = e.target.value;
                            setSelectedImage(prev => ({ ...prev, category: newCategory }));
                            updateItem('portfolio', selectedImage.id, { category: newCategory });
                          }}
                          className="bg-surface border border-moss-green/30 rounded-lg px-2.5 py-1 text-xs font-bold text-dark-green uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-rosy-brown cursor-pointer"
                        >
                          <option value="Novias">Novias</option>
                          <option value="Social">Social</option>
                          <option value="Eventos">Eventos</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-left text-[11px] uppercase tracking-widest font-semibold text-moss-green mb-1">
                        Subtítulo / Nombre del look:
                      </label>
                      <input
                        type="text"
                        value={selectedImage.alt}
                        onChange={(e) => {
                          const newAlt = e.target.value;
                          setSelectedImage(prev => ({ ...prev, alt: newAlt }));
                          updateItem('portfolio', selectedImage.id, { alt: newAlt });
                        }}
                        placeholder="Ej. Maquillaje de Novia con Tiara"
                        className="w-full bg-surface border border-moss-green/30 rounded-xl px-4 py-2 text-sm font-serif font-medium text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown"
                      />
                    </div>

                    <p className="text-[11px] text-midnight-green/70 text-right">
                      ✓ Se actualiza en vivo en el portfolio
                    </p>
                  </div>
                ) : (
                  <>
                    <span className="text-rosy-brown text-xs uppercase tracking-widest font-semibold">{selectedImage.category}</span>
                    <p className="text-white font-serif text-lg font-medium mt-1">{selectedImage.alt}</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
