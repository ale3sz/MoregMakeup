import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

const Booking = () => {
  const [formData, setFormData] = useState({
    service: '',
    modality: 'estudio',
    address: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    notes: ''
  });

  useEffect(() => {
    const handleSelectService = (e) => {
      setFormData(prev => ({ ...prev, service: e.detail }));
    };
    window.addEventListener('select-service', handleSelectService);
    return () => window.removeEventListener('select-service', handleSelectService);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = "5493413780411"; // Real phone from portfolio
    const modalityText = formData.modality === 'domicilio' ? `a domicilio en ${formData.address}` : 'en estudio';
    const text = `¡Hola Morena! Quería consultar por un turno para maquillaje.
    
*Servicio:* ${formData.service || 'A definir'}
*Modalidad:* ${modalityText}
*Fecha:* ${formData.date}
*Horario preferido:* ${formData.time}
    
*Mis datos:*
*Nombre:* ${formData.name}
*Teléfono:* ${formData.phone}
*Notas:* ${formData.notes || 'Ninguna'}

¿Tendrías disponibilidad? ¡Gracias!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  return (
    <section id="booking" className="py-24 bg-dark-green text-surface relative">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <img src="/assets/paleta.jpeg" alt="Background" className="w-full h-full object-cover grayscale" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <span className="text-sm uppercase tracking-widest text-rosy-brown font-bold block mb-4">Agenda Abierta</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Reservá tu <br/>Experiencia</h2>
            <div className="w-20 h-1 bg-rosy-brown mb-8"></div>
            <p className="text-lg text-surface-dim mb-8 font-light leading-relaxed">
              Completá el formulario con los detalles de tu evento para consultar disponibilidad. Te responderé personalmente a la brevedad vía WhatsApp para coordinar los próximos pasos.
            </p>
            
            <div className="bg-midnight-green/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h3 className="font-serif text-xl font-bold mb-4">Información Importante</h3>
              <ul className="space-y-4 text-surface-dim text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-rosy-brown flex-shrink-0 mt-0.5" size={18} />
                  <p>La fecha se reserva únicamente con seña previa.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-rosy-brown flex-shrink-0 mt-0.5" size={18} />
                  <p>Las pruebas de maquillaje para novias se realizan exclusivamente en el estudio.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-[2rem] shadow-2xl border border-beige/50">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Servicio */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">Servicio de interés *</label>
                    <select 
                      name="service" 
                      value={formData.service} 
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors appearance-none"
                    >
                      <option value="" disabled>Seleccioná un servicio</option>
                      <option value="Maquillaje Social / Evento">Maquillaje Social / Evento</option>
                      <option value="Maquillaje de Novia / XV">Maquillaje de Novia / XV</option>
                      <option value="Maquillaje Artístico">Maquillaje Artístico / Editorial</option>
                      <option value="Otro">Otro (Especificar en notas)</option>
                    </select>
                  </div>

                  {/* Modalidad */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">Modalidad *</label>
                    <select 
                      name="modality" 
                      value={formData.modality} 
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors appearance-none"
                    >
                      <option value="estudio">En Estudio (Rosario)</option>
                      <option value="domicilio">A Domicilio / Hotel</option>
                    </select>
                  </div>

                  {/* Dirección */}
                  {formData.modality === 'domicilio' && (
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">Dirección del evento *</label>
                      <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange}
                        required={formData.modality === 'domicilio'}
                        placeholder="Ubicación aproximada"
                        className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors placeholder-midnight-green/40"
                      />
                    </div>
                  )}

                  {/* Fecha y Hora */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">Fecha del evento *</label>
                    <input 
                      type="date" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">Horario ideal *</label>
                    <input 
                      type="time" 
                      name="time" 
                      value={formData.time} 
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors"
                    />
                  </div>

                  {/* Datos Personales */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">Tu Nombre *</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      required
                      placeholder="Nombre completo"
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors placeholder-midnight-green/40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">WhatsApp *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      required
                      placeholder="+54 9..."
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors placeholder-midnight-green/40"
                    />
                  </div>

                  {/* Notas */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">Detalles Adicionales</label>
                    <textarea 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleChange}
                      rows="3"
                      placeholder="Contame un poco más sobre el evento, el look que buscas o si tienes alguna alergia..."
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors placeholder-midnight-green/40 resize-none"
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-dark-green text-surface font-bold uppercase tracking-wider py-5 rounded-xl hover:bg-moss-green transition-all shadow-lg mt-6 flex items-center justify-center gap-3"
                >
                  Consultar Disponibilidad
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
