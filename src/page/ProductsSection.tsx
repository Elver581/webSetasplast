import  { useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

import { 
  FaBoxes, 
  FaRecycle, 
  FaIndustry, 
  FaLeaf,
  FaShoppingBag,
  FaWarehouse,
  FaCogs,
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaWhatsapp,
  FaStar,
  FaAward,
  FaCertificate
} from 'react-icons/fa';
import img1 from '../assets/tienda/biodegradables/7.png';
import img2 from '../assets/tienda/biodegradables/4.png';
import img3 from '../assets/tienda/reciclables/1.png';
import img4 from '../assets/tienda/biodegradables/5.png';
import img5  from '../assets/tienda/biodegradables/6.png';
import img6 from '../assets/tienda/reciclables/2.png';
import img7 from '../assets/tienda/mascotas/1.png';
import img8 from '../assets/tienda/reciclables/8.png';



interface Category {
  id: string;
  label: string;
  icon: IconType;
}

interface Product {
  id: number;
  name: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
  applications: string[];
  price: string;
  certification: string;
  sustainability: string;
  color: string;
  popular: boolean;
}

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Categorías de productos
  const categories: Category[] = [
    { id: 'todos', label: 'Todos los Productos', icon: FaBoxes },
    { id: 'bolsas', label: 'Bolsas y Empaques', icon: FaShoppingBag },
    { id: 'reciclables', label: 'Línea de material 100 % recuperado', icon: FaIndustry },
    { id: 'sostenibles', label: 'Línea Sostenible', icon: FaLeaf },
    { id: 'personalizados', label: 'Personalizados', icon: FaCogs },
    { id: 'mascotas', label: 'Línea de Mascotas', icon: FaWarehouse }
  ];

  // Productos principales
  const products: Product[] = [
    {
      id: 1,
      name: 'Bolsas Biodegradables',
      category: 'bolsas',
      shortDesc: 'Bolsas 100% biodegradables para uso comercial',
      fullDesc: 'Bolsas fabricadas con materiales biodegradables de alta calidad, perfectas para comercios que buscan reducir su impacto ambiental.',
      image: img1,
      features: ['100% Biodegradable', 'Resistencia Superior', 'Certificación Ambiental', 'Múltiples Tamaños'],
      applications: ['Supermercados', 'Tiendas', 'Restaurantes', 'Farmacias'],
        price: 'Cotización por volumen',
      certification: 'ISO 14001',
      sustainability: '95% menos impacto ambiental',
      color: '#22c55e',
      popular: true
    },
    {
      id: 2,
      name: 'Films Reciclables recolecion de residuos',
      category: 'reciclables',
      shortDesc: 'Bolsas recolecion de residuos de matererial 100% recuperado',
      fullDesc: 'Films diseñados para aplicaciones industriales, ofreciendo protección y durabilidad mientras promueven el reciclaje y la sostenibilidad.',
      image: img3,
      features: ['Alta Resistencia', 'Protección UV', 'Sellado Hermético', 'Reutilizable'],
      applications: ['Industria Química', 'Alimentos', 'Farmacéutica', 'Automotriz'],
      price: 'Cotización por volumen',
      certification: 'ISO 9001',
      sustainability: 'Material reciclable',
      color: '#198754',
      popular: false
    },
    {
      id: 3,
      name: 'Bolsas Reutilizables',
      category: 'sostenibles',
      shortDesc: 'Bolsas de larga duración y eco-amigables',
      fullDesc: 'Bolsas diseñadas para múltiples usos, fabricadas con materiales sostenibles que reducen significativamente los residuos.',
      image: img2,
      features: ['Larga Duración', 'Lavable', 'Plegable', 'Diseños Atractivos'],
      applications: ['Retail', 'Promocionales', 'Eventos', 'Uso Personal'],
         price: 'Cotización por volumen',
      certification: 'Empresa BIC',
      sustainability: '1000+ usos por bolsa',
      color: '#20c997',
      popular: true
    },
    {
      id: 4,
      name: 'Empaques Personalizados',
      category: 'personalizados',
      shortDesc: 'Diseños únicos para tu marca',
      fullDesc: 'Soluciones de empaque completamente personalizadas con tu branding, colores y especificaciones técnicas.',
      image: img4,
      features: ['Diseño Exclusivo', 'Branding Completo', 'Múltiples Materiales', 'Prototipado'],
      applications: ['E-commerce', 'Retail Premium', 'Gifts', 'Corporativo'],
          price: 'Cotización por volumen',
      certification: 'Diseño Registrado',
      sustainability: 'Materiales a elección',
      color: '#146c43',
      popular: false
    },
    {
      id: 5,
      name: 'Bolsas Compostables',
      category: 'sostenibles',
      shortDesc: 'Se descomponen naturalmente',
      fullDesc: 'Bolsas que se descomponen completamente en compost doméstico, contribuyendo a la economía circular.',
      image: img5,
      features: ['Compostable', 'Sin Residuos Tóxicos', 'Certificación Internacional', 'Tiempos Controlados'],
      applications: ['Orgánicos', 'Jardinería', 'Restaurantes', 'Hogares Sostenibles'],
           price: 'Cotización por volumen',
      certification: 'EN 13432',
      sustainability: 'Compost en 90 días',
      color: '#22c55e',
      popular: true
    },
    {
      id: 6,
      name: 'Films Reciclables Industriales',
      category: 'reciclables',
      shortDesc: 'Films especializados para protección industrial,hoteleria,restarantes y supermercados',
      fullDesc: 'Films especializados para protección industrial, paletizado y conservación de productos durante largos periodos.',
      image: img6,
      features: ['Alta Durabilidad', 'Resistencia a la Rotura'],
      applications: ['Paletizado', 'Conservación', 'Transporte', 'Almacenamiento'],
      price: 'Cotización por volumen',
      certification: 'FDA Approved',
      sustainability: 'Reciclable 100%',
      color: '#198754',
      popular: false
    },

    {
      id: 7,
      name: 'Kits para Mascotas',
      category: 'mascotas',
      shortDesc: 'Soluciones de empaque para productos de mascotas',
      fullDesc: 'Kits completos de empaques diseñados específicamente para productos de mascotas, asegurando frescura y atractivo visual.',
      image: img7,
      features: ['Diseño Atractivo', 'Material Seguro para Mascotas', 'Fácil de Usar', 'Variedad de Tamaños'],
      applications: ['Alimentos para Mascotas', 'Juguetes', 'Accesorios', 'Productos de Cuidado'],
      price: 'Cotización por volumen',
      certification: 'ISO 22000',
      sustainability: 'Materiales eco-amigables',
      color: '#20c997',
      popular: true
    },
    {
    
      id: 8,
      name: 'Bolsas Reciclables',
      category: 'personalizados',
      shortDesc: 'Bolsas hechas de materiales reciclados',
      fullDesc: 'Bolsas fabricadas con materiales 100% reciclados, ideales para consumidores conscientes del medio ambiente.',
      image: img8,
      features: ['100% Recicladas', 'Durabilidad Mejorada', 'Variedad de Colores', 'Ecológicas'],
      applications: ['Compras Diarias', 'Eventos', 'Promocionales', 'Uso Personal'],
       price: 'Cotización por volumen',
      certification: 'ISO 14001',
      sustainability: 'Reduce residuos plásticos',
      color: '#22c55e',
      popular: false  
    }



  ];

  // Filtrar productos por categoría
  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <section id="productos" className="py-16 lg:py-24 bg-gradient-to-br from-white via-green-50/20 to-gray-50 relative overflow-hidden">
      
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
            <FaBoxes className="text-setasplast mr-2" />
            <span className="text-setasplast-dark font-semibold text-sm">Productos Sostenibles</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-setasplast-dark mb-6">
            Soluciones <span className="text-setasplast">Innovadoras</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra amplia gama de 
            <span className="text-setasplast font-semibold"> productos plásticos de alta calidad</span>, 
            diseñados con 
            <span className="text-green-600 font-semibold"> tecnología sostenible</span> y 
            <span className="text-setasplast-dark font-semibold"> certificaciones internacionales</span>.
          </p>
        </motion.div>

        {/* Filtros de categorías */}
        <motion.div 
          className="flex flex-wrap justify-center mb-12 bg-white/70 backdrop-blur-sm rounded-2xl p-2 border border-setasplast/10 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-4 lg:px-6 py-3 m-1 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-setasplast text-white shadow-lg'
                  : 'text-setasplast-dark hover:bg-setasplast/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="mr-2" />
              <span className="hidden sm:inline">{category.label}</span>
              <span className="sm:hidden">{category.label.split(' ')[0]}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Grid de productos */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          layout
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="relative group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              layout
            >
              
              {/* Badge popular */}
              {product.popular && (
                <div className="absolute top-4 left-4 z-20">
                  <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaStar className="mr-1" />
                    Popular
                  </motion.div>
                </div>
              )}

              {/* Imagen del producto */}
           {/* Imagen del producto */}
<div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
  {/* Imagen real */}
  <motion.img
    src={product.image}
    alt={product.name}
    className="absolute inset-0 w-full h-full object-cover"
    initial={{ scale: 1 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.5 }}
  />

  {/* Capa de color semitransparente con animación */}
  <motion.div
    className="absolute inset-0"
    style={{ backgroundColor: `${product.color}10` }}
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 0.3 }}
    transition={{ duration: 0.3 }}
  />

  {/* Overlay con información adicional */}
  <motion.div
    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    initial={{ opacity: 0 }}
    whileHover={{ opacity: 1 }}
  >
    <div className="text-white text-center p-4">
      <h4 className="font-bold mb-2">Aplicaciones:</h4>
      <div className="space-y-1">
        {product.applications.slice(0, 3).map((app, idx) => (
          <div key={idx} className="text-sm bg-white/20 rounded px-2 py-1">
            {app}
          </div>
        ))}
      </div>
    </div>
  </motion.div>
</div>

              {/* Contenido */}
              <div className="p-6">
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-setasplast-dark mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.shortDesc}
                    </p>
                  </div>
                  
                  <motion.div
                    className="flex items-center space-x-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaCertificate className="text-setasplast" />
                    <span className="text-xs text-setasplast font-semibold">
                      {product.certification}
                    </span>
                  </motion.div>
                </div>

                {/* Características principales */}
                <div className="space-y-2 mb-4">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + idx * 0.1 }}
                    >
                      <FaCheckCircle 
                        className="text-green-500 mr-2 flex-shrink-0" 
                        style={{ fontSize: '12px' }} 
                      />
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Sostenibilidad */}
                <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-100">
                  <div className="flex items-center mb-1">
                    <FaLeaf className="text-green-600 mr-2" />
                    <span className="text-sm font-semibold text-green-800">Impacto Ambiental</span>
                  </div>
                  <p className="text-xs text-green-700">{product.sustainability}</p>
                </div>

                {/* Precio y acciones */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-setasplast font-bold">{product.price}</p>
                    <p className="text-xs text-gray-500">*Precios por volumen</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <motion.button
                      className="bg-setasplast/10 text-setasplast p-2 rounded-lg hover:bg-setasplast hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Más información"
                    >
                      <FaArrowRight className="text-sm" />
                    </motion.button>
                    
                    <motion.button
                  
                      className="bg-green-500/10 text-green-600 p-2 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Contactar por WhatsApp"
                    >
                      <FaWhatsapp className="text-sm" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Información expandida al hacer hover */}
              {hoveredProduct === product.id && (
                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-white border-t border-gray-200 p-4 z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {product.fullDesc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-setasplast/10 text-setasplast px-2 py-1 rounded-full"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Estadísticas de productos */}
        <motion.div 
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { 
              number: '50+', 
              label: 'Productos Disponibles', 
              icon: FaBoxes,
              color: '#198754'
            },
            { 
              number: '100%', 
              label: 'Certificación de Calidad', 
              icon: FaAward,
              color: '#22c55e'
            },
            { 
              number: '25+', 
              label: 'Años de Experiencia', 
              icon: FaIndustry,
              color: '#20c997'
            },
            { 
              number: '95%', 
              label: 'Productos Sostenibles', 
              icon: FaRecycle,
              color: '#146c43'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-setasplast/20 group"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.9)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon 
                  className="text-4xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" 
                  style={{ color: stat.color }}
                />
              </motion.div>
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-[#198754] to-[#0F3F2A]
 rounded-2xl p-8 lg:p-12 text-white">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-4">
                ¿Necesitas una Solución Personalizada?
              </h3>
              <p className="text-green-100 mb-8 text-lg max-w-2xl mx-auto">
                Nuestro equipo de expertos puede desarrollar productos específicos para tu industria. 
                Desde el diseño hasta la producción, te acompañamos en todo el proceso.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-white text-setasplast px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-green-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPhone />
                  <span>Solicitar Cotización</span>
                </motion.button>
                
                <motion.button
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-white hover:text-setasplast transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaWhatsapp />
                  <span>Chat WhatsApp</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;