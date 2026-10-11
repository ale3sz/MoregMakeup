import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';

const Services = () => {
  const { content } = useContent();
  const { isEditMode, openAdminModal } = useAuth();
  const services = content?.services || [];

  return (
    <section className="w-full py-24 bg-surface-container-low border-y border-moss-green/10" id="services">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm uppercase tracking-widest text-moss-green font-semibold">Servicios Exclusivos</span>
          <h2 className="text-4xl md:text-5xl font-serif text-dark-green font-bold">Experiencias de Belleza a Medida</h2>
          <p className="text-lg text-on-surface-variant font-light">
            Cada servicio incluye un diagnóstico cutáneo previo y selección meticulosa de productos para lograr el acabado exacto que soñás.
          </p>

          {isEditMode && (
            <button
              type="button"
              onClick={openAdminModal}
              className="mt-2 bg-rosy-brown hover:bg-rosy-brown-dark text-dark-green hover:text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <Pencil size={13} />
              <span>Editar Precios & Servicios</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {services.map((service, index) => {
            const isFeatured = service.id === 'novias';
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                key={service.id || index} 
                className={`relative flex flex-col justify-between p-8 md:p-10 rounded-3xl transition-all duration-300 ${
                  isFeatured 
                    ? 'bg-surface-container-lowest border-2 border-rosy-brown shadow-xl hover:shadow-2xl ring-4 ring-rosy-brown/10' 
                    : 'bg-surface-container-lowest border border-moss-green/20 shadow-sm hover:shadow-xl'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rosy-brown text-dark-green text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <span>★</span> Experiencia Insignia
                  </div>
                )}

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-moss-green font-bold">{service.shortTitle}</span>
                    <span className="text-xs text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full font-medium">{service.time}</span>
                  </div>
                  
                  <h3 className="text-3xl font-serif text-dark-green font-bold leading-tight">{service.title}</h3>
                  
                  <p className="text-base text-on-surface-variant leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="pt-2">
                    <div className="text-4xl leading-tight text-dark-green font-semibold font-serif">{service.price}</div>
                  </div>
                  
                  <div className="space-y-3 pt-6 border-t border-moss-green/10 text-on-surface-variant text-sm">
                    {service.features?.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-moss-green font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-10">
                  <Link
                    to="booking"
                    smooth={true}
                    duration={800}
                    offset={-70}
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('select-service', { detail: service.id }));
                    }}
                    className={`w-full inline-flex items-center justify-center uppercase tracking-wider font-semibold px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer text-xs md:text-sm ${
                      isFeatured
                        ? 'bg-rosy-brown hover:bg-rosy-brown-dark text-dark-green hover:text-white shadow-[0_0_20px_rgba(211,150,140,0.3)]'
                        : 'bg-transparent border-2 border-rosy-brown-dark text-rosy-brown-dark hover:bg-rosy-brown-dark hover:text-white'
                    }`}
                  >
                    Seleccionar y Reservar
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
