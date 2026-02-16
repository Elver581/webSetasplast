import React, { useState, useEffect } from "react";
import { FaArrowRight, FaTree, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import { ColombiaMap } from "./ColombiaMap"; 

import { Link } from "react-router-dom";


// ----------------------
// 🧩 Hook tipado: useCountAnimation
// ----------------------
const useCountAnimation = (
  target: number,
  duration: number = 2000
): [number, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | undefined;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function para suavizar animación
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (target - startValue) * easeOutQuart);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return [count, setIsVisible];
};


// ----------------------
// 🌱 Componente principal: HeroBanner
// ----------------------
const HeroBanner: React.FC = () => {
  // Estado para texto animado
  const [currentText, setCurrentText] = useState<number>(0);

  // Contadores animados
  const [treeCount, setTreeCountVisible] = useCountAnimation(1000, 2500);
  const [experienceCount, setExperienceVisible] = useCountAnimation(20, 2000);
  const [commitmentCount, setCommitmentVisible] = useCountAnimation(100, 1500);

  // Frases dinámicas
  const animatedTexts: string[] = [
    "Innovación en Plásticos",
    "Calidad Garantizada",
    "Sostenibilidad Ambiental",
    "1000 Árboles Sembrados",
    "Empresa BIC Certificada",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ----------------------
  // 🌿 Render principal
  // ----------------------
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-setasplast-dark via-setasplast to-green-900 animate-gradient-x"
     />
      <div className="absolute inset-0 "
     style={{
  background: `
     
    linear-gradient(145deg, #063d2d 0%, #0f5a3b 35%, #259f72 100%),
    radial-gradient(circle at top left, rgba(255,255,255,0.1), transparent 70%)
  `,
}}
 />

      {/* Hojas flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-300 opacity-20"
            animate={{
              x: [0, Math.random() * 50, 0],
              y: [0, Math.random() * 50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <FaLeaf className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-0">

          {/* Texto principal */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1 py-8 lg:py-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block bg-setasplast-dark bg-opacity-20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6 border border-green-400 border-opacity-30"
            >
              <span className="text-green-100 text-xs sm:text-sm font-medium">
                Empresa BIC Certificada
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              SETASPLAST
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-green-100 mt-2">
                SAS BIC
              </span>
            </motion.h1>

            {/* Texto rotativo */}
            <motion.div
              className="h-12 sm:h-16 mb-6 sm:mb-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h2
                key={currentText}
                className="text-lg sm:text-2xl lg:text-3xl font-semibold text-green-50"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {animatedTexts[currentText]}
              </motion.h2>
            </motion.div>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-green-50 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Líderes en la fabricación de productos plásticos de alta calidad.
              <span className="text-green-200 font-semibold"> Hemos sembrado 1000 árboles</span> en
              Bojacá y Girardot como parte de nuestro compromiso ambiental.
            </motion.p>

            {/* Botones */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link to="/productos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-setasplast-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-green-50 transition-all duration-300 shadow-xl flex items-center justify-center"
              >
                Ver Productos
                <FaArrowRight className="ml-2" />
              </motion.button>
              </Link>

              <Link to="/reforestacion">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-green-200 text-green-50 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-green-400 hover:text-setasplast-dark transition-all duration-300 flex items-center justify-center"
                >
                  <FaTree className="mr-2" />
                  Ver Reforestación
                </motion.button>
              </Link>
            </motion.div>

            {/* Contadores */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-green-300 border-opacity-30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              onViewportEnter={() => {
                setExperienceVisible(true);
                setTreeCountVisible(true);
                setCommitmentVisible(true);
              }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {experienceCount}+
                </div>
                <div className="text-green-100 text-xs sm:text-sm">Años de Experiencia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center">
                  {treeCount}
                  <FaTree className="ml-1 text-green-400 text-sm sm:text-base" />
                </div>
                <div className="text-green-100 text-xs sm:text-sm">Árboles Sembrados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {commitmentCount}%
                </div>
                <div className="text-green-100 text-xs sm:text-sm">Compromiso BIC</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mapa */}
          <motion.div
            className="relative order-1 lg:order-2 w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hidden sm:block">
              <ColombiaMap />
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
