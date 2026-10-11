import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('moreg_editor_auth') === 'true';
  });
  
  const [isEditMode, setIsEditMode] = useState(() => {
    return localStorage.getItem('moreg_editor_auth') === 'true';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Custom password stored locally or default
  const getMasterPassword = () => {
    return localStorage.getItem('moreg_editor_password') || 'morena2026';
  };

  const login = (password) => {
    const validPassword = getMasterPassword();
    if (password === validPassword) {
      setIsLoggedIn(true);
      setIsEditMode(true);
      localStorage.setItem('moreg_editor_auth', 'true');
      setIsLoginModalOpen(false);
      return { success: true };
    }
    return { success: false, message: 'Contraseña incorrecta. Probá nuevamente.' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsEditMode(false);
    setIsAdminModalOpen(false);
    localStorage.removeItem('moreg_editor_auth');
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const setCustomPassword = (newPassword) => {
    if (newPassword && newPassword.length >= 4) {
      localStorage.setItem('moreg_editor_password', newPassword);
      return true;
    }
    return false;
  };

  // Keyboard shortcut: Ctrl+Shift+E or Cmd+Shift+E
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        if (!isLoggedIn) {
          setIsLoginModalOpen(true);
        } else {
          setIsAdminModalOpen(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isEditMode,
        isLoginModalOpen,
        isAdminModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        openAdminModal: () => setIsAdminModalOpen(true),
        closeAdminModal: () => setIsAdminModalOpen(false),
        toggleEditMode,
        login,
        logout,
        setCustomPassword,
        masterPassword: getMasterPassword()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
