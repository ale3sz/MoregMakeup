import React, { useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';

const EditableText = ({ 
  section, 
  field, 
  value, 
  multiline = false, 
  className = '', 
  tag: Tag = 'span',
  placeholder = 'Hacé clic para escribir...' 
}) => {
  const { isEditMode } = useAuth();
  const { updateField } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  useEffect(() => {
    setTempValue(value || '');
  }, [value]);

  if (!isEditMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  const handleSave = (e) => {
    if (e) e.stopPropagation();
    updateField(section, field, tempValue);
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    if (e) e.stopPropagation();
    setTempValue(value || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <span className="relative inline-block w-full z-30" onClick={(e) => e.stopPropagation()}>
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            rows={4}
            className="w-full p-3 bg-surface-container-lowest text-dark-green border-2 border-rosy-brown rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-dark-green text-sm sm:text-base resize-y font-normal"
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full p-2 bg-surface-container-lowest text-dark-green border-2 border-rosy-brown rounded-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-dark-green font-normal text-inherit"
          />
        )}
        <span className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1 bg-dark-green text-surface hover:bg-moss-green rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow cursor-pointer"
          >
            <Check size={14} /> Listo
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <X size={14} /> Cancelar
          </button>
        </span>
      </span>
    );
  }

  return (
    <Tag
      onClick={() => setIsEditing(true)}
      title="Hacé clic para editar este texto"
      className={`relative group/editable cursor-pointer transition-all outline-dashed outline-1 outline-transparent hover:outline-rosy-brown hover:bg-rosy-brown/10 rounded px-1 -mx-1 inline-block ${className}`}
    >
      {value || <span className="italic text-midnight-green/40">{placeholder}</span>}
      <span className="opacity-0 group-hover/editable:opacity-100 transition-opacity ml-1.5 inline-flex items-center align-middle bg-rosy-brown text-dark-green p-1 rounded-full shadow text-[10px]">
        <Pencil size={11} />
      </span>
    </Tag>
  );
};

export default EditableText;
