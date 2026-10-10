import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Valentina Rossi',
      service: 'Maquillaje de Novia',
      text: 'Morena es una genia total. El maquillaje me duró intacto toda la fiesta, a pesar del calor y de haber llorado. La súper recomiendo por su paciencia y profesionalismo.',
    },
    {
      id: 2,
      name: 'Camila López',
      service: 'Maquillaje Social',
      text: 'Me encantó cómo me dejó la piel, súper natural pero cubritiva. Además, es muy puntual y cuida muchísimo la higiene de sus herramientas. ¡Ya reservé de nuevo!',
    },
    {
      id: 3,
      name: 'Sofía Martínez',
      service: 'Make up de Graduación',
      text: 'El acabado glow que logró es increíble, literal mi piel parecía de porcelana pero se veía súper natural. Una dulzura para atenderte, te hace sentir súper cómoda.',
    }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-widest text-moss-green font-bold block mb-4">Experiencias</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-6">Lo que dicen mis clientas</h2>
          <div className="w-20 h-1 bg-rosy-brown mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div 
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm border border-moss-green/10 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-rosy-brown">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-midnight-green mb-8 italic text-lg leading-relaxed font-light">"{test.text}"</p>
              </div>
              <div className="border-t border-moss-green/10 pt-6">
                <p className="font-bold text-dark-green uppercase tracking-wider text-sm">{test.name}</p>
                <p className="text-xs text-moss-green uppercase tracking-widest mt-1 font-semibold">{test.service}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
