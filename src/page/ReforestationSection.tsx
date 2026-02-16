import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTree, 
  FaMapMarkerAlt, 
  FaLeaf, 
  FaUsers, 
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaExpand,
  FaHeart,
  FaSeedling,
  FaGlobeAmericas,
  FaTimes
} from 'react-icons/fa';

// Importar todas las imágenes
import img1 from '../assets/siembrasimg/1.jpg';
import img2 from '../assets/siembrasimg/2.jpg';
import img3 from '../assets/siembrasimg/3.jpg';
import img4 from '../assets/siembrasimg/4.jpg';
import img5 from '../assets/siembrasimg/5.jpg';
import img6 from '../assets/siembrasimg/6.jpg';
import img7 from '../assets/siembrasimg/7.jpg';
import img8 from '../assets/siembrasimg/8.jpg';
import img9 from '../assets/siembrasimg/9.jpg';
import img10 from '../assets/siembrasimg/10.jpg';
import img11 from '../assets/siembrasimg/11.jpg';
import img12 from '../assets/siembrasimg/12.jpg';
import img13 from '../assets/siembrasimg/13.jpg';
import img14 from '../assets/siembrasimg/14.jpg';



interface imageData{
  image: string;
  title: string;
  description: string;
  location: string;
}
const ReforestationSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<imageData | null>(null);

  // Datos de las travesías ambientales
  const reforestationData = [
    {
      id: 1,
      image: img1,
      location: 'Bojacá, Cundinamarca',
      title: 'Travesía Ambiental - Fase 1',
      description: 'Inicio de nuestra primera jornada de reforestación en los cerros de Bojacá.',
      date: '2024-03-15',
      trees: 150,
      participants: 25
    },
    {
      id: 2,
      image: img2,
      location: 'Bojacá, Cundinamarca',
      title: 'Preparación del Terreno',
      description: 'Nuestro equipo preparando el suelo para garantizar el crecimiento óptimo.',
      date: '2024-03-15',
      trees: 150,
      participants: 25
    },
    {
      id: 3,
      image: img3,
      location: 'Bojacá, Cundinamarca',
      title: 'Siembra Colaborativa',
      description: 'Colaboradores de SetasPlast trabajando unidos por el medio ambiente.',
      date: '2024-03-16',
      trees: 200,
      participants: 30
    },
    {
      id: 4,
      image: img4,
      location: 'Girardot, Cundinamarca',
      title: 'Travesía Ambiental - Fase 2',
      description: 'Expansión de nuestro proyecto hacia la región de Girardot.',
      date: '2024-04-10',
      trees: 180,
      participants: 22
    },
    {
      id: 5,
      image: img5,
      location: 'Girardot, Cundinamarca',
      title: 'Especies Nativas',
      description: 'Plantación de especies nativas adaptadas al clima de la región.',
      date: '2024-04-10',
      trees: 180,
      participants: 22
    },
    {
      id: 6,
      image: img6,
      location: 'Bojacá, Cundinamarca',
      title: 'Cuidado y Mantenimiento',
      description: 'Seguimiento y cuidado de los árboles plantados en fases anteriores.',
      date: '2024-05-20',
      trees: 75,
      participants: 15
    },
    {
      id: 7,
      image: img7,
      location: 'Girardot, Cundinamarca',
      title: 'Jornada Familiar',
      description: 'Participación de familias SetasPlast en actividades de reforestación.',
      date: '2024-05-25',
      trees: 220,
      participants: 40
    },
    {
      id: 8,
      image: img8,
      location: 'Bojacá, Cundinamarca',
      title: 'Monitoreo de Crecimiento',
      description: 'Evaluación del progreso y crecimiento de los árboles plantados.',
      date: '2024-06-15',
      trees: 100,
      participants: 18
    },
    {
      id: 9,
      image: img9,
      location: 'Girardot, Cundinamarca',
      title: 'Expansión del Proyecto',
      description: 'Ampliación del área de reforestación hacia nuevas zonas.',
      date: '2024-07-08',
      trees: 190,
      participants: 28
    },
    {
      id: 10,
      image: img10,
      location: 'Bojacá, Cundinamarca',
      title: 'Educación Ambiental',
      description: 'Talleres de concientización ambiental para la comunidad local.',
      date: '2024-07-20',
      trees: 80,
      participants: 35
    },
    {
      id: 11,
      image: img11,
      location: 'Girardot, Cundinamarca',
      title: 'Alianza Comunitaria',
      description: 'Trabajo conjunto con líderes comunitarios locales.',
      date: '2024-08-12',
      trees: 160,
      participants: 45
    },
    {
      id: 12,
      image: img12,
      location: 'Bojacá, Cundinamarca',
      title: 'Proyecto Escolar',
      description: 'Participación de estudiantes locales en actividades ambientales.',
      date: '2024-08-25',
      trees: 120,
      participants: 50
    },
    {
      id: 13,
      image: img13,
      location: 'Girardot, Cundinamarca',
      title: 'Celebración de Logros',
      description: 'Reconocimiento de los avances en nuestra meta de 1000 árboles.',
      date: '2024-09-10',
      trees: 95,
      participants: 32
    },
    {
      id: 14,
      image: img14,
      location: 'Bojacá y Girardot',
      title: 'Meta Cumplida - 1000 Árboles',
      description: 'Celebración del cumplimiento de nuestra meta ambiental 2024.',
      date: '2024-09-28',
      trees: 1000,
      participants: 60
    }
  ];

  // AutoPlay functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reforestationData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, reforestationData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reforestationData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reforestationData.length) % reforestationData.length);
  };

 const openModal = (image: imageData) => {
  setSelectedImage(image);
  setIsModalOpen(true);
};


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const currentData = reforestationData[currentSlide];

  const totalParticipants = Math.max(...reforestationData.map(item => item.participants));

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -right-20 w-40 h-40 bg-green-200/30 rounded-full blur-xl"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 -left-20 w-60 h-60 bg-setasplast/10 rounded-full blur-xl"
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
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
            className="inline-flex items-center bg-setasplast/10 rounded-full px-6 py-2 mb-6 border border-setasplast/20"
            whileHover={{ scale: 1.05 }}
          >
            <FaTree className="text-setasplast mr-2" />
            <span className="text-setasplast font-semibold text-sm">Compromiso Ambiental</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Travesías <span className="text-setasplast">Ambientales</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nuestro compromiso con el planeta va más allá de las palabras. Descubre cómo hemos 
            transformado <span className="text-setasplast font-semibold">Bojacá y Girardot</span> 
            a través de jornadas de reforestación que unen a nuestro equipo con la naturaleza.
          </p>
        </motion.div>

        {/* Estadísticas principales */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { number: '1,000+', label: 'Árboles Plantados', icon: FaTree, color: 'text-green-600' },
            { number: '2', label: 'Ciudades Impactadas', icon: FaMapMarkerAlt, color: 'text-blue-600' },
            { number: `${totalParticipants}+`, label: 'Colaboradores Participantes', icon: FaUsers, color: 'text-purple-600' },
            { number: '14', label: 'Jornadas Realizadas', icon: FaCalendarAlt, color: 'text-setasplast' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <stat.icon className={`text-3xl ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carrusel principal */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
            
            {/* Imagen principal */}
            <div className="relative h-96 lg:h-[500px]">
              <motion.img
                key={currentSlide}
                src={currentData.image}
                alt={currentData.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                onClick={() => openModal(currentData)}
              />
              
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Controles de navegación */}
              <motion.button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight />
              </motion.button>

              {/* Control de autoplay */}
              <motion.button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isAutoPlay ? <FaPause /> : <FaPlay />}
              </motion.button>

              {/* Botón expandir */}
              <motion.button
                onClick={() => openModal(currentData)}
                className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExpand />
              </motion.button>

              {/* Información superpuesta */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white"
                >
                  <div className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2 text-green-400" />
                    <span className="text-sm font-medium text-green-200">{currentData.location}</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">{currentData.title}</h3>
                  <p className="text-lg text-gray-200 mb-4 max-w-2xl">{currentData.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <FaCalendarAlt className="mr-2 text-blue-300" />
                      <span>{new Date(currentData.date).toLocaleDateString('es-CO')}</span>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <FaSeedling className="mr-2 text-green-300" />
                      <span>{currentData.trees} árboles</span>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <FaUsers className="mr-2 text-purple-300" />
                      <span>{currentData.participants} participantes</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Indicadores de progreso */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {reforestationData.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Galería de miniaturas */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Galería de Travesías Ambientales
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {reforestationData.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative cursor-pointer rounded-xl overflow-hidden ${
                  index === currentSlide ? 'ring-4 ring-setasplast' : ''
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-20 lg:h-24 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-1 left-1 right-1">
                  <div className="text-xs text-white font-medium bg-black/50 rounded px-2 py-1">
                    {item.location.split(',')[0]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impacto y compromiso */}
        <motion.div
          className="bg-gradient-setasplast rounded-3xl p-8 lg:p-12 text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <FaGlobeAmericas className="text-6xl mx-auto mb-6 text-green-200" />
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            Nuestro Compromiso Continúa
          </h3>
          <p className="text-lg text-green-100 mb-8 max-w-3xl mx-auto">
            Con <strong>1,000 árboles plantados</strong> en 2024, hemos demostrado que el cambio real 
            comienza con acciones concretas. Cada árbol representa nuestro compromiso con las futuras 
            generaciones y la sostenibilidad del planeta.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: FaTree, text: 'CO₂ Capturado', value: '25 Ton/año' },
              { icon: FaLeaf, text: 'Oxígeno Generado', value: '18 Ton/año' },
              { icon: FaHeart, text: 'Vidas Impactadas', value: '5,000+' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="text-3xl mx-auto mb-3 text-green-200" />
                <div className="text-2xl font-bold mb-1">{item.value}</div>
                <div className="text-sm text-green-100">{item.text}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="inline-flex items-center bg-white text-setasplast px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSeedling className="mr-3" />
            Únete a Nuestra Próxima Travesía
          </motion.div>
        </motion.div>
      </div>

      {/* Modal de imagen ampliada */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] m-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-xl"
              />
              
              <motion.button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
                <h4 className="text-xl font-bold text-white mb-2">{selectedImage.title}</h4>
                <p className="text-gray-200 mb-2">{selectedImage.description}</p>
                <div className="flex items-center text-sm text-gray-300">
                  <FaMapMarkerAlt className="mr-2" />
                  {selectedImage.location}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReforestationSection;