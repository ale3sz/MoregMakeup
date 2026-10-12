import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';

const FAQ = () => {
  const { content } = useContent();
  const { isEditMode, openAdminModal } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = content?.faqs || [];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-surface-container-low border-t border-moss-green/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-moss-green font-bold block mb-3">Dudas Comunes</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-green mb-4">Preguntas Frecuentes</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-rosy-brown to-transparent mx-auto"></div>

          {isEditMode && (
            <button
              type="button"
              onClick={openAdminModal}
              className="mt-6 bg-rosy-brown hover:bg-rosy-brown-dark text-dark-green hover:text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md cursor-pointer btn-press"
            >
              <Plus size={14} />
              <span>Gestionar Preguntas Frecuentes</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
                key={index} 
                className="bg-surface-container-lowest border border-moss-green/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none cursor-pointer btn-press"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-bold text-base md:text-lg text-dark-green pr-4 leading-snug">{faq.question}</span>
                  <span className={`text-rosy-brown flex-shrink-0 bg-rosy-brown/10 p-2 rounded-full transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDown size={18} />
                  </span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="px-8 pb-6 text-midnight-green border-t border-moss-green/10 pt-4 leading-relaxed font-light text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
