
import { motion } from 'framer-motion';

import {useForm} from '../hook/useForm'
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp,
  FaClock,
  FaBuilding,
  FaPaperPlane,
  FaUser,
  FaComment,

} from 'react-icons/fa';

const ContactSection = () => {
  const {
    nombreRef,
    empresaRef,
    emailRef,
    telefonoRef,
    mensajeRef,
    aceptarTerminosRef,
    error,
    errorTerminos,
    enviarDatos
  } = useForm();

  // Información de contacto
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Dirección Principal',
      content: 'Bogotá D.C., Colombia',
      detail: '',
      color: '#198754'
    },
    {
      icon: FaPhone,
      title: 'Teléfono',
      content: '+57 3112890067',
      detail: 'Lun - Vie: 8:00 AM - 6:00 PM',
      color: '#20c997'
    },
    {
      icon: FaEnvelope,
      title: 'Email Comercial',
      content: 'comercialsetasplast@gmail.com',
      detail: 'Respuestas en 24 horas',
      color: '#22c55e'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      content: '+57 3112890067',
      detail: 'Atención inmediata',
      color: '#25d366'
    }
  ];



 

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 -right-20 w-60 h-60 bg-setasplast/5 rounded-full"
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
            <FaPaperPlane className="text-setasplast mr-2" />
            <span className="text-setasplast-dark font-semibold text-sm">Contáctanos</span>
          </motion.div>

     <h2 className="text-4xl lg:text-5xl font-bold text-setasplast-dark mb-6">
  Conectemos tu <span className="text-setasplast">Proyecto</span> con Soluciones Reales
</h2>

<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
  En <span className="font-semibold text-setasplast">SetasPlast S.A.S BIC</span> ofrecemos soluciones plásticas sostenibles diseñadas para optimizar procesos, fortalecer tu cadena de valor y generar impacto positivo. 
  <span className="text-green-600 font-semibold"> Trabajemos juntos</span> en la creación de empaques eficientes, responsables y alineados con los objetivos de sostenibilidad de tu organización.
</p>

        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Información de contacto */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-setasplast/10">
              <h3 className="text-2xl font-bold text-setasplast-dark mb-6 flex items-center">
                <FaBuilding className="text-setasplast mr-3" />
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="group cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start">
                      <motion.div 
                        className="p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ backgroundColor: `${info.color}15`, color: info.color }}
                      >
                        <info.icon className="text-xl" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-setasplast-dark group-hover:text-setasplast transition-colors duration-300">
                          {info.title}
                        </h4>
                        <p className="text-gray-800 font-semibold">{info.content}</p>
                        <p className="text-sm text-gray-500">{info.detail}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Horarios de atención */}
              <motion.div 
                className="mt-8 p-4 bg-gradient-to-r from-setasplast/10 to-green-100/50 rounded-xl border-l-4 border-setasplast"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-2">
                  <FaClock className="text-setasplast mr-2" />
                  <h4 className="font-bold text-setasplast-dark">Horarios de Atención</h4>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Lunes - Viernes:</strong> 8:00 AM - 6:00 PM</p>
                  <p><strong>Sábados:</strong> 8:00 AM - 12:00 PM</p>
                  <p><strong>Domingos:</strong> Cerrado</p>
                  <p className="text-green-600 font-semibold mt-2">
                    <FaWhatsapp className="inline mr-1" />
                    WhatsApp 24/7 disponible
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-setasplast/10">
              <h3 className="text-2xl font-bold text-setasplast-dark mb-6 flex items-center">
                <FaPaperPlane className="text-setasplast mr-3" />
                Envíanos tu Mensaje
              </h3>

              <form onSubmit={enviarDatos} className="space-y-6">


                {/* Fila de nombre y email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id='nombre'
                        name="nombre"
                        ref={nombreRef}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-transparent transition-all duration-300 ${
                          error.nombre ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    {error.nombre && (
                      <p className="mt-1 text-sm text-red-600">{error.nombre}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        id='email'
                        ref={emailRef}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-transparent transition-all duration-300 ${
                          error.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="tu@email.com"
                      />
                    </div>
                    {error.email && (
                      <p className="mt-1 text-sm text-red-600">{error.email}</p>
                    )}
                  </div>
                </div>

                {/* Fila de teléfono y empresa */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        id='telefono'
                        name="telefono"
                        ref={telefonoRef}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-transparent transition-all duration-300 ${
                          error.telefono ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="+57 300 123 4567"
                      />
                    </div>
                    {error.telefono && (
                      <p className="mt-1 text-sm text-red-600">{error.telefono}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Empresa
                    </label>
                    <div className="relative">
                      <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="empresa"
                        id='empresa'
                        ref={empresaRef}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-setasplast focus:border-transparent transition-all duration-300"
                        placeholder="Nombre de tu empresa (opcional)"
                      />

                      <p className="mt-1 text-sm text-red-600">{error.empresa}</p>
                    </div>
                  </div>
                </div>

             
          
                
                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <div className="relative">
                    <FaComment className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="descripcion"
                      id='descripcion'
                      ref={mensajeRef}
                      rows={6}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-transparent transition-all duration-300 resize-none ${
                        error.descripcion ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Cuéntanos sobre tu proyecto, necesidades o consulta..."
                    />
                  </div>
                  {error.descripcion && (
                    <p className="mt-1 text-sm text-red-600">{error.descripcion}</p>
                  )}
               
                </div>
                
                {/* Botón de envío */}
                <motion.button
        
                  type="submit"
                  className="bg-setasplast text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-green-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPaperPlane />
                  <span>Enviar Mensaje</span>
                </motion.button>
              </form>
<div className="flex items-start">
  <input
    type="checkbox"
    ref={aceptarTerminosRef}
    className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
  />
  <label className="ml-3 text-sm text-gray-700">
    Autorizo el tratamiento de mis datos conforme a la{" "}
    <a href="#" className="text-setasplast underline">
      Política de Privacidad
    </a>.
  </label>
</div>

{errorTerminos && (
  <p className="text-sm text-red-600 mt-1">
    Debes aceptar los términos antes de enviar el mensaje.
  </p>
)}

              <div className="mt-6 p-4 bg-setasplast/5 rounded-xl border border-setasplast/20">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Tiempo de respuesta:</strong> Menos de 24 horas en días hábiles. 
                  Para consultas urgentes, contáctanos por WhatsApp.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mapa de ubicación */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-setasplast-dark mb-4">
              Nuestra Ubicación
            </h3>
            <p className="text-lg text-gray-600">
              Estamos estratégicamente ubicados en Bogotá para servir a todo Colombia
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-setasplast/10 overflow-hidden">
            {/* Google Maps Embed */}
            <div className="relative h-96 lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.95129003814!2d-74.3093813!3d4.648620199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1699123456789!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación SetasPlast - Bogotá, Colombia"
              />
              
              {/* Overlay con información */}
              <motion.div 
                className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-setasplast/20 max-w-xs"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start">
                  <div className="bg-setasplast/10 p-2 rounded-lg mr-3">
                    <FaMapMarkerAlt className="text-setasplast text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-setasplast-dark text-sm">SetasPlast SAS BIC</h4>
                    <p className="text-xs text-gray-600 mb-1">Bogotá D.C., Colombia</p>
                    <p className="text-xs text-gray-500">Zona Industrial</p>
                  </div>
                </div>
              </motion.div>

              {/* Botón para abrir en Google Maps */}
              <motion.a
                href="https://maps.google.com/?q=Bogotá,Colombia"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-setasplast text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg flex items-center space-x-2"
                whileHover={{ scale: 1.05, backgroundColor: "#146c43" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMapMarkerAlt />
                <span>Ver en Google Maps</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Call to action adicional */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-setasplast to-green-600 rounded-2xl p-8 text-white">
            <h4 className="text-2xl font-bold mb-4">
              ¿Necesitas una Cotización Rápida?
            </h4>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Contáctanos por WhatsApp para obtener una respuesta inmediata a tus consultas comerciales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://wa.me/573001234567?text=Hola%20SetasPlast,%20me%20interesa%20conocer%20más%20sobre%20sus%20productos"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-setasplast px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-green-50 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="text-xl" />
                <span>Chat por WhatsApp</span>
              </motion.a>
              
              <motion.a
                href="tel:+5712345678"
                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-white hover:text-setasplast transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone />
                <span>Llamar Ahora</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;