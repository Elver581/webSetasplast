import React from "react";
import { motion } from "framer-motion"; // Agregar para animaciones suaves
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLeaf,
  FaCheckCircle,
  FaUser,
  FaBuilding,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import useForm from "../hook/useForm";
import eventBackground from "../../public/EVENT.png";

// Agregar interfaz para props
interface EventRegistrationFormProps {
  onSubmit?: (data: FormData) => void;
  isLoading?: boolean;
}

interface FormData {
  name: string;
  company: string;
  phone: string;
  email: string;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  isLoading = false,
}) => {

  const {error, registrarEvento} = useForm();
  console.log("error:", error);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const data = {
    name: formData.get("name") as string,
    company: formData.get("company") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
  };

  registrarEvento(data); // 👈 Llamada directa al hook
};

  return (
   <section className="relative min-h-screen bg-setasplast-dark text-white overflow-hidden flex flex-col items-center">
    {/* 🖼️ Hero con imagen y gradiente - ARREGLADO PARA MÓVILES */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-48 sm:h-56 md:h-64 bg-cover bg-center" // Reducido altura en móviles
      style={{
        backgroundImage: `url(${eventBackground})`,
        backgroundBlendMode: "multiply",
        backgroundColor: "rgba(10,50,40,0.8)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a3025]/90 to-transparent" />
      
      {/* Título reposicionado para móviles */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8">
        <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white drop-shadow-md leading-tight">
          XV Congreso de Sostenibilidad
        </h1>
        <p className="text-green-200 text-xs sm:text-sm md:text-base mt-1">
          El poder de la economía circular
        </p>
      </div>
    </motion.div>

    {/* 📖 Información del evento - AJUSTADO MARGEN SUPERIOR */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md text-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl mt-[-1rem] sm:mt-[-2rem] mx-4" // Ajustado margen negativo
    >
      <h2 className="text-lg sm:text-xl font-bold text-setasplast-dark text-center mb-2 sm:mb-3">
        Evento Empresarial Exclusivo
      </h2>
      <p className="text-gray-700 text-center text-xs sm:text-sm leading-relaxed">
        Participa con nosotros en el congreso más importante de sostenibilidad empresarial.
        <span className="text-setasplast font-semibold">
          {" "}
          Transformamos el residuo en recurso
        </span>{" "}
        a través de{" "}
        <span className="text-green-700 font-semibold">
          la economía circular.
        </span>
      </p>

      <div className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-5 text-xs sm:text-sm">
        <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2">
          <FaCalendarAlt className="text-xs" /> 2025
        </span>
        <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2">
          <FaMapMarkerAlt className="text-xs" /> Colombia
        </span>
        <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 sm:gap-2">
          <FaLeaf className="text-xs" /> Economía Circular
        </span>
      </div>
    </motion.div>

    {/* 📝 Formulario - AJUSTADO ESPACIADO */}
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      onSubmit={handleSubmit}
      className="w-full max-w-md mt-4 sm:mt-6 bg-white text-gray-800 rounded-2xl shadow-md p-4 sm:p-6 mx-4 space-y-4 sm:space-y-5 mb-8" // Agregado margin-bottom
    >
      {/* Nombre */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
          Nombre Completo *
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-setasplast text-sm" />
          <input
            type="text"
            name="name"
          
            placeholder="Tu nombre completo"
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-setasplast outline-none transition-all duration-200 text-sm sm:text-base"
          />
          {error.name && (
            <p className="text-red-500 text-xs mt-1">{error.name}</p>
          )}
        </div>
      </div>

      {/* Empresa */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Empresa *</label>
        <div className="relative">
          <FaBuilding className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-setasplast text-sm" />
          <input
            type="text"
            name="company"
          
            placeholder="Nombre de tu empresa"
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-setasplast outline-none transition-all duration-200 text-sm sm:text-base"
          />
          {error.company && (
            <p className="text-red-500 text-xs mt-1">{error.company}</p>
          )}
        </div>
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Teléfono *</label>
        <div className="relative">
          <FaPhone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-setasplast text-sm" />
          <input
            type="tel"
            name="phone"
           
            placeholder="+57 300 123 4567"
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-setasplast outline-none transition-all duration-200 text-sm sm:text-base"
          />
          {error.phone && (
            <p className="text-red-500 text-xs mt-1">{error.phone}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
          Email Corporativo *
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-setasplast text-sm" />
          <input
            type="email"
            name="email"
 
            placeholder="tu@empresa.com"
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-setasplast outline-none transition-all duration-200 text-sm sm:text-base"
          />
          {error.email && (
            <p className="text-red-500 text-xs mt-1">{error.email}</p>
          )}
        </div>
      </div>

      {/* Términos */}
      <div className="flex items-start space-x-2 sm:space-x-3 text-xs sm:text-sm bg-green-50 rounded-xl p-2.5 sm:p-3 border border-green-200">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          className="mt-0.5 sm:mt-1 accent-setasplast flex-shrink-0"
          required
        />
        <label htmlFor="terms" className="leading-relaxed">
          Acepto los{" "}
          <span className="text-setasplast font-semibold cursor-pointer hover:underline">
            términos y condiciones
          </span>{" "}
          del evento y autorizo el tratamiento de mis datos personales.
        </label>
      </div>

      {/* Botón con estado de loading */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-setasplast text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <motion.div
              className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-sm sm:text-base">Registrando...</span>
          </>
        ) : (
          <>
            <FaCheckCircle className="mr-2 text-sm sm:text-base" />
            <span className="text-sm sm:text-base">Confirmar Registro</span>
          </>
        )}
      </button>

      {/* Contacto */}
 
    </motion.form>
  </section>
  );
};

export default EventRegistrationForm;