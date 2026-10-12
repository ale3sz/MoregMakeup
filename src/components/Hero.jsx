import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import EditableText from './admin/EditableText';

const Hero = () => {
  const { content } = useContent();
  const hero = content?.hero || {};

  const customEase = [0.23, 1, 0.32, 1];

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-dark-green flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-center opacity-65 scale-105"
        >
          <source src={`${import.meta.env.BASE_URL}assets/hero_video.mp4`} type="video/mp4" />
        </video>
        {/* Editorial vignette & gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-green via-dark-green/60 to-dark-green/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-dark-green/30 to-dark-green/80"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: customEase }}
        >
          <span className="inline-flex items-center gap-2 text-beige font-medium tracking-[0.25em] uppercase mb-6 text-xs md:text-sm border border-rosy-brown/40 rounded-full px-6 py-2 bg-dark-green/50 backdrop-blur-md shadow-[0_0_20px_rgba(211,150,140,0.25)]">
            <Sparkles size={14} className="text-rosy-brown" />
            <EditableText section="hero" field="badge" value={hero.badge} />
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: customEase }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-beige mb-6 tracking-tight drop-shadow-2xl"
        >
          <EditableText section="hero" field="title" value={hero.title} />
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: customEase }}
          className="text-lg md:text-2xl text-beige/90 mb-12 font-light max-w-2xl mx-auto drop-shadow-md leading-relaxed"
        >
          <EditableText section="hero" field="tagline" value={hero.tagline} />
          <br className="hidden md:block" />
          <span className="text-rosy-brown italic font-serif font-medium drop-shadow block mt-1">
            <EditableText section="hero" field="highlight" value={hero.highlight} />
          </span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3, ease: customEase }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6"
        >
          <Link
            to="booking"
            smooth={true}
            duration={450}
            offset={-70}
            className="cursor-pointer w-full sm:w-auto px-10 py-4 bg-rosy-brown text-dark-green rounded-full font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-beige shadow-[0_0_30px_rgba(211,150,140,0.45)] hover:shadow-[0_0_40px_rgba(247,244,213,0.6)] btn-press"
          >
            {hero.ctaBooking || 'Reservar Turno'}
          </Link>
          <Link
            to="portfolio"
            smooth={true}
            duration={450}
            offset={-70}
            className="cursor-pointer w-full sm:w-auto px-10 py-4 bg-white/5 border border-beige/40 text-beige hover:bg-beige hover:text-dark-green rounded-full font-bold uppercase tracking-wider text-xs md:text-sm backdrop-blur-md hover:shadow-lg btn-press"
          >
            {hero.ctaPortfolio || 'Explorar Portfolio'}
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-beige/60 text-xs uppercase tracking-widest mb-2 font-medium">Descubrir</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-beige/60 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
