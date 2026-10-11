import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sparkles, Image as ImageIcon, DollarSign, FileText, 
  HelpCircle, Phone, Cloud, Download, Upload, Trash2, 
  Plus, Check, RefreshCw, KeyRound, ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import { saveSupabaseCredentials, isSupabaseConfigured, clearSupabaseCredentials } from '../../services/supabase';

const AdminModal = () => {
  const { isAdminModalOpen, closeAdminModal, setCustomPassword } = useAuth();
  const { 
    content, 
    updateField, 
    updateSection, 
    updateItem, 
    addItem, 
    deleteItem, 
    saveChanges, 
    isSaving,
    resetToDefaults, 
    exportBackup, 
    importBackup, 
    processImageFile 
  } = useContent();

  const [activeTab, setActiveTab] = useState('portfolio'); // 'hero' | 'services' | 'portfolio' | 'faq' | 'contact' | 'cloud'
  const [newPhoto, setNewPhoto] = useState({ category: 'Social', alt: '', src: '' });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState('');

  // Supabase credentials input
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem('moreg_supabase_url') || '');
  const [supabaseKey, setSupabaseKey] = useState(() => localStorage.getItem('moreg_supabase_key') || '');
  const [supabaseStatus, setSupabaseStatus] = useState('');

  // Password change
  const [newEditorPassword, setNewEditorPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  if (!isAdminModalOpen) return null;

  // Handle uploading photo file
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setPhotoUploadError('');
    try {
      const dataUrl = await processImageFile(file);
      setNewPhoto(prev => ({
        ...prev,
        src: dataUrl,
        alt: prev.alt || file.name.replace(/\.[^/.]+$/, '')
      }));
    } catch (err) {
      setPhotoUploadError(err.message || 'Error al procesar la imagen');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleAddPhotoSubmit = (e) => {
    e.preventDefault();
    if (!newPhoto.src) {
      setPhotoUploadError('Por favor seleccioná una imagen o ingresá una URL');
      return;
    }

    addItem('portfolio', {
      src: newPhoto.src,
      category: newPhoto.category || 'Social',
      alt: newPhoto.alt || 'Foto de Portfolio'
    });

    setNewPhoto({ category: 'Social', alt: '', src: '' });
    setPhotoUploadError('');
  };

  // Handle Supabase credentials save
  const handleSaveSupabase = (e) => {
    e.preventDefault();
    if (supabaseUrl && supabaseKey) {
      saveSupabaseCredentials(supabaseUrl, supabaseKey);
      setSupabaseStatus('Credenciales guardadas. Recargá la página para conectar con Supabase.');
    } else {
      clearSupabaseCredentials();
      setSupabaseStatus('Credenciales eliminadas. Se usará almacenamiento local.');
    }
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newEditorPassword && newEditorPassword.length >= 4) {
      setCustomPassword(newEditorPassword);
      setPasswordChangeSuccess(true);
      setNewEditorPassword('');
      setTimeout(() => setPasswordChangeSuccess(false), 3000);
    }
  };

  // Handle backup import file
  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importBackup(event.target.result);
      if (!result.success) {
        alert(result.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[130] bg-dark-green/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        onClick={closeAdminModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-surface-container-lowest max-w-5xl w-full h-[90vh] rounded-[2rem] shadow-2xl border border-beige/60 flex flex-col overflow-hidden text-dark-green"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-moss-green/15 flex items-center justify-between bg-surface-container-low">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-dark-green text-surface rounded-xl">
                <Sparkles size={20} className="text-rosy-brown" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-dark-green">
                  Panel de Administración
                </h3>
                <p className="text-xs text-midnight-green/70">
                  Control total de fotos, textos, precios y configuración de la web
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={saveChanges}
                disabled={isSaving}
                className="bg-dark-green hover:bg-moss-green text-surface px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Check size={14} />
                <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
              </button>
              <button
                onClick={closeAdminModal}
                className="p-2 text-midnight-green/60 hover:text-dark-green hover:bg-surface-container rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body with Sidebar Tabs */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-surface border-r border-moss-green/15 p-3 sm:p-4 flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`flex-1 md:flex-none text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'portfolio'
                    ? 'bg-dark-green text-surface shadow-md'
                    : 'text-dark-green/80 hover:bg-surface-container hover:text-dark-green'
                }`}
              >
                <ImageIcon size={18} className="text-rosy-brown" />
                <span>Fotos & Portfolio</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`flex-1 md:flex-none text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'services'
                    ? 'bg-dark-green text-surface shadow-md'
                    : 'text-dark-green/80 hover:bg-surface-container hover:text-dark-green'
                }`}
              >
                <DollarSign size={18} className="text-rosy-brown" />
                <span>Servicios & Precios</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`flex-1 md:flex-none text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'hero'
                    ? 'bg-dark-green text-surface shadow-md'
                    : 'text-dark-green/80 hover:bg-surface-container hover:text-dark-green'
                }`}
              >
                <FileText size={18} className="text-rosy-brown" />
                <span>Textos & Portada</span>
              </button>

              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 md:flex-none text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'faq'
                    ? 'bg-dark-green text-surface shadow-md'
                    : 'text-dark-green/80 hover:bg-surface-container hover:text-dark-green'
                }`}
              >
                <HelpCircle size={18} className="text-rosy-brown" />
                <span>Preguntas Frecuentes</span>
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 md:flex-none text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'contact'
                    ? 'bg-dark-green text-surface shadow-md'
                    : 'text-dark-green/80 hover:bg-surface-container hover:text-dark-green'
                }`}
              >
                <Phone size={18} className="text-rosy-brown" />
                <span>Contacto & Redes</span>
              </button>

              <button
                onClick={() => setActiveTab('cloud')}
                className={`flex-1 md:flex-none text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'cloud'
                    ? 'bg-dark-green text-surface shadow-md'
                    : 'text-dark-green/80 hover:bg-surface-container hover:text-dark-green'
                }`}
              >
                <Cloud size={18} className="text-rosy-brown" />
                <span>Nube & Respaldos</span>
              </button>
            </div>

            {/* Tab Content Panels */}
            <div className="flex-1 p-6 overflow-y-auto bg-surface-container-lowest">
              
              {/* TAB: PORTFOLIO */}
              {activeTab === 'portfolio' && (
                <div className="space-y-8">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-dark-green">Galería de Trabajos & Fotos</h4>
                    <p className="text-sm text-midnight-green/70">Subí fotos nuevas desde tu dispositivo o pegá enlaces.</p>
                  </div>

                  {/* Add new photo box */}
                  <div className="bg-surface p-6 rounded-2xl border border-moss-green/20 space-y-4">
                    <h5 className="text-sm font-bold uppercase tracking-wider text-dark-green flex items-center gap-2">
                      <Plus size={16} className="text-rosy-brown" />
                      Agregar Nueva Foto al Portfolio
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Subir archivo (Celu o PC)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="w-full text-xs text-midnight-green file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-dark-green file:text-surface hover:file:bg-moss-green cursor-pointer"
                        />
                        {isUploadingPhoto && <p className="text-xs text-rosy-brown mt-1">Optimizando imagen...</p>}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          O Pegar URL de Imagen
                        </label>
                        <input
                          type="text"
                          value={newPhoto.src}
                          onChange={(e) => setNewPhoto({ ...newPhoto, src: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2.5 text-xs text-dark-green focus:outline-none focus:ring-1 focus:ring-rosy-brown"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Categoría
                        </label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2.5 text-xs text-dark-green focus:outline-none focus:ring-1 focus:ring-rosy-brown"
                        >
                          <option value="Social">Social</option>
                          <option value="Novias">Novias</option>
                          <option value="Eventos">Eventos</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Título / Descripción
                        </label>
                        <input
                          type="text"
                          value={newPhoto.alt}
                          onChange={(e) => setNewPhoto({ ...newPhoto, alt: e.target.value })}
                          placeholder="Ej. Maquillaje social de noche piel luminosa"
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2.5 text-xs text-dark-green focus:outline-none focus:ring-1 focus:ring-rosy-brown"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={handleAddPhotoSubmit}
                          className="w-full bg-dark-green hover:bg-moss-green text-surface py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow"
                        >
                          <Plus size={14} />
                          <span>Agregar Foto</span>
                        </button>
                      </div>
                    </div>

                    {photoUploadError && (
                      <p className="text-xs text-red-600 font-medium">{photoUploadError}</p>
                    )}

                    {newPhoto.src && (
                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-xs text-midnight-green/70">Vista previa:</span>
                        <img src={newPhoto.src} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-moss-green/20" />
                      </div>
                    )}
                  </div>

                    {/* Photos grid list */}
                  <div className="space-y-4">
                    <h5 className="text-xs uppercase tracking-widest font-bold text-moss-green">
                      Fotos actuales ({content.portfolio?.length || 0})
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {content.portfolio?.map((img) => (
                        <div key={img.id} className="group relative bg-surface rounded-2xl overflow-hidden border border-moss-green/20 shadow-sm flex flex-col justify-between p-3 gap-3">
                          <div className="relative rounded-xl overflow-hidden h-40">
                            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => deleteItem('portfolio', img.id)}
                              title="Eliminar foto"
                              className="absolute top-2 right-2 bg-red-600/90 text-white p-2 rounded-full hover:bg-red-700 cursor-pointer shadow-md transition-transform hover:scale-110"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          
                          <div className="space-y-2 text-xs">
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider font-semibold text-moss-green mb-0.5">Tipo / Categoría:</label>
                              <select
                                value={img.category}
                                onChange={(e) => updateItem('portfolio', img.id, { category: e.target.value })}
                                className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-lg px-2.5 py-1.5 text-xs font-bold text-dark-green uppercase cursor-pointer focus:outline-none focus:ring-1 focus:ring-rosy-brown"
                              >
                                <option value="Novias">Novias</option>
                                <option value="Social">Social</option>
                                <option value="Eventos">Eventos</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase tracking-wider font-semibold text-moss-green mb-0.5">Subtítulo / Look:</label>
                              <input
                                type="text"
                                value={img.alt}
                                onChange={(e) => updateItem('portfolio', img.id, { alt: e.target.value })}
                                placeholder="Nombre o descripción del look"
                                className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-lg px-2.5 py-1.5 text-xs text-dark-green font-medium focus:outline-none focus:ring-1 focus:ring-rosy-brown"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SERVICES & PRICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-dark-green">Servicios & Precios</h4>
                    <p className="text-sm text-midnight-green/70">Modificá los precios, duración y descripción de cada propuesta.</p>
                  </div>

                  <div className="space-y-6">
                    {content.services?.map((serv, index) => (
                      <div key={serv.id || index} className="p-6 bg-surface rounded-2xl border border-moss-green/20 space-y-4">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif text-lg font-bold text-dark-green">{serv.title}</h5>
                          <span className="text-xs uppercase tracking-widest text-rosy-brown font-semibold">{serv.shortTitle}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                              Título Completo
                            </label>
                            <input
                              type="text"
                              value={serv.title}
                              onChange={(e) => updateItem('services', serv.id, { title: e.target.value })}
                              className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                              Precio Mostrado
                            </label>
                            <input
                              type="text"
                              value={serv.price}
                              onChange={(e) => updateItem('services', serv.id, { price: e.target.value })}
                              placeholder="Ej: $35.000 o Consultar"
                              className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                              Duración estimada
                            </label>
                            <input
                              type="text"
                              value={serv.time}
                              onChange={(e) => updateItem('services', serv.id, { time: e.target.value })}
                              placeholder="Ej: 60-75 min"
                              className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                            Descripción del Servicio
                          </label>
                          <textarea
                            value={serv.description}
                            onChange={(e) => updateItem('services', serv.id, { description: e.target.value })}
                            rows={2}
                            className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl p-3 text-xs text-dark-green resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: HERO & TEXTS */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-dark-green">Textos de Portada & Sobre Mí</h4>
                    <p className="text-sm text-midnight-green/70">Ajustá los títulos, lemas y presentación personal.</p>
                  </div>

                  {/* Hero texts */}
                  <div className="bg-surface p-6 rounded-2xl border border-moss-green/20 space-y-4">
                    <h5 className="font-serif text-base font-bold text-dark-green">Sección Portada (Hero)</h5>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Título Principal
                        </label>
                        <input
                          type="text"
                          value={content.hero?.title}
                          onChange={(e) => updateField('hero', 'title', e.target.value)}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Insignia Superior
                        </label>
                        <input
                          type="text"
                          value={content.hero?.badge}
                          onChange={(e) => updateField('hero', 'badge', e.target.value)}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Lema / Tagline
                        </label>
                        <input
                          type="text"
                          value={content.hero?.tagline}
                          onChange={(e) => updateField('hero', 'tagline', e.target.value)}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Frase Destacada
                        </label>
                        <input
                          type="text"
                          value={content.hero?.highlight}
                          onChange={(e) => updateField('hero', 'highlight', e.target.value)}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green italic"
                        />
                      </div>
                    </div>
                  </div>

                  {/* About texts */}
                  <div className="bg-surface p-6 rounded-2xl border border-moss-green/20 space-y-4">
                    <h5 className="font-serif text-base font-bold text-dark-green">Sección "Sobre Mí"</h5>

                    <div>
                      <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={content.about?.title}
                        onChange={(e) => updateField('about', 'title', e.target.value)}
                        className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                        Párrafo 1 (Presentación)
                      </label>
                      <textarea
                        value={content.about?.p1}
                        onChange={(e) => updateField('about', 'p1', e.target.value)}
                        rows={3}
                        className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl p-3 text-xs text-dark-green resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                        Párrafo 2 (Trayectoria & Canales)
                      </label>
                      <textarea
                        value={content.about?.p2}
                        onChange={(e) => updateField('about', 'p2', e.target.value)}
                        rows={3}
                        className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl p-3 text-xs text-dark-green resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: FAQ */}
              {activeTab === 'faq' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-xl font-bold text-dark-green">Preguntas Frecuentes</h4>
                      <p className="text-sm text-midnight-green/70">Añadí o actualizá las respuestas para tus clientas.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addItem('faqs', { question: 'Nueva pregunta...', answer: 'Escribí la respuesta aquí...' })}
                      className="bg-dark-green hover:bg-moss-green text-surface px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={14} /> Nueva Pregunta
                    </button>
                  </div>

                  <div className="space-y-4">
                    {content.faqs?.map((faq, idx) => (
                      <div key={idx} className="p-5 bg-surface rounded-2xl border border-moss-green/20 space-y-3 relative group">
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const updated = [...content.faqs];
                              updated[idx].question = e.target.value;
                              updateSection('faqs', updated);
                            }}
                            className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-lg px-3 py-2 text-xs font-bold text-dark-green mr-8"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = content.faqs.filter((_, i) => i !== idx);
                              updateSection('faqs', updated);
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5"
                            title="Eliminar pregunta"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...content.faqs];
                            updated[idx].answer = e.target.value;
                            updateSection('faqs', updated);
                          }}
                          rows={3}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-lg p-3 text-xs text-dark-green resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: CONTACT */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-dark-green">Contacto & Redes Sociales</h4>
                    <p className="text-sm text-midnight-green/70">Datos de WhatsApp, Instagram y ubicación mostrados en el sitio.</p>
                  </div>

                  <div className="bg-surface p-6 rounded-2xl border border-moss-green/20 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          WhatsApp (Número internacional para enlaces)
                        </label>
                        <input
                          type="text"
                          value={content.contact?.whatsappNumber}
                          onChange={(e) => updateField('contact', 'whatsappNumber', e.target.value)}
                          placeholder="5493413780411"
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Teléfono visible
                        </label>
                        <input
                          type="text"
                          value={content.contact?.phone}
                          onChange={(e) => updateField('contact', 'phone', e.target.value)}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Usuario de Instagram
                        </label>
                        <input
                          type="text"
                          value={content.contact?.instagramHandle}
                          onChange={(e) => updateField('contact', 'instagramHandle', e.target.value)}
                          placeholder="@morennagar"
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Enlace directo a Instagram
                        </label>
                        <input
                          type="text"
                          value={content.contact?.instagramUrl}
                          onChange={(e) => updateField('contact', 'instagramUrl', e.target.value)}
                          placeholder="https://www.instagram.com/morennagar/"
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Correo Electrónico
                        </label>
                        <input
                          type="email"
                          value={content.contact?.email}
                          onChange={(e) => updateField('contact', 'email', e.target.value)}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                          Ubicación
                        </label>
                        <input
                          type="text"
                          value={content.contact?.location}
                          onChange={(e) => updateField('contact', 'location', e.target.value)}
                          className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CLOUD & BACKUPS */}
              {activeTab === 'cloud' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-dark-green">Nube, Seguridad & Respaldos</h4>
                    <p className="text-sm text-midnight-green/70">
                      Conexión a Supabase (base de datos en la nube gratuita), copias de seguridad y contraseña.
                    </p>
                  </div>

                  {/* Supabase Box */}
                  <div className="bg-surface p-6 rounded-2xl border border-moss-green/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cloud size={20} className="text-emerald-600" />
                        <h5 className="font-serif text-base font-bold text-dark-green">Conexión con Supabase (Nube Gratuita)</h5>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        isSupabaseConfigured()
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {isSupabaseConfigured() ? '✓ Conectado a la Nube' : '● Modo Local (Sin nube todavía)'}
                      </span>
                    </div>

                    <p className="text-xs text-midnight-green/80 leading-relaxed">
                      Con Supabase, cualquier cambio que Morena haga se guarda en la nube y lo ven instantáneamente todas las personas que entren desde cualquier dispositivo.
                    </p>

                    <form onSubmit={handleSaveSupabase} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                            Supabase Project URL
                          </label>
                          <input
                            type="text"
                            value={supabaseUrl}
                            onChange={(e) => setSupabaseUrl(e.target.value)}
                            placeholder="https://xyzcompany.supabase.co"
                            className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-3 py-2 text-xs text-dark-green"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-1">
                            Supabase Anon Public API Key
                          </label>
                          <input
                            type="password"
                            value={supabaseKey}
                            onChange={(e) => setSupabaseKey(e.target.value)}
                            placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                            className="w-full bg-surface-container-lowest border border-moss-green/20 rounded-xl px-3 py-2 text-xs text-dark-green"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <button
                          type="submit"
                          className="bg-dark-green hover:bg-moss-green text-surface px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                        >
                          Guardar Credenciales de Supabase
                        </button>
                        {supabaseStatus && <span className="text-xs text-emerald-600 font-medium">{supabaseStatus}</span>}
                      </div>
                    </form>

                    {/* SQL quick hint */}
                    <details className="mt-2 text-xs text-midnight-green/80 bg-surface-container-lowest p-3 rounded-xl border border-moss-green/10">
                      <summary className="font-bold text-dark-green cursor-pointer">
                        ¿Cómo crear la tabla en Supabase gratis en 1 minuto? (Instrucciones)
                      </summary>
                      <div className="mt-2 space-y-2 text-xs">
                        <p>1. Entrá a <strong>supabase.com</strong>, creá un proyecto gratuito.</p>
                        <p>2. Andá a <strong>SQL Editor</strong> en el panel izquierdo y pegá este código:</p>
                        <pre className="bg-dark-green text-surface p-3 rounded-lg overflow-x-auto text-[11px] font-mono">
{`create table if not exists public.site_content (
  id text primary key,
  content_data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.site_content enable row level security;

create policy "Acceso publico de lectura" on public.site_content
  for select using (true);

create policy "Acceso publico de escritura" on public.site_content
  for all using (true);`}
                        </pre>
                        <p>3. Hacé clic en <strong>Run</strong>. Luego copiá la URL y Anon Key desde <em>Project Settings &gt; API</em> y pegalas acá arriba. ¡Listo!</p>
                      </div>
                    </details>
                  </div>

                  {/* Backups Box */}
                  <div className="bg-surface p-6 rounded-2xl border border-moss-green/20 space-y-4">
                    <h5 className="font-serif text-base font-bold text-dark-green">Copias de Seguridad (Backup)</h5>
                    <p className="text-xs text-midnight-green/70">
                      Descargá una copia de todos los datos en un archivo JSON o restaurá una copia previa en 1 clic.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={exportBackup}
                        className="bg-surface-container-lowest hover:bg-surface-container border border-moss-green/20 text-dark-green px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
                      >
                        <Download size={14} className="text-rosy-brown" />
                        <span>Exportar Copia (JSON)</span>
                      </button>

                      <label className="bg-surface-container-lowest hover:bg-surface-container border border-moss-green/20 text-dark-green px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm">
                        <Upload size={14} className="text-moss-green" />
                        <span>Importar Copia (JSON)</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportFile}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={resetToDefaults}
                        className="text-red-700 hover:bg-red-50 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 ml-auto cursor-pointer"
                      >
                        <RefreshCw size={13} />
                        <span>Restaurar Valores Originales</span>
                      </button>
                    </div>
                  </div>

                  {/* Change password Box */}
                  <div className="bg-surface p-6 rounded-2xl border border-moss-green/20 space-y-4">
                    <h5 className="font-serif text-base font-bold text-dark-green">Cambiar Contraseña de Acceso</h5>
                    <form onSubmit={handlePasswordChange} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="password"
                        value={newEditorPassword}
                        onChange={(e) => setNewEditorPassword(e.target.value)}
                        placeholder="Nueva contraseña (mínimo 4 caracteres)"
                        className="flex-1 bg-surface-container-lowest border border-moss-green/20 rounded-xl px-4 py-2 text-xs text-dark-green"
                      />
                      <button
                        type="submit"
                        className="bg-dark-green hover:bg-moss-green text-surface px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Actualizar Clave
                      </button>
                    </form>
                    {passwordChangeSuccess && (
                      <p className="text-xs text-emerald-600 font-medium">¡Contraseña actualizada con éxito!</p>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminModal;
