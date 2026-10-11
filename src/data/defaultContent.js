const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/';

export const defaultContent = {
  hero: {
    badge: 'Make-up Artist Profesional',
    title: 'Morena Garnica',
    tagline: 'Especialista en maquillaje social y novias.',
    highlight: 'Resaltando tu belleza en los momentos más importantes.',
    ctaBooking: 'Reservar Turno',
    ctaPortfolio: 'Explorar Portfolio'
  },
  services: [
    {
      id: 'social',
      title: 'Maquillaje Social & Eventos',
      shortTitle: 'Social & Fiestas',
      time: '60-75 min',
      description: 'Diseño integral de ojos, piel aterciopelada y labios que acompañan armónicamente tu vestuario e iluminación del evento.',
      price: 'Consultar',
      features: ['Preparación de piel', 'Pestañas postizas incluidas', 'Fijación larga duración']
    },
    {
      id: 'novias',
      title: 'Maquillaje Novias & XV',
      shortTitle: 'Novias & Quince',
      time: '2.5 hrs + Prueba',
      description: 'Atención exclusiva. Incluye prueba previa, asesoría de imagen, preparación profunda de piel y kit de retoque.',
      price: 'Consultar',
      features: ['Prueba previa en estudio', 'Kit de retoque', 'Asesoría de imagen']
    }
  ],
  portfolio: [
    { id: 1, src: `${baseUrl}assets/foto_1_tiara_ojos_abiertos.png`, category: 'Novias', alt: 'Maquillaje de Novia con Tiara' },
    { id: 2, src: `${baseUrl}assets/foto_2_tiara_ojos_cerrados.png`, category: 'Novias', alt: 'Detalle Sombras Ojos Cerrados' },
    { id: 3, src: `${baseUrl}assets/foto_3_xv_ojos_abiertos.png`, category: 'Eventos', alt: 'Maquillaje Quinceañera Iluminado' },
    { id: 4, src: `${baseUrl}assets/foto_4_xv_ojos_cerrados.png`, category: 'Eventos', alt: 'Detalle Maquillaje de Fiesta' },
    { id: 5, src: `${baseUrl}assets/quinceaniera.jpeg`, category: 'Eventos', alt: 'Producción Quinceañera' },
    { id: 6, src: `${baseUrl}assets/model_10_0.jpg`, category: 'Social', alt: 'Look Social Glamour' },
    { id: 7, src: `${baseUrl}assets/model_10_1.jpg`, category: 'Social', alt: 'Look Social Natural Glow' },
    { id: 8, src: `${baseUrl}assets/model_11_0.jpg`, category: 'Novias', alt: 'Novia Editorial' },
    { id: 9, src: `${baseUrl}assets/model_11_1.jpg`, category: 'Social', alt: 'Make Up para Eventos' },
    { id: 10, src: `${baseUrl}assets/model_11_2.jpg`, category: 'Social', alt: 'Maquillaje de Noche' },
    { id: 11, src: `${baseUrl}assets/model_9_0.jpg`, category: 'Novias', alt: 'Producción Novia Clásica' },
    { id: 12, src: `${baseUrl}assets/model_9_1.jpg`, category: 'Eventos', alt: 'Make Up de Alta Cobertura' }
  ],
  about: {
    badge: 'Sobre Mí',
    title: 'Conocé un poco sobre mi trabajo',
    p1: 'Soy Morena Garnica, maquilladora profesional y experta en belleza radicada en Rosario, especializada en el maquillaje social, producciones fotográficas y diferentes eventos.',
    p2: 'Me caracterizo por un trabajo prolijo, el cuidado extremo de la piel y mi capacidad de adaptación a la estética de cada producción. A lo largo de mi carrera, he tenido la oportunidad de trabajar en televisión para canales como La Capital + y Telefe, y colaborado con agencias como "Hi Management" e "Instituto IESERH".',
    feature1Title: 'Cuidado de la Piel',
    feature1Desc: 'Preparación dermatológica y protocolo clínico antes de cada maquillaje.',
    feature2Title: 'Acabado Prolijo',
    feature2Desc: 'Texturas sedosas, luminosidad orgánica y fijación de larga duración.',
    badgeExperienceTitle: 'Experiencia',
    badgeExperienceDesc: 'Telefe, La Capital + & Producciones'
  },
  diplomas: [
    { 
      id: 1, 
      src: `${baseUrl}assets/real_diploma_0.jpg`, 
      alt: 'Certificado de Perfeccionamiento en Maquillaje - ISEM',
      title: 'Perfeccionamiento en Maquillaje',
      institution: 'Instituto Superior de Estética y Moda (ISEM)'
    },
    { 
      id: 2, 
      src: `${baseUrl}assets/real_diploma_1.jpg`, 
      alt: 'Certificado de Maquillaje Profesional - ISEM',
      title: 'Maquillaje Profesional',
      institution: 'Instituto Superior de Estética y Moda (ISEM)'
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'Valentina Rossi',
      service: 'Maquillaje de Novia',
      text: 'Morena es una genia total. El maquillaje me duró intacto toda la fiesta, a pesar del calor y de haber llorado. La súper recomiendo por su paciencia y profesionalismo.'
    },
    {
      id: 2,
      name: 'Camila López',
      service: 'Maquillaje Social',
      text: 'Me encantó cómo me dejó la piel, súper natural pero cubritiva. Además, es muy puntual y cuida muchísimo la higiene de sus herramientas. ¡Ya reservé de nuevo!'
    },
    {
      id: 3,
      name: 'Sofía Martínez',
      service: 'Make up de Graduación',
      text: 'El acabado glow que logró es increíble, literal mi piel parecía de porcelana pero se veía súper natural. Una dulzura para atenderte, te hace sentir súper cómoda.'
    }
  ],
  faqs: [
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
  ],
  contact: {
    phone: '+54 9 341 378 0411',
    whatsappNumber: '5493413780411',
    email: 'morenagarnica16@gmail.com',
    location: 'Rosario, Santa Fe',
    instagramHandle: '@morennagar',
    instagramUrl: 'https://www.instagram.com/morennagar/'
  }
};
