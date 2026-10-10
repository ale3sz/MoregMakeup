import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Hero = () => {
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
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 text-beige font-medium tracking-[0.25em] uppercase mb-6 text-xs md:text-sm border border-rosy-brown/40 rounded-full px-6 py-2 bg-dark-green/50 backdrop-blur-md shadow-[0_0_20px_rgba(211,150,140,0.25)]">
            <Sparkles size={14} className="text-rosy-brown" /> Make-up Artist Profesional
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-beige mb-6 tracking-tight drop-shadow-2xl"
        >
          Morena Garnica
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-beige/90 mb-12 font-light max-w-2xl mx-auto drop-shadow-md leading-relaxed"
        >
          Especialista en maquillaje social y novias. <br className="hidden md:block" />
          <span className="text-rosy-brown italic font-serif font-medium drop-shadow">Resaltando tu belleza en los momentos más importantes.</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6"
        >
          <Link
            to="booking"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer w-full sm:w-auto px-10 py-4 bg-rosy-brown text-dark-green rounded-full font-bold uppercase tracking-wider text-xs md:text-sm transition-all hover:bg-beige shadow-[0_0_30px_rgba(211,150,140,0.45)] hover:shadow-[0_0_40px_rgba(247,244,213,0.6)] transform hover:-translate-y-1"
          >
            Reservar Turno
          </Link>
          <Link
            to="portfolio"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer w-full sm:w-auto px-10 py-4 bg-white/5 border border-beige/40 text-beige hover:bg-beige hover:text-dark-green rounded-full font-bold uppercase tracking-wider text-xs md:text-sm transition-all backdrop-blur-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Explorar Portfolio
          </Link>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-beige/60 text-xs uppercase tracking-widest mb-2 font-medium">Descubrir</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-beige/60 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
