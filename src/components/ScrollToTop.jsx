import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      title="Volver arriba"
      className={`fixed bottom-6 left-6 z-40 p-3.5 rounded-full shadow-2xl transition-all duration-300 transform flex items-center justify-center cursor-pointer border ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto hover:scale-110'
          : 'opacity-0 translate-y-6 pointer-events-none'
      } bg-dark-green/90 dark:bg-[#0E3525]/95 text-surface dark:text-[#F7F4D5] border-rosy-brown/30 hover:bg-moss-green dark:hover:bg-[#144230] backdrop-blur-md`}
    >
      <ArrowUp size={20} className="stroke-[2.5]" />
    </button>
  );
};

export default ScrollToTop;
