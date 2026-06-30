import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFileDownload,
  FaFilePdf,
  FaClipboardList,
  FaLeaf,
  FaCalendarAlt,
  FaUsers,
  FaIndustry,
  FaShare,
} from "react-icons/fa";
import { useDocumentoCorporativo } from "../hook/useDocumentoCorporativo";

const CorporateDocumentsSection: React.FC = () => {
  const { documents, loading, error } = useDocumentoCorporativo();
  const [localDownloadCounts, setLocalDownloadCounts] = useState<Record<string, number>>({});

  const getDownloadCount = (docId: string, apiCount: number) =>
    apiCount + (localDownloadCounts[docId] ?? 0);

  const totalDownloads = documents.reduce(
    (sum, doc) => sum + getDownloadCount(doc.id, doc.downloadsCount),
    0
  );

  const handleDownload = (docId: string, downloadUrl: string) => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = documents.find((doc) => doc.id === docId)?.title ?? "documento";
    link.click();
    setLocalDownloadCounts((prev) => ({
      ...prev,
      [docId]: (prev[docId] ?? 0) + 1,
    }));
  };

  const copyToClipboard = async (url: string, docTitle: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert(`Enlace de "${docTitle}" copiado al portapapeles`);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert(`Enlace de "${docTitle}" copiado al portapapeles`);
    }
  };

  return (
    <section
      id="documentos"
      className="py-16 lg:py-24 bg-linear-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden"
    >
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
            <FaFilePdf className="text-setasplast mr-2" />
            <span className="text-setasplast-dark font-semibold text-sm">
              Documentación Corporativa
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-setasplast-dark mb-6">
            Centro de <span className="text-setasplast">Recursos</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Accede a nuestra documentación oficial, catálogos actualizados y
            certificaciones vigentes.{" "}
            <span className="text-setasplast font-semibold">Toda la información</span>{" "}
            que necesitas para{" "}
            <span className="text-green-600 font-semibold">conocer SetasPlast</span>{" "}
            en profundidad.
          </p>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { number: loading ? "..." : String(documents.length), label: "Documentos Disponibles", icon: FaFilePdf, color: "text-red-600" },

            { number: "99.8%", label: "Disponibilidad", icon: FaIndustry, color: "text-green-600" },
            { number: "24/7", label: "Acceso Continuo", icon: FaCalendarAlt, color: "text-setasplast" },
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

        {/* Estado de carga / error */}
        {loading && (
          <div className="text-center py-20 text-gray-500">Cargando documentos...</div>
        )}
        {error && (
          <div className="text-center py-20 text-red-500">Error al cargar documentos: {error}</div>
        )}

        {/* Documentos */}
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {documents.map((doc, index) => (
              <motion.div
                key={doc.id}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <motion.div
                        className="p-4 rounded-2xl mr-4"
                        style={{ backgroundColor: `${doc.color}20`, color: doc.color }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <doc.icon className="text-3xl" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-setasplast-dark mb-1">{doc.title}</h3>
                        <p className="text-sm text-gray-500 font-medium">{doc.subtitle}</p>
                      </div>
                    </div>

                    <div className="text-right text-xs text-gray-500">
                      <div className="flex items-center mb-1">
                        <FaFilePdf className="mr-1 text-red-500" />
                        {doc.fileType} • {doc.fileSize}
                      </div>
                      <div>{doc.pages} páginas</div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{doc.description}</p>

                  <div className="flex items-center justify-between">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: `${doc.color}20`, color: doc.color }}
                    >
                      {doc.category}
                    </span>

                    <div className="flex items-center text-xs text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      Actualizado:{" "}
                      {new Date(doc.lastUpdate).toLocaleDateString("es-CO")}
                    </div>
                  </div>
                </div>

                <div className="p-6">
         

             

                  <div className="flex items-center justify-between">
               

                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => copyToClipboard(doc.downloadUrl, doc.title)}
                        className="text-gray-600 hover:text-gray-800 p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copiar enlace"
                      >
                        <FaShare className="text-sm" />
                      </motion.button>

                      <motion.button
                        onClick={() => handleDownload(doc.id, doc.downloadUrl)}
                        className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center"
                        style={{ backgroundColor: doc.color }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaFileDownload className="mr-1" />
                        Descargar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA final */}
        <motion.div
          className="bg-gradient-setasplast to-green-600 rounded-2xl p-8 lg:p-12 text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <FaUsers className="text-5xl mx-auto mb-6 text-green-200" />
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            ¿Necesitas Información Adicional?
          </h3>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Nuestro equipo comercial está disponible para proporcionarte
            documentación específica, cotizaciones personalizadas y asesoría técnica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-setasplast px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center hover:bg-green-50 transition-colors duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaIndustry className="mr-3" />
              Solicitar Información
            </motion.button>

            <motion.button
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center hover:bg-white hover:text-setasplast transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShare className="mr-3" />
              Compartir Recursos
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CorporateDocumentsSection;
