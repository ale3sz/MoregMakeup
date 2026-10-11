import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Sparkles, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(password);
    if (!result.success) {
      setError(result.message || 'Contraseña incorrecta');
    } else {
      setPassword('');
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[120] bg-dark-green/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={closeLoginModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-surface-container-lowest max-w-md w-full rounded-[2rem] p-8 shadow-2xl border border-beige/60 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rosy-brown/20 rounded-2xl text-rosy-brown">
                <Lock size={24} />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-moss-green font-bold block">Acceso Exclusivo</span>
                <h3 className="font-serif text-2xl font-bold text-dark-green">Modo Edición</h3>
              </div>
            </div>
            <button
              onClick={closeLoginModal}
              className="text-midnight-green/50 hover:text-dark-green p-2 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-midnight-green/80 text-sm mb-6 leading-relaxed">
            Ingresá tu contraseña de administradora para editar las fotos, textos, servicios y precios en tiempo real.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  autoFocus
                  placeholder="Ingresá tu clave..."
                  className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-3.5 pr-12 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors placeholder-midnight-green/40"
                />
                <KeyRound size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-midnight-green/40 pointer-events-none" />
              </div>
              {error && (
                <p className="text-xs text-red-600 mt-2 font-medium">{error}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-dark-green hover:bg-moss-green text-surface font-bold uppercase tracking-wider py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Sparkles size={16} className="text-rosy-brown" />
                <span>Ingresar al Modo Edición</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-moss-green/10 flex items-center justify-between text-xs text-midnight-green/60">
            <span>Atajo rápido: <kbd className="bg-surface px-1.5 py-0.5 rounded border border-moss-green/20 font-mono">Ctrl + Shift + E</kbd></span>
            <span className="text-rosy-brown font-medium">Morena G.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModal;
