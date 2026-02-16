import  { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt,
  FaUserShield,
  FaGavel,
  FaFileContract,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaDownload,
  FaExclamationTriangle,
  FaCheckCircle,
  FaEnvelope,
  FaMapMarkerAlt,

  FaInfoCircle,
  FaLock,
  FaGlobe,
  FaUsers,
  FaClock
} from 'react-icons/fa';

const PrivacyPolicySection = () => {
  const [activeSection, setActiveSection] = useState('introduccion');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Secciones de la política
  const sections = [
    { 
      id: 'introduccion', 
      title: 'Introducción', 
      icon: FaInfoCircle,
      color: '#198754'
    },
    { 
      id: 'finalidades', 
      title: 'Finalidades del Tratamiento', 
      icon: FaFileContract,
      color: '#22c55e'
    },
    { 
      id: 'derechos', 
      title: 'Derechos del Titular', 
      icon: FaUserShield,
      color: '#20c997'
    },
    { 
      id: 'seguridad', 
      title: 'Medidas de Seguridad', 
      icon: FaShieldAlt,
      color: '#146c43'
    },
    { 
      id: 'contacto', 
      title: 'Datos de Contacto', 
      icon: FaEnvelope,
      color: '#0d5f2a'
    }
  ];

  // Finalidades del tratamiento
  const finalidades = [
    {
      numero: 'i',
      titulo: 'Comunicación Efectiva',
      descripcion: 'Mantener comunicación constante y efectiva con clientes, afiliados, empleados, contratistas, funcionarios, proveedores y personas autorizadas.',
      icon: FaUsers
    },
    {
      numero: 'ii',
      titulo: 'Promoción de Productos y Servicios',
      descripcion: 'Ofrecer y promocionar por cualquier medio, productos y servicios de SETASPLAST BIC S.A.S., compañías vinculadas o terceros.',
      icon: FaGlobe
    },
    {
      numero: 'iii',
      titulo: 'Eventos y Actividades',
      descripcion: 'Invitar a eventos organizados por la empresa, compañías vinculadas y terceros, organizar concursos y otorgar premios.',
      icon: FaUsers
    },
    {
      numero: 'iv',
      titulo: 'Actividades Comerciales',
      descripcion: 'Desarrollar actividades comerciales conjuntas con compañías o entidades vinculadas o aliadas.',
      icon: FaFileContract
    },
    {
      numero: 'v',
      titulo: 'Gestión de PQR',
      descripcion: 'Mantener información sobre Peticiones, quejas y reclamos presentados por clientes y afiliados.',
      icon: FaEdit
    },
    {
      numero: 'vi',
      titulo: 'Políticas de Calidad',
      descripcion: 'Conservar información relacionada con el cumplimiento de las Políticas de Calidad.',
      icon: FaCheckCircle
    },
    {
      numero: 'vii',
      titulo: 'Análisis Estadísticos',
      descripcion: 'Efectuar análisis estadísticos, demográficos y de mercado.',
      icon: FaEye
    },
    {
      numero: 'viii',
      titulo: 'Estudios y Publicaciones',
      descripcion: 'Elaboración de estudios y publicaciones de carácter académico y periodístico relacionadas con las actividades de la empresa.',
      icon: FaFileContract
    }
  ];

  // Derechos del titular
  const derechos = [
    {
      derecho: 'Conocer y Acceder',
      descripcion: 'Conocer, acceder, actualizar y rectificar sus datos personales.',
      icon: FaEye,
      color: '#22c55e'
    },
    {
      derecho: 'Solicitar Prueba',
      descripcion: 'Solicitar prueba de la autorización otorgada para el tratamiento.',
      icon: FaFileContract,
      color: '#20c997'
    },
    {
      derecho: 'Ser Informado',
      descripcion: 'Ser informado respecto del uso que se ha dado a sus datos personales.',
      icon: FaInfoCircle,
      color: '#198754'
    },
    {
      derecho: 'Presentar Quejas',
      descripcion: 'Presentar ante las autoridades competentes quejas por infracciones a la Ley.',
      icon: FaExclamationTriangle,
      color: '#f59e0b'
    },
    {
      derecho: 'Revocar y Suprimir',
      descripcion: 'Revocar la autorización y/o solicitar la supresión del dato cuando no se respeten los principios legales.',
      icon: FaTrashAlt,
      color: '#ef4444'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -right-20 w-60 h-60 bg-setasplast/5 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center bg-setasplast/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-setasplast/20"
            whileHover={{ scale: 1.05 }}
          >
            <FaShieldAlt className="text-setasplast mr-2" />
            <span className="text-setasplast-dark font-semibold text-sm">Protección de Datos</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-setasplast-dark mb-6">
            Política de <span className="text-setasplast">Privacidad</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Conoce cómo 
            <span className="text-setasplast font-semibold"> SETASPLAST BIC S.A.S.</span> 
            protege y trata tus datos personales de conformidad con la 
            <span className="text-blue-600 font-semibold"> Ley 1581 de 2012</span> y 
            <span className="text-setasplast-dark font-semibold"> normativa vigente</span>.
          </p>
        </motion.div>

        {/* Navegación por secciones */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-setasplast/10 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 lg:px-6 py-3 m-1 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeSection === section.id
                  ? 'text-white shadow-lg'
                  : 'text-setasplast-dark hover:bg-setasplast/10'
              }`}
              style={{ 
                backgroundColor: activeSection === section.id ? section.color : 'transparent'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <section.icon className="mr-2" />
              <span className="hidden sm:inline">{section.title}</span>
              <span className="sm:hidden">{section.title.split(' ')[0]}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Contenido de las secciones */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[600px]"
        >
          
          {/* INTRODUCCIÓN */}
          {activeSection === 'introduccion' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-setasplast/10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-setasplast/10 p-4 rounded-xl mr-4">
                    <FaGavel className="text-3xl text-setasplast" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-setasplast-dark">Marco Legal</h3>
                    <p className="text-gray-600">Normativa aplicable y fundamentos legales</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                      <FaFileContract className="text-blue-600 mr-2" />
                      Ley 1581 de 2012
                    </h4>
                    <p className="text-blue-800 leading-relaxed">
                      "Por la cual se dictan disposiciones generales para la protección de datos personales" 
                      y su Decreto Único 1074 de 2015. SETASPLAST BIC S.A.S. mantiene estrictos procedimientos 
                      y políticas para la salvaguarda de los datos personales.
                    </p>
                  </div>

                  <div className="bg-setasplast/5 rounded-xl p-6 border border-setasplast/20">
                    <h4 className="font-bold text-setasplast-dark mb-3 flex items-center">
                      <FaShieldAlt className="text-setasplast mr-2" />
                      Compromiso de Protección
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Nuestros datos personales son recolectados, almacenados, utilizados, compartidos y tratados 
                      de forma segura, siguiendo los más altos estándares de protección y confidencialidad.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                      <FaMapMarkerAlt className="text-gray-600 mr-2" />
                      Información de la Empresa
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Razón Social:</p>
                        <p className="font-semibold text-gray-900">SETASPLAST BIC S.A.S.</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Dirección:</p>
                        <p className="font-semibold text-gray-900">Calle 64 N° 113 a – 32, Bogotá D.C.</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Correo Habeas Data:</p>
                        <p className="font-semibold text-gray-900">habeasdata@setasplast.com.co</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Sitio Web:</p>
                        <p className="font-semibold text-gray-900">https://setasplast.com.co/</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* FINALIDADES */}
          {activeSection === 'finalidades' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-setasplast-dark mb-4">
                  Finalidades del Tratamiento
                </h3>
                <p className="text-lg text-gray-600">
                  Tus datos personales serán utilizados para las siguientes finalidades:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {finalidades.map((finalidad, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div className="flex items-start">
                      <div className="bg-setasplast/10 p-3 rounded-lg mr-4 flex-shrink-0">
                        <finalidad.icon className="text-setasplast text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="bg-setasplast text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                            {finalidad.numero}
                          </span>
                          <h4 className="font-bold text-setasplast-dark">
                            {finalidad.titulo}
                          </h4>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {finalidad.descripcion}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Finalidades adicionales */}
              <motion.div
                className="bg-gradient-to-r from-setasplast/10 to-green-50 rounded-2xl p-8 border border-setasplast/20"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-setasplast-dark mb-4 text-xl">
                  Finalidades Adicionales
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-setasplast mr-2" />
                    <span>Cumplir obligaciones empresariales</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-setasplast mr-2" />
                    <span>Expedir certificaciones comerciales</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-setasplast mr-2" />
                    <span>Monitoreo de seguridad (máx. 1 año)</span>
                  </div>
                  <div className="flex items-center">
                    <FaCheckCircle className="text-setasplast mr-2" />
                    <span>Cualquier finalidad según el vínculo generado</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* DERECHOS */}
          {activeSection === 'derechos' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-setasplast-dark mb-4">
                  Derechos del Titular
                </h3>
                <p className="text-lg text-gray-600">
                  Como titular de datos personales, tienes los siguientes derechos:
                </p>
              </div>

              <div className="space-y-6">
                {derechos.map((derecho, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center">
                      <div 
                        className="p-4 rounded-xl mr-6"
                        style={{ backgroundColor: `${derecho.color}15`, color: derecho.color }}
                      >
                        <derecho.icon className="text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-setasplast-dark mb-2">
                          {derecho.derecho}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {derecho.descripcion}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Aviso importante */}
              <motion.div
                className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <FaExclamationTriangle className="text-yellow-600 text-2xl mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-yellow-800 mb-2">
                      Importante - Artículo 9 del Decreto 1377 de 2013
                    </h4>
                    <p className="text-yellow-700 leading-relaxed">
                      La solicitud de supresión de la información y la revocatoria de la autorización 
                      <strong> no procederán</strong> cuando el Titular tenga un deber legal o contractual 
                      de permanecer en la base de datos.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* SEGURIDAD */}
          {activeSection === 'seguridad' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-setasplast/10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-setasplast/10 rounded-full mb-6">
                    <FaLock className="text-4xl text-setasplast" />
                  </div>
                  <h3 className="text-3xl font-bold text-setasplast-dark mb-4">
                    Medidas de Seguridad
                  </h3>
                  <p className="text-lg text-gray-600">
                    Implementamos las mejores prácticas para proteger tus datos
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="bg-setasplast/5 rounded-xl p-6 border border-setasplast/20">
                      <h4 className="font-bold text-setasplast-dark mb-3 flex items-center">
                        <FaShieldAlt className="text-setasplast mr-2" />
                        Protección Técnica
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-setasplast mr-2 text-sm" />
                          Encriptación de datos en tránsito y reposo
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-setasplast mr-2 text-sm" />
                          Firewalls y sistemas de detección
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-setasplast mr-2 text-sm" />
                          Backups seguros y redundantes
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                        <FaUsers className="text-blue-600 mr-2" />
                        Protección Administrativa
                      </h4>
                      <ul className="space-y-2 text-blue-800">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-600 mr-2 text-sm" />
                          Capacitación continua del personal
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-600 mr-2 text-sm" />
                          Controles de acceso basados en roles
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-blue-600 mr-2 text-sm" />
                          Auditorías periódicas de seguridad
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <h4 className="font-bold text-green-900 mb-3 flex items-center">
                        <FaGlobe className="text-green-600 mr-2" />
                        Transferencias Internacionales
                      </h4>
                      <p className="text-green-800 text-sm leading-relaxed">
                        Los datos personales pueden ser compartidos con terceros ubicados en Colombia 
                        y en el exterior mediante Contratos para la Transferencia y/o Transmisión de 
                        Datos Personales, manteniendo los estándares de seguridad aplicables.
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                        <FaClock className="text-purple-600 mr-2" />
                        Tiempos de Retención
                      </h4>
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li className="flex items-center">
                          <FaCheckCircle className="text-purple-600 mr-2 text-xs" />
                          Grabaciones de seguridad: máximo 1 año
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-purple-600 mr-2 text-xs" />
                          Datos comerciales: según relación contractual
                        </li>
                        <li className="flex items-center">
                          <FaCheckCircle className="text-purple-600 mr-2 text-xs" />
                          PQR: según normativa vigente
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* CONTACTO */}
          {activeSection === 'contacto' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-setasplast-dark mb-4">
                  Contacto para Habeas Data
                </h3>
                <p className="text-lg text-gray-600">
                  Canales oficiales para ejercer tus derechos sobre datos personales
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h4 className="font-bold text-setasplast-dark mb-6 flex items-center text-xl">
                    <FaMapMarkerAlt className="text-setasplast mr-3" />
                    Oficina Principal
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-setasplast/10 p-2 rounded-lg mr-3 mt-1">
                        <FaMapMarkerAlt className="text-setasplast" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Dirección Principal:</p>
                        <p className="text-gray-600">Calle 64 N° 113 a – 32</p>
                        <p className="text-gray-600">Bogotá D.C., Colombia</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-setasplast/10 p-2 rounded-lg mr-3 mt-1">
                        <FaMapMarkerAlt className="text-setasplast" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Oficina Alternativa:</p>
                        <p className="text-gray-600">Calle 55 a Sur # 64 - 14 Oficina 201</p>
                        <p className="text-gray-600">Bogotá D.C., Colombia</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-setasplast/10 p-2 rounded-lg mr-3">
                        <FaEnvelope className="text-setasplast" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Email Habeas Data:</p>
                        <a 
                          href="mailto:habeasdata@setasplast.com.co"
                          className="text-setasplast hover:text-setasplast-dark transition-colors duration-200"
                        >
                          habeasdata@setasplast.com.co
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-setasplast/10 p-2 rounded-lg mr-3">
                        <FaGlobe className="text-setasplast" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Sitio Web:</p>
                        <a 
                          href="https://setasplast.com.co/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-setasplast hover:text-setasplast-dark transition-colors duration-200"
                        >
                          https://setasplast.com.co/
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-setasplast/10 to-blue-50 rounded-2xl p-8 border border-setasplast/20">
                  <h4 className="font-bold text-setasplast-dark mb-6 flex items-center text-xl">
                    <FaFileContract className="text-setasplast mr-3" />
                    Cómo Ejercer tus Derechos
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white/70 rounded-lg p-4">
                      <h5 className="font-semibold text-setasplast-dark mb-2">1. Solicitud Escrita</h5>
                      <p className="text-sm text-gray-700">
                        Envía tu solicitud por correo electrónico o entrégala personalmente en nuestras oficinas.
                      </p>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h5 className="font-semibold text-setasplast-dark mb-2">2. Información Requerida</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Nombre completo y documento de identidad</li>
                        <li>• Descripción clara de la solicitud</li>
                        <li>• Datos de contacto actualizados</li>
                        <li>• Copia del documento de identidad</li>
                      </ul>
                    </div>

                    <div className="bg-white/70 rounded-lg p-4">
                      <h5 className="font-semibold text-setasplast-dark mb-2">3. Tiempo de Respuesta</h5>
                      <p className="text-sm text-gray-700">
                        Responderemos tu solicitud en un plazo máximo de 15 días hábiles desde su recepción.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Formulario de autorización */}
        <motion.div
          className="mt-16 bg-gradient-setasplast rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <FaUserShield className="text-5xl mx-auto mb-4 text-green-200" />
            <h3 className="text-3xl font-bold mb-4">
              Autorización para el Tratamiento de Datos Personales
            </h3>
            <p className="text-green-100 max-w-3xl mx-auto leading-relaxed">
              Al interactuar con nuestros servicios, confirmas que has leído y comprendido nuestra política de privacidad.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-5 w-5 text-setasplast focus:ring-setasplast border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="ml-3 text-sm text-green-100 leading-relaxed">
                  <strong className="text-white">Autorizo expresamente</strong> a SETASPLAST BIC S.A.S. 
                  para el tratamiento de mis datos personales, incluyendo la transferencia y transmisión 
                  internacional, dentro de las finalidades comunicadas en esta política de privacidad y 
                  en el manual de políticas de protección de datos personales.
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  acceptedTerms 
                    ? 'bg-white text-setasplast hover:bg-green-50' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
                disabled={!acceptedTerms}
                whileHover={acceptedTerms ? { scale: 1.05 } : {}}
                whileTap={acceptedTerms ? { scale: 0.95 } : {}}
              >
                <FaCheckCircle className="inline mr-2" />
                Acepto los Términos
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-setasplast transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="inline mr-2" />
                Descargar Política
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;