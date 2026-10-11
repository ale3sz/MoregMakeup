import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultContent } from '../data/defaultContent';
import { getSupabaseClient, isSupabaseConfigured } from '../services/supabase';

const ContentContext = createContext();

const STORAGE_KEY = 'moreg_site_content_v1';

export const sanitizeAssetSrc = (src) => {
  if (!src) return '';
  if (
    src.startsWith('data:') || 
    src.startsWith('blob:') || 
    src.startsWith('http://') || 
    src.startsWith('https://')
  ) {
    return src;
  }
  return src.replace(/^\/?(MoregMakeup\/)?/, '').replace(/^\/?assets\//, 'assets/');
};

export const sanitizeContent = (data) => {
  if (!data) return data;
  const clean = { ...data };
  if (Array.isArray(clean.portfolio)) {
    clean.portfolio = clean.portfolio.map(img => ({
      ...img,
      src: sanitizeAssetSrc(img.src)
    }));
  }
  return clean;
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = sanitizeContent(JSON.parse(saved));
        // Deep merge with defaultContent to ensure any new keys exist
        return {
          ...defaultContent,
          ...parsed,
          hero: { ...defaultContent.hero, ...parsed.hero },
          about: { ...defaultContent.about, ...parsed.about },
          contact: { ...defaultContent.contact, ...parsed.contact }
        };
      }
    } catch (e) {
      console.warn('Error cargando contenido local:', e);
    }
    return sanitizeContent(defaultContent);
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' }); // 'success' | 'error' | ''
  const [cloudSynced, setCloudSynced] = useState(false);

  // Sync from Supabase on start if configured
  useEffect(() => {
    const fetchFromSupabase = async () => {
      const client = getSupabaseClient();
      if (!client) return;

      try {
        const { data, error } = await client
          .from('site_content')
          .select('content_data')
          .eq('id', 'main')
          .single();

        if (error) {
          console.warn('No se pudo cargar desde Supabase:', error.message);
          return;
        }

        if (data && data.content_data) {
          const cleanData = sanitizeContent(data.content_data);
          setContent(prev => ({
            ...prev,
            ...cleanData
          }));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData));
          setCloudSynced(true);
        }
      } catch (err) {
        console.warn('Error conectando a Supabase:', err);
      }
    };

    if (isSupabaseConfigured()) {
      fetchFromSupabase();
    }
  }, []);

  // Update a single field in an object section (e.g. hero.title)
  const updateField = useCallback((section, key, value) => {
    setContent(prev => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      };
      setHasUnsavedChanges(true);
      return updated;
    });
  }, []);

  // Update an entire section (e.g. replacing the services or portfolio array)
  const updateSection = useCallback((section, newSectionData) => {
    setContent(prev => {
      const updated = {
        ...prev,
        [section]: newSectionData
      };
      setHasUnsavedChanges(true);
      return updated;
    });
  }, []);

  // Update a specific item in an array (portfolio, services, diplomas, testimonials, faqs)
  const updateItem = useCallback((section, id, updatedFields) => {
    setContent(prev => {
      const list = prev[section];
      if (!Array.isArray(list)) return prev;

      const updatedList = list.map(item => 
        item.id === id ? { ...item, ...updatedFields } : item
      );

      setHasUnsavedChanges(true);
      return {
        ...prev,
        [section]: updatedList
      };
    });
  }, []);

  // Add an item to an array section
  const addItem = useCallback((section, newItem) => {
    setContent(prev => {
      const list = prev[section] || [];
      const id = newItem.id || Date.now();
      const updatedList = [{ ...newItem, id }, ...list];
      setHasUnsavedChanges(true);
      return {
        ...prev,
        [section]: updatedList
      };
    });
  }, []);

  // Delete an item from an array section
  const deleteItem = useCallback((section, id) => {
    setContent(prev => {
      const list = prev[section];
      if (!Array.isArray(list)) return prev;

      const updatedList = list.filter(item => item.id !== id);
      setHasUnsavedChanges(true);
      return {
        ...prev,
        [section]: updatedList
      };
    });
  }, []);

  // Save changes locally and to Supabase (if configured)
  const saveChanges = async () => {
    setIsSaving(true);
    setSaveStatus({ type: '', message: '' });

    try {
      const cleanContent = sanitizeContent(content);
      setContent(cleanContent);

      // 1. Guardar en localStorage siempre
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanContent));

      // 2. Si Supabase está configurado, sincronizar con la nube
      const client = getSupabaseClient();
      if (client) {
        const { error } = await client
          .from('site_content')
          .upsert({ id: 'main', content_data: cleanContent, updated_at: new Date().toISOString() });

        if (error) {
          throw new Error('Guardado local exitoso, pero falló Supabase: ' + error.message);
        }
        setCloudSynced(true);
        setSaveStatus({ type: 'success', message: '¡Guardado localmente y sincronizado en la nube (Supabase)!' });
      } else {
        setSaveStatus({ type: 'success', message: '¡Cambios guardados localmente con éxito!' });
      }

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error al guardar:', error);
      setSaveStatus({ type: 'warning', message: error.message || 'Guardado localmente con advertencias.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => {
        setSaveStatus({ type: '', message: '' });
      }, 5000);
    }
  };

  // Reset to original defaults
  const resetToDefaults = () => {
    if (window.confirm('¿Seguro que deseas restaurar los textos e imágenes originales de la página? Se perderán las modificaciones personalizadas no respaldadas.')) {
      setContent(defaultContent);
      localStorage.removeItem(STORAGE_KEY);
      setHasUnsavedChanges(false);
      setSaveStatus({ type: 'success', message: 'Contenido restaurado a los valores predeterminados.' });
    }
  };

  // Export current content as JSON file
  const exportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `moreg_makeup_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const importBackup = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.hero && parsed.services && parsed.portfolio) {
        setContent(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        setHasUnsavedChanges(false);
        setSaveStatus({ type: 'success', message: '¡Copia de seguridad importada con éxito!' });
        return { success: true };
      }
      return { success: false, message: 'El archivo JSON no tiene el formato esperado del sitio.' };
    } catch (e) {
      return { success: false, message: 'Archivo JSON inválido: ' + e.message };
    }
  };

  // Image upload compression helper (creates optimized Data URL)
  const processImageFile = (file) => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('El archivo debe ser una imagen'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1600;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Export as optimized WebP or JPEG
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error('No se pudo procesar la imagen'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsDataURL(file);
    });
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateField,
        updateSection,
        updateItem,
        addItem,
        deleteItem,
        saveChanges,
        hasUnsavedChanges,
        isSaving,
        saveStatus,
        cloudSynced,
        resetToDefaults,
        exportBackup,
        importBackup,
        processImageFile
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
