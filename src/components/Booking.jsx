import React, { useState, useEffect } from 'react';
import { CheckCircle2, Calendar, Zap, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Booking = () => {
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState('booking'); // 'booking' | 'quick'

  // Formulario completo de reserva
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

  // Formulario de consulta rápida
  const [quickData, setQuickData] = useState({
    name: '',
    message: ''
  });

  const WHATSAPP_PHONE = content?.contact?.whatsappNumber || '5493413780411';

  useEffect(() => {
    const handleSelectService = (e) => {
      const serviceMap = {
        social: 'Maquillaje Social / Evento',
        novias: 'Maquillaje de Novia / XV'
      };
      const serviceName = serviceMap[e.detail] || e.detail;
      setFormData(prev => ({ ...prev, service: serviceName }));
      setActiveTab('booking');
    };

    const handleOpenQuick = () => {
      setActiveTab('quick');
    };

    window.addEventListener('select-service', handleSelectService);
    window.addEventListener('open-quick-consultation', handleOpenQuick);
    return () => {
      window.removeEventListener('select-service', handleSelectService);
      window.removeEventListener('open-quick-consultation', handleOpenQuick);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickChange = (e) => {
    const { name, value } = e.target;
    setQuickData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const modalityText = formData.modality === 'domicilio' 
      ? `a domicilio en ${formData.address || 'a coordinar'}` 
      : 'en estudio (Rosario)';

    const text = `¡Hola Morena! Quería consultar por un turno para maquillaje.

*Servicio:* ${formData.service || 'A definir'}
*Modalidad:* ${modalityText}
*Fecha:* ${formData.date}
*Horario preferido:* ${formData.time}

*Mis datos:*
*Nombre:* ${formData.name}
*Teléfono:* ${formData.phone}
*Detalles adicionales:* ${formData.notes || 'Ninguna'}

¿Tendrías disponibilidad? ¡Muchas gracias!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`, '_blank');
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    const clientName = quickData.name.trim() ? `\n*Nombre:* ${quickData.name.trim()}` : '';

    const text = `¡Hola Morena! Te escribo desde tu página web para hacerte una consulta rápida:${clientName}

*Consulta:* ${quickData.message.trim()}

¿Me podrías brindar más información? ¡Gracias!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`, '_blank');
  };

  const quickChips = [
    '¿Tenés disponibilidad para este mes?',
    'Presupuesto para maquillaje de novia',
    'Consulta por servicio a domicilio',
    'Cursos o clases de automaquillaje'
  ];

  const handleChipClick = (chipText) => {
    setQuickData(prev => ({
      ...prev,
      message: prev.message ? `${prev.message} - ${chipText}` : chipText
    }));
  };

  return (
    <section id="booking" className="py-24 bg-dark-green text-surface relative">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        <img src="/assets/paleta.jpeg" alt="Background" className="w-full h-full object-cover grayscale" />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Columna Izquierda: Información */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] text-rosy-brown font-bold block mb-3">Agenda & Contacto</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              Hablemos de tu <br className="hidden sm:block" />Próximo Look
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-rosy-brown to-transparent mb-8"></div>
            <p className="text-lg text-surface-dim mb-8 font-light leading-relaxed">
              Podés reservar tu fecha con todos los detalles o enviarme una <strong>consulta rápida</strong> directa a WhatsApp. Te responderé personalmente a la brevedad para asesorarte.
            </p>
            
            <div className="bg-midnight-green/30 p-8 rounded-2xl border border-white/10 backdrop-blur-sm space-y-4">
              <h3 className="font-serif text-xl font-bold mb-2 flex items-center gap-2">
                <Sparkles size={20} className="text-rosy-brown" />
                Información Importante
              </h3>
              <ul className="space-y-4 text-surface-dim text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-rosy-brown flex-shrink-0 mt-0.5" size={18} />
                  <p>La fecha se reserva formalmente con una seña previa del 50%.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-rosy-brown flex-shrink-0 mt-0.5" size={18} />
                  <p>Las pruebas de maquillaje para novias se realizan con turno en el estudio.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-rosy-brown flex-shrink-0 mt-0.5" size={18} />
                  <p>¿Solo tenés una duda puntual? Elegí la pestaña <strong>Consulta Rápida</strong>.</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Tarjeta con Tabs y Formulario */}
          <div className="w-full lg:w-7/12">
            <div className="bg-surface-container-lowest p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-2xl border border-beige/50 text-dark-green">
              
              {/* Pestañas de Selección */}
              <div className="flex p-1.5 bg-surface rounded-2xl mb-8 border border-moss-green/15 gap-1">
                <button 
                  type="button"
                  onClick={() => setActiveTab('booking')}
                  className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'booking'
                      ? 'bg-dark-green text-surface shadow-md'
                      : 'text-dark-green/70 hover:text-dark-green hover:bg-surface-container'
                  }`}
                >
                  <Calendar size={16} />
                  <span>Reserva de Turno</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveTab('quick')}
                  className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    activeTab === 'quick'
                      ? 'bg-[#25D366] text-white shadow-md'
                      : 'text-dark-green/70 hover:text-dark-green hover:bg-surface-container'
                  }`}
                >
                  <Zap size={16} />
                  <span>Consulta Rápida</span>
                </button>
              </div>

              {/* Contenido según pestaña */}
              {activeTab === 'quick' ? (
                /* FORMULARIO DE CONSULTA RÁPIDA */
                <form onSubmit={handleQuickSubmit} className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-4 flex items-start gap-3">
                    <MessageCircle className="text-[#25D366] flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-xs sm:text-sm text-dark-green/80">
                      Escribí tu consulta a continuación. Al presionar el botón se te abrirá <strong>WhatsApp</strong> con el mensaje listo para enviar.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">
                      Tu Nombre <span className="text-midnight-green/50 lowercase font-normal">(opcional)</span>
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      value={quickData.name} 
                      onChange={handleQuickChange}
                      placeholder="Ej. Sofía"
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-colors placeholder-midnight-green/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">
                      Sugerencias de consulta rápida:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickChips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className="text-xs bg-surface hover:bg-rosy-brown/20 border border-moss-green/20 text-dark-green px-3 py-1.5 rounded-full transition-colors text-left"
                        >
                          + {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">
                      Escribí tu mensaje o consulta *
                    </label>
                    <textarea 
                      name="message" 
                      value={quickData.message} 
                      onChange={handleQuickChange}
                      required
                      rows="4"
                      placeholder="Hola Morena, quería hacerte una consulta sobre..."
                      className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-colors placeholder-midnight-green/40 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold uppercase tracking-wider py-4 md:py-5 rounded-xl transition-all shadow-lg hover:shadow-xl mt-4 flex items-center justify-center gap-3 text-sm md:text-base cursor-pointer"
                  >
                    <MessageCircle size={22} className="fill-current" />
                    <span>Abrir WhatsApp con Mensaje</span>
                  </button>
                </form>
              ) : (
                /* FORMULARIO COMPLETO DE RESERVA */
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Servicio */}
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">Servicio de interés *</label>
                      <select 
                        name="service" 
                        value={formData.service} 
                        onChange={handleChange}
                        required
                        className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors appearance-none cursor-pointer"
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
                        className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors appearance-none cursor-pointer"
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
                          placeholder="Ubicación o zona aproximada"
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
                        className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors cursor-pointer"
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
                        className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors cursor-pointer"
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
                      <label className="block text-xs uppercase tracking-widest font-semibold text-moss-green mb-2">WhatsApp de contacto *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        required
                        placeholder="+54 9 341..."
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
                        placeholder="Contame un poco más sobre el evento, el look que buscas o si tenés alguna duda..."
                        className="w-full bg-surface border border-moss-green/20 rounded-xl px-5 py-4 text-dark-green focus:outline-none focus:ring-2 focus:ring-rosy-brown transition-colors placeholder-midnight-green/40 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-dark-green text-surface font-bold uppercase tracking-wider py-5 rounded-xl hover:bg-moss-green transition-all shadow-lg mt-6 flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>Consultar Disponibilidad por WhatsApp</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
