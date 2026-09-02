import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate } from 'react-icons/fa';
import { useGetCertificaciones, type Certificacion } from '../hook/useGetCertificaciones';

const CertificationCard = ({ cert }: { cert: Certificacion }) => (
  <div
    className="relative w-[300px] lg:w-[340px] shrink-0 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
  >
    {/* Fondo con color de la certificación */}
    <div
      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
      style={{ backgroundColor: cert.bgColor }}
    />

    {/* Indicador de estado activo */}
    {cert.activo && (
      <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500 shadow-lg" />
    )}

    <div className="relative p-5 flex flex-col items-center h-full">
      {/* Logo */}
      <div className="p-2 rounded-3xl bg-white shadow-xl border border-gray-200 mb-4">
        <img
          src={cert.logo}
          alt={`Logo ${cert.title}`}
          className="w-32 h-32 lg:w-36 lg:h-36 object-contain"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className =
              'w-32 h-32 lg:w-36 lg:h-36 flex items-center justify-center text-lg font-bold rounded-lg';
            fallback.style.backgroundColor = cert.bgColor;
            fallback.style.color = cert.color;
            fallback.textContent = cert.title.substring(0, 4);
            target.parentNode?.appendChild(fallback);
          }}
        />
      </div>

      {/* Título y subtítulo */}
      <h3 className="text-lg lg:text-xl font-bold mb-1 text-center" style={{ color: cert.color }}>
        {cert.title}
      </h3>
      <p className="text-setasplast-dark font-semibold text-xs mb-2 text-center">
        {cert.subtitle}
      </p>
      <p className="text-gray-600 text-xs leading-relaxed text-center line-clamp-4">
        {cert.description}
      </p>
    </div>
  </div>
);

const CertificationsSection = () => {
  const { certificaciones, loading, error } = useGetCertificaciones();

  // Solo animamos el slider cuando hay suficientes tarjetas para llenar el ancho.
  // Con pocos registros se muestran centrados y estáticos (sin duplicar).
  const MIN_PARA_LOOP = 4;
  const debeAnimar = certificaciones.length >= MIN_PARA_LOOP;
  // Duplicamos la lista para lograr el bucle infinito sin cortes
  const loopItems = debeAnimar
    ? [...certificaciones, ...certificaciones]
    : certificaciones;
  const marqueeDuration = `${Math.max(certificaciones.length * 6, 20)}s`;

  return (
    <section
      id="certifications"
      className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-setasplast/5 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-500/5 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la sección */}
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
            <span className="text-setasplast-dark font-semibold text-sm">
              Alianzas y Certificaciones
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-setasplast-dark mb-4">
            Nuestros <span className="text-setasplast">Respaldos</span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Las <span className="text-setasplast font-semibold">alianzas estratégicas</span> y{' '}
            <span className="text-green-600 font-semibold">certificaciones</span> que respaldan
            nuestro compromiso con la{' '}
            <span className="text-setasplast-dark font-semibold">calidad</span> y la mejora
            continua.
          </p>
        </motion.div>

        {/* Estados de carga / error */}
        {loading && (
          <div className="text-center py-16 text-gray-500">Cargando respaldos...</div>
        )}
        {error && (
          <div className="text-center py-16 text-red-500">
            Error al cargar los respaldos: {error}
          </div>
        )}

        {/* Slider infinito */}
        {!loading && !error && certificaciones.length > 0 && (
          <motion.div
            className="marquee-pause relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {debeAnimar && (
              <>
                {/* Difuminado en los bordes */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-green-50 to-transparent" />
              </>
            )}

            <div
              className={
                debeAnimar
                  ? 'flex gap-6 w-max animate-marquee-x py-4'
                  : 'flex flex-wrap justify-center gap-6 py-4'
              }
              style={{ '--marquee-duration': marqueeDuration } as CSSProperties}
            >
              {loopItems.map((cert, index) => (
                <CertificationCard key={`${cert.id}-${index}`} cert={cert} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
