import  { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLaptopCode,
  FaDatabase,
  FaCogs,
  FaBoxes,
  FaBell,
  FaChartLine,
  FaFileAlt,
  FaUsers,
  FaShieldAlt,
  FaRocket,
  FaSignInAlt,
  FaEye,
  FaCloud,
  FaMobile,
  FaLock,
  FaSync
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InternalSoftwareSection = () => {
  const [activeModule, setActiveModule] = useState('gestion');

  const modules = [
    {
      id: 'gestion',
      title: 'Gestión Documental',
      description: 'Sistema completo de gestión y almacenamiento de documentos digitales',
      icon: FaFileAlt,
      color: '#198754',
      features: [
        'Digitalización automática de documentos',
        'Control de versiones y trazabilidad',
        'Flujos de aprobación personalizados',
        'Búsqueda avanzada con IA',
        'Firma digital certificada'
      ]
    },
    {
      id: 'procesos',
      title: 'Control de Procesos',
      description: 'Monitoreo y optimización de procesos industriales en tiempo real',
      icon: FaCogs,
      color: '#22c55e',
      features: [
        'Dashboard de control en tiempo real',
        'Automatización de procesos BPM',
        'Indicadores KPI personalizables',
        'Análisis predictivo de fallos',
        'Reportes automáticos de calidad'
      ]
    },
    {
      id: 'inventarios',
      title: 'Inventarios Inteligentes',
      description: 'Sistema avanzado de gestión y control de inventarios',
      icon: FaBoxes,
      color: '#20c997',
      features: [
        'Tracking por código QR/RFID',
        'Reabastecimiento automático',
        'Análisis de rotación ABC',
        'Integración con producción',
        'Optimización de almacenamiento'
      ]
    },
    {
      id: 'alertas',
      title: 'Alertas Tiempo Real',
      description: 'Sistema de notificaciones inteligentes y monitoreo continuo',
      icon: FaBell,
      color: '#146c43',
      features: [
        'Notificaciones push instantáneas',
        'Escalamiento automático de alertas',
        'Monitoreo 24/7 de equipos',
        'Alertas predictivas con IA',
        'Dashboard de incidencias'
      ]
    }
  ];

  const stats = [
    { number: '15+', label: 'Módulos Integrados', icon: FaCogs },
    { number: '99.9%', label: 'Uptime Garantizado', icon: FaRocket },
    { number: '24/7', label: 'Soporte Técnico', icon: FaUsers },
    { number: '256bit', label: 'Encriptación SSL', icon: FaShieldAlt }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#003B2E] via-[#1C1C1C] to-[#000000]
 to-setasplast-dark relative overflow-hidden">
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -right-20 w-60 h-60 bg-setasplast/5 rounded-full blur-xl"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-xl"
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
            <FaLaptopCode className="text-setasplast mr-2" />
            <span className="text-white font-semibold text-sm">Tecnología Interna</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Software <span className="text-setasplast">Nexus</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-setasplast font-semibold">Sistema Empresarial Integrado Avanzado</span> - 
            Nuestra plataforma propietaria que revoluciona la gestión industrial con 
            <span className="text-green-400 font-semibold"> inteligencia artificial</span>, 
            <span className="text-blue-400 font-semibold"> automatización</span> y 
            <span className="text-white font-semibold"> análisis predictivo</span>.
          </p>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <stat.icon className="text-3xl text-setasplast mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navegación de módulos */}
        <motion.div
          className="flex flex-wrap justify-center mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {modules.map((module) => (
            <motion.button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`flex items-center px-4 lg:px-6 py-3 m-1 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeModule === module.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              style={{ 
                backgroundColor: activeModule === module.id ? module.color : 'transparent'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <module.icon className="mr-2" />
              <span className="hidden sm:inline">{module.title}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Contenido del módulo activo */}
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {modules.map((module) => (
            activeModule === module.id && (
              <div key={module.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Información del módulo */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center mb-6">
                    <div 
                      className="p-4 rounded-2xl mr-4"
                      style={{ backgroundColor: `${module.color}20`, color: module.color }}
                    >
                      <module.icon className="text-4xl" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{module.title}</h3>
                      <p className="text-gray-300 mt-2">{module.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {module.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: module.color }}
                        />
                        <span className="text-gray-200 text-sm leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Vista previa del dashboard */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
                    {/* Header simulado */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div 
                          className="w-8 h-8 rounded-full mr-3"
                          style={{ backgroundColor: module.color }}
                        />
                        <div>
                          <h4 className="font-bold text-gray-800">Nexus Dashboard</h4>
                          <p className="text-xs text-gray-500">{module.title}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                      </div>
                    </div>

                    {/* Contenido simulado */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-4 h-4 bg-gray-300 rounded" />
                            <FaChartLine className="text-gray-400" />
                          </div>
                          <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-4 h-4 bg-gray-300 rounded" />
                            <FaDatabase className="text-gray-400" />
                          </div>
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded w-3/4" />
                            <div className="h-2 bg-gray-200 rounded w-1/2" />
                            <div className="h-2 bg-gray-200 rounded w-2/3" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center mb-3">
                          <module.icon 
                            className="text-lg mr-2"
                            style={{ color: module.color }}
                          />
                          <span className="text-sm font-medium text-gray-600">Estado del Sistema</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Operacional</span>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                            <span className="text-xs text-green-600 font-medium">En línea</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Elementos decorativos */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-setasplast/20 rounded-full blur-sm"
                    animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400/20 rounded-full blur-sm"
                    animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            )
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-[#198754] to-[#0F3F2A] rounded-2xl p-8 lg:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <FaRocket className="text-5xl mx-auto mb-6 text-green-200" />
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            ¿Eres parte del equipo SetasPlast?
          </h3>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Accede a Nexus y gestiona todos los procesos empresariales 
            desde una sola plataforma integrada con tecnología de vanguardia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="https://app.setas.etstechnolgy.com/"
              className="bg-white text-setasplast px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 inline-flex items-center shadow-lg"
            >
              <FaSignInAlt className="mr-3" />
              Acceder a Nexus
            </Link>
            
            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-setasplast transition-all duration-300 inline-flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye className="mr-3" />
              Ver Demo
            </motion.button>
          </div>

          <div className="mt-6 text-sm text-green-200">
            <FaLock className="inline mr-2" />
            Acceso seguro con autenticación de dos factores
          </div>
        </motion.div>

        {/* Características técnicas */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { 
              icon: FaCloud, 
              title: 'Cloud Native', 
              desc: 'Arquitectura en la nube con escalabilidad automática' 
            },
            { 
              icon: FaMobile, 
              title: 'Multi-dispositivo', 
              desc: 'Acceso desde cualquier dispositivo, en cualquier lugar' 
            },
            { 
              icon: FaSync, 
              title: 'Tiempo Real', 
              desc: 'Sincronización instantánea de datos empresariales' 
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <item.icon className="text-4xl text-setasplast mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InternalSoftwareSection;