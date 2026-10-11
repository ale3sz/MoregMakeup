import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className={`relative p-2.5 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer border shadow-sm ${
        isDark
          ? 'bg-[#0E3525] border-rosy-brown/40 text-[#F7F4D5] hover:bg-[#144230] hover:text-white'
          : 'bg-surface border-moss-green/20 text-dark-green hover:bg-surface-container hover:text-midnight-green'
      } ${className}`}
    >
      <span className="relative flex items-center justify-center w-5 h-5">
        {isDark ? (
          <Sun size={18} className="text-amber-300 transform rotate-0 transition-transform duration-500" />
        ) : (
          <Moon size={18} className="text-midnight-green transform rotate-0 transition-transform duration-500" />
        )}
      </span>
      {showLabel && (
        <span className="text-xs uppercase tracking-wider font-semibold">
          {isDark ? 'Modo Claro' : 'Modo Oscuro'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
