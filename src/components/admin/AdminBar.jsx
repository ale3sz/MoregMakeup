import React from 'react';
import { Sparkles, Eye, Pencil, Save, Settings, LogOut, Check, AlertCircle, Cloud } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';

const AdminBar = () => {
  const { isLoggedIn, isEditMode, toggleEditMode, openAdminModal, logout } = useAuth();
  const { saveChanges, hasUnsavedChanges, isSaving, saveStatus, cloudSynced } = useContent();

  if (!isLoggedIn) return null;

  return (
    <aside aria-label="Barra de Administración" className="fixed top-0 left-0 right-0 z-[110] bg-dark-green/95 backdrop-blur-md text-surface border-b border-rosy-brown/30 shadow-2xl px-4 py-2.5 transition-all">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Brand & Mode Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-rosy-brown/20 text-rosy-brown px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] border border-rosy-brown/30">
            <Sparkles size={13} />
            <span>Modo Morena</span>
          </div>

          {/* Cloud sync status badge */}
          {cloudSynced && (
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <Cloud size={12} /> Supabase Sincronizado
            </span>
          )}

          {/* Save Status Banner */}
          {saveStatus.message && (
            <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium animate-fadeIn ${
              saveStatus.type === 'success' 
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30' 
                : 'bg-amber-900/60 text-amber-300 border border-amber-500/30'
            }`}>
              {saveStatus.type === 'success' ? <Check size={13} /> : <AlertCircle size={13} />}
              {saveStatus.message}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toggle View: Edit vs Preview */}
          <button
            type="button"
            onClick={toggleEditMode}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              isEditMode
                ? 'bg-rosy-brown text-dark-green shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-surface'
            }`}
            title={isEditMode ? 'Pasar a vista previa de clienta' : 'Activar modo de edición visual'}
          >
            {isEditMode ? <Pencil size={13} /> : <Eye size={13} />}
            <span>{isEditMode ? 'Editando' : 'Vista Previa'}</span>
          </button>

          {/* Save Button */}
          <button
            type="button"
            onClick={saveChanges}
            disabled={isSaving}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              hasUnsavedChanges
                ? 'bg-[#25D366] hover:bg-[#1EBE5D] text-white animate-pulse'
                : 'bg-white/10 hover:bg-white/20 text-surface'
            }`}
          >
            <Save size={13} />
            <span>{isSaving ? 'Guardando...' : hasUnsavedChanges ? 'Guardar Cambios' : 'Guardado'}</span>
          </button>

          {/* Panel de Control Button */}
          <button
            type="button"
            onClick={openAdminModal}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-surface rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            title="Abrir panel completo de fotos, precios y textos"
          >
            <Settings size={13} />
            <span className="hidden sm:inline">Panel Completo</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            title="Cerrar sesión de edición"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminBar;
