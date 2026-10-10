import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: '¿Cómo se confirma el turno?',
      answer: 'Los turnos se reservan con una seña del 50% del valor total del servicio a través de transferencia bancaria. El 50% restante se abona el día del evento en efectivo o transferencia. Sin la seña, el turno no está confirmado.'
    },
    {
      question: '¿Cuáles son las políticas de cancelación o reprogramación?',
      answer: 'En caso de cancelar el turno, la seña no es reembolsable ya que ese espacio fue bloqueado exclusivamente para vos. Si necesitas reprogramar, debe ser con al menos 48hs de anticipación y quedará sujeto a disponibilidad en la nueva fecha solicitada.'
    },
    {
      question: '¿Cómo debo preparar mi piel para el día de la cita?',
      answer: 'Es ideal que vengas con el rostro limpio, sin restos de maquillaje del día anterior. Te recomiendo realizar tu rutina de skincare habitual (limpieza e hidratación). Si tienes alguna condición particular en la piel o alergias a algún producto, por favor avísame con anticipación.'
    },
    {
      question: '¿Atendés a domicilio?',
      answer: 'Sí, brindo servicio a domicilio para novias, madrinas, quinceañeras y eventos especiales (mínimo de personas o según la zona). El costo de viáticos se calcula en base a la distancia desde el estudio hasta el lugar donde te prepares.'
    }
  ];

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
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={index} 
              className="bg-surface-container-lowest border border-moss-green/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-serif font-bold text-lg text-dark-green pr-4">{faq.question}</span>
                <span className="text-rosy-brown flex-shrink-0 bg-rosy-brown/10 p-2 rounded-full">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-6 text-midnight-green border-t border-moss-green/10 pt-4 leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
