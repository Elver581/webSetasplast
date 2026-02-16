import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCertificate, 
  FaCheckCircle,
  FaLeaf,
  FaShieldAlt
} from 'react-icons/fa';
import calidad from '../assets/certification/9001.svg';
import ambiental from '../assets/certification/14001.svg';
import sgt from '../assets/certification/45001.svg';
import huellaCarbono from '../assets/certification/Fenalco.svg';

const CertificationsSection = () => {
  const [hoveredCert, setHoveredCert] = useState<string | null>(null);

  const certifications = [
    {
      id: 'iso9001',
      title: 'ISO 9001:2015',
      subtitle: 'Gestión de Calidad',
      description: 'Sistema de gestión de calidad que demuestra nuestra capacidad para proporcionar productos que satisfacen consistentemente los requisitos del cliente.',
      logo: calidad,
      color: '#198754',
      bgColor: 'rgba(25, 135, 84, 0.1)',
      features: [
        'Mejora continua de procesos',
        'Satisfacción del cliente',
        'Productos de alta calidad',
        'Trazabilidad completa'
      ],
      year: '2020',
      validity: '2023-2026'
    },
    {
      id: 'iso14001',
      title: 'ISO 14001:2015',
      subtitle: 'Gestión Ambiental',
      description: 'Compromiso con la protección del medio ambiente mediante la gestión responsable de nuestros procesos y el impacto ambiental.',
      logo: ambiental,
      color: '#22c55e',
      bgColor: 'rgba(34, 197, 94, 0.1)',
      features: [
        'Reducción de residuos',
        'Eficiencia energética',
        'Impacto ambiental mínimo',
        'Sostenibilidad integral'
      ],
      year: '2021',
      validity: '2024-2027'
    },
    {
      id: 'iso45001',
      title: 'ISO 45001:2018',
      subtitle: 'Seguridad y Salud',
      description: 'Sistema de gestión de seguridad y salud ocupacional que garantiza un ambiente de trabajo seguro para todos nuestros colaboradores.',
      logo: sgt,
      color: '#146c43',
      bgColor: 'rgba(20, 108, 67, 0.1)',
      features: [
        'Prevención de accidentes',
        'Bienestar laboral',
        'Capacitación continua',
        'Ambiente seguro'
      ],
      year: '2022',
      validity: '2025-2028'
    },
    {
      id: 'huella-carbono',
      title: 'Huella de Carbono',
      subtitle: 'Neutralidad Climática',
      description: 'Medición, reducción y compensación de nuestras emisiones de CO₂ a través de la siembra de 1000 árboles en Cundinamarca.',
      logo: huellaCarbono,
      color: '#20c997',
      bgColor: 'rgba(32, 201, 151, 0.1)',
      features: [
        '1000 árboles sembrados',
        '25 ton CO₂ capturadas/año',
        'Procesos sostenibles',
        'Compensación verificada'
      ],
      year: '2023',
      validity: 'Permanente'
    }
  ];

  return (
    <section id='certifications' className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-setasplast/5 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-500/5 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección - 🔧 Reducido margin */}
        <motion.div 
          className="text-center mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center bg-setasplast/10 backdrop-blur-sm rounded-full px-6 py-2 mb-4 border border-setasplast/20"
            whileHover={{ scale: 1.05 }}
          >
            <FaCertificate className="text-setasplast mr-2" />
            <span className="text-setasplast-dark font-semibold text-sm">Certificaciones Internacionales</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-setasplast-dark mb-4">
            Calidad <span className="text-setasplast">Certificada</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nuestro compromiso con la <span className="text-setasplast font-semibold">excelencia operacional</span>, 
            <span className="text-green-600 font-semibold"> sostenibilidad ambiental</span> y 
            <span className="text-setasplast-dark font-semibold"> bienestar laboral</span> está respaldado 
            por las certificaciones internacionales más exigentes.
          </p>
        </motion.div>

        {/* Grid de certificaciones - 🔧 Gaps reducidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCert(cert.id)}
              onMouseLeave={() => setHoveredCert(null)}
            >
              {/* Tarjeta principal - 🔧 Padding optimizado */}
              <motion.div
                className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full"
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Fondo con color de la certificación */}
                <motion.div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: cert.bgColor }}
                />

                {/* Contenido - 🔧 Padding reducido */}
                <div className="relative p-2 lg:p-5 flex flex-col h-full">
                  
                  {/* Header con logo - 🔧 Más compacto */}
               {/* Header con logo */}
<div className="flex flex-col items-center mb-4">
  {/* 🔧 Logo más grande, con fondo en relieve */}
  <motion.div
    className="relative p-2 rounded-3xl bg-white shadow-2xl border border-gray-200 mb-1 scale-110"
    whileHover={{ scale: 1.15, rotate: 1 }}
    transition={{ duration: 0.3 }}
  >
    <img
      src={cert.logo}
      alt={`Logo ${cert.title}`}
      className="w-45 h-45 lg:w-50 lg:h-50 object-contain" // ⬆️ Más grande y destacado
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'w-32 h-32 lg:w-36 lg:h-36 flex items-center justify-center text-lg font-bold rounded-lg';
        fallback.style.backgroundColor = cert.bgColor;
        fallback.style.color = cert.color;
        fallback.textContent = cert.title.split(' ')[0].substring(0, 3);
        target.parentNode?.appendChild(fallback);
      }}
    />
    {/* ✨ Efecto de brillo animado */}
    <motion.div
      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent"
      animate={{
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </motion.div>

</div>


                  {/* Título y subtítulo - 🔧 Spacing optimizado */}
                  <div className="mb-3 flex-grow text-center">
                    <h3 className="text-lg lg:text-xl font-bold mb-1" style={{ color: cert.color }}>
                      {cert.title}
                    </h3>
                    <p className="text-setasplast-dark font-semibold text-xs mb-2">
                      {cert.subtitle}
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  {/* Características principales - 🔧 Más compacto */}
                  <div className="space-y-1">
                    {cert.features.slice(0, 2).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center text-xs"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.1 }}
                      >
                        <FaCheckCircle 
                          className="text-green-500 mr-2 flex-shrink-0" 
                          style={{ fontSize: '10px' }} 
                        />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

             
                </div>

                {/* Indicador de estado activo */}
                <motion.div
                  className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500 shadow-lg"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(34, 197, 94, 0.4)',
                      '0 0 0 10px rgba(34, 197, 94, 0)',
                      '0 0 0 0 rgba(34, 197, 94, 0)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Tooltip expandido al hacer hover - 🔧 Tamaño optimizado */}
              {hoveredCert === cert.id && (
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20 w-72 max-w-sm"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white rounded-xl shadow-2xl border-2 p-4" style={{ borderColor: cert.color }}>
                    {/* Logo en el tooltip - 🔧 Tamaño optimizado */}
                    <div className="flex flex-col items-center mb-3">
                      <motion.div
                        className="relative p-2 rounded-xl bg-white shadow-md border border-gray-100 mb-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={cert.logo}
                          alt={`Logo ${cert.title}`}
                          className="w-12 h-12 object-contain"
                        />
                      </motion.div>

                      <h4 className="font-bold text-setasplast-dark text-center text-sm">
                        Beneficios Completos
                      </h4>
                    </div>
                    
                    <div className="space-y-1">
                      {cert.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs">
                          <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" style={{ fontSize: '10px' }} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Flecha del tooltip */}
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"
                      style={{ borderTopColor: cert.color }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Estadísticas de impacto - 🔧 Margin reducido */}
        <motion.div 
          className="mt-10 lg:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { number: '4', label: 'Certificaciones Activas', icon: FaCertificate },
            { number: '100%', label: 'Cumplimiento Normativo', icon: FaCheckCircle },
            { number: '25', label: 'Ton CO₂ Compensadas', icon: FaLeaf },
            { number: '0', label: 'Accidentes Laborales', icon: FaShieldAlt }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-4 lg:p-5 bg-white/70 backdrop-blur-sm rounded-xl border border-setasplast/20"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)' }}
              transition={{ duration: 0.3 }}
            >
              <stat.icon className="text-2xl lg:text-3xl text-setasplast mx-auto mb-2" />
              <div className="text-2xl lg:text-3xl font-bold text-setasplast-dark mb-1">
                {stat.number}
              </div>
              <div className="text-xs lg:text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;