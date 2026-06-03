import  { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHistory, 
  FaEye, 
  FaBullseye, 
  FaHeart,
  FaAward,
  FaLeaf,
  FaIndustry,
  FaUsers,
 
  FaTrophy,
  FaHandshake,
  FaRecycle,
  FaShieldAlt,
  FaDownload
} from 'react-icons/fa';

import { useGetReportesBic } from '../hook/useGetReportesBic';
import { API_BASE_URL } from '../api';


const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('historia');
const { reportes, loading, error } = useGetReportesBic();
  // Timeline de la historia
  const timeline = [
    {
      year: 2006,
      title: 'Fundación de SetasPlast',
      description: 'Inicio de operaciones con un enfoque en productos plásticos de calidad.',
      icon: FaIndustry,
      color: '#198754'
    },
    {
      year: 2015,
      title: 'Expansión Nacional',
      description: 'Crecimiento hacia mercados nacionales y diversificación de productos.',
      icon: FaTrophy,
      color: '#22c55e'
    },
    {
      year: 2020,
      title: 'Enfoque Sostenible',
      description: 'Implementación de procesos eco-amigables y reducción de impacto ambiental.',
      icon: FaLeaf,
      color: '#20c997'
    },
  
    {
      year: 2022,
      title: 'Empresa BIC Certificada',
      description: 'Transformación a Empresa de Beneficio e Interés Colectivo con compromiso ambiental.',
      icon: FaHeart,
      color: '#198754'
    },
    {
      year: 2024,
      title: '1000 Árboles Sembrados',
      description: 'Proyecto de reforestación en Bojacá y Girardot como parte del compromiso BIC.',
      icon: FaRecycle,
      color: '#22c55e'
    },
{
  year: 2025,
  title: 'Certificación ISO Integrada',
  description: 'Cumplimiento de las normas ISO 9001, 14001 y 45001: calidad, ambiente y seguridad ocupacional.',
  icon: FaAward,
  color: '#146c43'
},

  ];

  // Valores BIC
  const valuesBIC = [
    {
      title: 'Impacto Ambiental',
      description: 'Comprometidos con la reducción de nuestra huella de carbono mediante procesos sostenibles y reforestación.',
      icon: FaLeaf,
      color: '#22c55e',
      stats: '1000 árboles',
      detail: 'sembrados en 2024'
    },
    {
      title: 'Desarrollo Social',
      description: 'Fomentamos el bienestar de nuestros colaboradores y las comunidades donde operamos.',
      icon: FaUsers,
      color: '#20c997',
      stats: '100+',
      detail: 'empleos directos'
    },
    {
      title: 'Gobernanza Transparente',
      description: 'Operamos con transparencia, ética y responsabilidad en todas nuestras decisiones.',
      icon: FaShieldAlt,
      color: '#146c43',
      stats: '4',
      detail: 'certificaciones ISO'
    },
    {
      title: 'Innovación Responsable',
      description: 'Desarrollamos productos que satisfacen necesidades actuales sin comprometer el futuro.',
      icon: FaIndustry,
      color: '#198754',
      stats: '25+',
      detail: 'años innovando'
    }
  ];

  const tabs = [
    { id: 'historia', label: 'Historia', icon: FaHistory },
    { id: 'mision', label: 'Misión', icon: FaBullseye },
    { id: 'vision', label: 'Visión', icon: FaEye },
    { id: 'valores', label: 'Valores BIC', icon: FaHeart }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-green-50/30 to-gray-50 relative overflow-hidden">
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 -right-20 w-60 h-60 bg-setasplast/5 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-400/5 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado principal */}
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
            <FaHandshake className="text-setasplast mr-2" />
            <span className="text-setasplast-dark font-semibold text-sm">Conoce SetasPlast SAS BIC</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-setasplast-dark mb-6">
            20+ Años de <span className="text-setasplast">Excelencia</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Desde 2006, hemos evolucionado de una empresa familiar a una 
            <span className="text-setasplast font-semibold"> Empresa BIC certificada</span>, 
            liderando la industria del plástico con 
            <span className="text-green-600 font-semibold"> responsabilidad ambiental</span> y 
            <span className="text-setasplast-dark font-semibold"> compromiso social</span>.
          </p>
        </motion.div>

        {/* Navegación por pestañas */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-setasplast/10 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 m-1 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-setasplast text-white shadow-lg'
                  : 'text-setasplast-dark hover:bg-setasplast/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="mr-2" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Contenido de las pestañas */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[500px]"
        >
          
          {/* HISTORIA */}
          {activeTab === 'historia' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-setasplast-dark mb-4">
                  Nuestra Trayectoria
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Un recorrido de 20+ años marcado por la innovación, calidad y compromiso ambiental.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Línea central */}
           <motion.div
  className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full"
  initial={{ backgroundPosition: '0% 0%' }}
  animate={{ backgroundPosition: '0% 100%' }}
  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
  style={{
    backgroundImage: 'linear-gradient(to bottom, #198754, #22c55e, #20c997, #146c43)',
    backgroundSize: '100% 300%',
    backgroundRepeat: 'no-repeat'
  }}
/>

           {timeline.map((item, index) => (
  <motion.div
    key={index}
    className={`flex items-center mb-2 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    {/* Contenido del evento */}
    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
        transition={{ duration: 0.3 }}
      >
        <div className={`flex items-center mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
          <div 
            className="p-2 rounded-lg mr-3"
            style={{ backgroundColor: `${item.color}15`, color: item.color }}
          >
            <item.icon className="text-lg" />
          </div>
          <span className="text-2xl font-bold" style={{ color: item.color }}>
            {item.year}
          </span>
        </div>
        <h4 className="text-lg font-bold text-setasplast-dark mb-2">
          {item.title}
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          {item.description}
        </p>
      </motion.div>
    </div>

    {/* Punto central refinado */}
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full border-4 border-white shadow-lg hover:scale-150 transition-transform duration-200"
      style={{ backgroundColor: item.color }}
    />
  </motion.div>
))}

              </div>
            </div>
          )}

          {/* MISIÓN */}
          {activeTab === 'mision' && (
            <motion.div 
              className="text-center space-y-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-setasplast/20">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-setasplast/10 rounded-full mb-8"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaBullseye className="text-4xl text-setasplast" />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-setasplast-dark mb-6">
                  Nuestra Misión
                </h3>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
                  <span className="text-setasplast font-semibold">Distribuir a nuestros clientes productos plásticos elaborados a partir de materiales recuperados y biodegradables. Nos enfocamos en un modelo de producción y consumo que involucra compartir, alquilar, reutilizar, reparar, renovar</span>, 
                 y reciclar materiales y productos existentes, creando un valor añadido generando beneficios sociales, ambientales y económicos,
                  <span className="text-green-600 font-semibold"> a través de la protección del ambiente, la conservación de los recursos naturales y .</span> 
                  <span className="text-setasplast-dark font-semibold"> la contribución a la mitigación del cambio climático.</span>, 
          
                </p>

                {/* Pilares de la misión */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  {[
                    { title: 'Calidad Superior', icon: FaAward, desc: 'Productos que superan expectativas' },
                    { title: 'Sostenibilidad', icon: FaLeaf, desc: 'Procesos eco-responsables' },
                    { title: 'Valor Compartido', icon: FaUsers, desc: 'Beneficio para todos los stakeholders' }
                  ].map((pillar, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-setasplast/5 to-green-50 rounded-xl p-6 border border-setasplast/10"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <pillar.icon className="text-3xl text-setasplast mx-auto mb-3" />
                      <h4 className="font-bold text-setasplast-dark mb-2">{pillar.title}</h4>
                      <p className="text-sm text-gray-600">{pillar.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* VISIÓN */}
          {activeTab === 'vision' && (
            <motion.div 
              className="text-center space-y-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl p-12 shadow-2xl border border-setasplast/20">
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-8"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaEye className="text-4xl text-green-600" />
                </motion.div>
            <h3 className="text-3xl font-bold text-setasplast-dark mb-6">
                  Nuestra Visión
                </h3>
                
                <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
                  <span className="text-setasplast font-semibold">Para el año 2030, ser una compañía con expansión en ventas en el territorio nacional</span>, 
     y con sedes en los departamentos de Atlántico, Cundinamarca, Valle del Cauca, Risaralda y Antioquia, generando valor económico,  <span className="text-green-600 font-semibold">contribuimos positivamente al medio ambiente</span> y 
                  <span className="text-setasplast-dark font-semibold"> social y ambiental mediante la gestión de negocios innovadores y </span>, 
              con empleados motivados, buscando el éxito empresarial y personal.
                </p>

                {/* Metas 2030 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                  {[
                    { number: '5000', label: 'Árboles Sembrados', icon: FaLeaf, color: '#22c55e' },
                    { number: '0%', label: 'Emisiones Netas', icon: FaRecycle, color: '#20c997' },
                    { number: '3', label: 'Países de Presencia', icon: FaHandshake, color: '#198754' },
                    { number: '100%', label: 'Procesos Certificados', icon: FaAward, color: '#146c43' }
                  ].map((meta, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <meta.icon 
                        className="text-3xl mx-auto mb-3" 
                        style={{ color: meta.color }} 
                      />
                      <div className="text-2xl font-bold mb-1" style={{ color: meta.color }}>
                        {meta.number}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {meta.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* VALORES BIC */}
          {activeTab === 'valores' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-setasplast-dark mb-4">
                  Valores BIC
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Como Empresa de Beneficio e Interés Colectivo, nuestros valores guían cada decisión hacia un impacto positivo.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {valuesBIC.map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  >
                    {/* Fondo decorativo */}
                    <motion.div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5"
                      style={{ backgroundColor: value.color }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <motion.div
                          className="p-4 rounded-xl"
                          style={{ backgroundColor: `${value.color}15`, color: value.color }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <value.icon className="text-3xl" />
                        </motion.div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold" style={{ color: value.color }}>
                            {value.stats}
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            {value.detail}
                          </div>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-setasplast-dark mb-3">
                        {value.title}
                      </h4>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Certificación BIC destacada */}
              <motion.div
                className="bg-gradient-setasplast rounded-2xl p-8 text-white text-center mt-12"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <FaHeart className="text-4xl mx-auto mb-4 text-green-200" />
                <h4 className="text-2xl font-bold mb-4">
                  Empresa BIC Certificada
                </h4>
                <p className="text-green-100 max-w-2xl mx-auto leading-relaxed">
                  Nuestro compromiso con el triple impacto: económico, social y ambiental está 
                  respaldado por la certificación BIC, garantizando que nuestras decisiones 
                  empresariales generen valor compartido para todos los stakeholders.
                </p>
              </motion.div>

{/* Informes BIC dinámicos */}
<motion.div
  className="mt-16 text-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
>
  <h4 className="text-2xl font-bold text-setasplast-dark mb-4">
    Informes Anuales BIC
  </h4>
  <p className="text-gray-600 mb-8 max-w-xl mx-auto">
    Consulta y descarga nuestros informes de sostenibilidad, impacto social y ambiental como Empresa BIC.
  </p>

  {loading && <p className="text-gray-500">Cargando informes...</p>}
  {error && <p className="text-red-500">Error al cargar informes.</p>}

  <div className="flex flex-wrap justify-center gap-4">
    {reportes.map((reporte) => (
      <motion.a
        key={reporte.uuid}
        href={`${API_BASE_URL}/storage/${reporte.archivo_path}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white border border-setasplast text-setasplast-dark px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-setasplast hover:text-white transition-all duration-300 shadow-md"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaDownload className="text-lg" />
        <span>
          <span className="block text-xs opacity-70">{reporte.empresa.nombre}</span>
          {reporte.nombre} – {new Date(reporte.fecha_reporte).getFullYear()}
        </span>
      </motion.a>
    ))}
  </div>
</motion.div>



            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;