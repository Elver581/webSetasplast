import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFileDownload,
  FaFilePdf,
  FaBook,
  FaClipboardList,
  FaShieldAlt,
  FaLeaf,
  FaCalendarAlt,
  FaHandshake,
  FaUsers,
  FaIndustry,
  FaShare,
} from "react-icons/fa";
import type { IconType } from "react-icons";

import brochure from "../assets/pdf/Brochure.pdf";
import politica from "../assets/pdf/PoliticaIntegral.pdf";
import catalogo from "../assets/pdf/Catalogo.pdf";

// -------------------------------------------------------
// 🧩 Tipos de datos
// -------------------------------------------------------

interface DocumentData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  icon: IconType;
  fileType: string;
  fileSize: string;
  pages: number;
  lastUpdate: string;
  color: string;
  category: string;
  downloadUrl: string;
  features: string[];
  benefits: string[];
}

type DownloadCounts = Record<string, number>;

// -------------------------------------------------------
// 🌿 Componente principal
// -------------------------------------------------------

const CorporateDocumentsSection: React.FC = () => {

  const [downloadCounts, setDownloadCounts] = useState<DownloadCounts>({
    "politica-integral": 1247,
    "catalogo-productos": 3856,
    "brochure-corporativo": 2134,
  });

  // -------------------------------------------------------
  // 📄 Documentos
  // -------------------------------------------------------
  const documents: DocumentData[] = [
    {
      id: "politica-integral",
      title: "Política Integral",
      subtitle: "Sistema de Gestión Integrado",
      description:
        "Documento que establece nuestro compromiso con la calidad, medio ambiente, seguridad y salud ocupacional, alineado con los estándares ISO.",
      longDescription:
        "Nuestra Política Integral refleja el compromiso de SetasPlast SAS BIC con la excelencia operacional y la responsabilidad social empresarial.",
      icon: FaShieldAlt,
      fileType: "PDF",
      fileSize: "2.4 MB",
      pages: 24,
      lastUpdate: "2024-01-15",
      color: "#198754",
      category: "Gestión",
      downloadUrl: politica,
      features: [
        "Política de Calidad ISO 9001:2015",
        "Compromiso Ambiental ISO 14001:2015",
        "Seguridad Laboral ISO 45001:2018",
        "Responsabilidad Social BIC",
        "Objetivos de Sostenibilidad",
        "Indicadores de Desempeño",
      ],
      benefits: [
        "Transparencia Corporativa",
        "Cumplimiento Normativo",
        "Mejora Continua",
        "Compromiso con Stakeholders",
      ],
    },
    {
      id: "catalogo-productos",
      title: "Catálogo de Productos",
      subtitle: "Soluciones Plásticas Innovadoras",
      description:
        "Catálogo completo con nuestra línea de productos plásticos sostenibles, especificaciones técnicas, aplicaciones y beneficios ambientales.",
      longDescription:
        "Descubre nuestra amplia gama de productos plásticos diseñados con tecnología de vanguardia y enfoque sostenible.",
      icon: FaBook,
      fileType: "PDF",
      fileSize: "8.7 MB",
      pages: 48,
      lastUpdate: "2024-10-01",
      color: "#22c55e",
      category: "Comercial",
      downloadUrl: catalogo,
      features: [
        "50+ Productos Disponibles",
        "Especificaciones Técnicas",
        "Aplicaciones Industriales",
        "Certificaciones de Calidad",
        "Fichas de Sostenibilidad",
      ],
      benefits: [
        "Selección Informada",
        "Comparación Técnica",
        "Cotización Rápida",
        "Soporte Especializado",
      ],
    },
    {
      id: "brochure-corporativo",
      title: "Brochure Corporativo",
      subtitle: "SetasPlast SAS BIC - Excelencia Sostenible",
      description:
        "Presentación corporativa que muestra nuestra historia, valores, capacidades, certificaciones y compromiso como Empresa BIC.",
      longDescription:
        "Conoce la historia de SetasPlast SAS BIC, una empresa comprometida con la excelencia en la fabricación de productos plásticos sostenibles.",
      icon: FaHandshake,
      fileType: "PDF",
      fileSize: "5.2 MB",
      pages: 16,
      lastUpdate: "2024-09-15",
      color: "#20c997",
      category: "Institucional",
      downloadUrl: brochure,
      features: [
        "Historia Empresarial",
        "Misión, Visión y Valores",
        "Capacidades Productivas",
        "Certificaciones Vigentes",
        "Compromiso BIC",
        "Casos de Éxito",
      ],
      benefits: [
        "Conocimiento Corporativo",
        "Confianza Comercial",
        "Referencia de Calidad",
        "Networking Empresarial",
      ],
    },
  ];

  // -------------------------------------------------------
  // ⚙️ Funciones
  // -------------------------------------------------------

  const handleDownload = (docId: string, downloadUrl: string) => {
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = documents.find((doc) => doc.id === docId)?.title || "documento";
    link.click();

    setDownloadCounts((prev) => ({
      ...prev,
      [docId]: (prev[docId] || 0) + 1,
    }));
  };


const copyToClipboard = async (url: string, docTitle: string) => {
  try {
    // Crear URL absoluta
    const absoluteUrl = new URL(url, window.location.origin).href;
    await navigator.clipboard.writeText(absoluteUrl);
    alert(`Enlace de "${docTitle}" copiado al portapapeles`);
  } catch (err) {
    // Fallback para navegadores que no soportan clipboard API
    const textArea = document.createElement('textarea');
    textArea.value = new URL(url, window.location.origin).href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert(`Enlace de "${docTitle}" copiado al portapapeles`);
  }
};
  const totalDownloads = Object.values(downloadCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  // -------------------------------------------------------
  // 🧱 Render principal
  // -------------------------------------------------------
  return (
    <section
      id="documentos"
      className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden"
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

      {/* Contenido principal */}
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
            <span className="text-setasplast font-semibold">
              Toda la información
            </span>{" "}
            que necesitas para{" "}
            <span className="text-green-600 font-semibold">
              conocer SetasPlast
            </span>{" "}
            en profundidad.
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
          {[
            { number: "3", label: "Documentos Disponibles", icon: FaFilePdf, color: "text-red-600" },
            { number: `${totalDownloads.toLocaleString()}`, label: "Descargas Totales", icon: FaFileDownload, color: "text-blue-600" },
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

        {/* Documentos */}
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

              {/* Contenido principal */}
              <div className="p-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaClipboardList className="mr-2 text-setasplast" />
                  Contenido Principal
                </h4>

                <div className="grid grid-cols-1 gap-2 mb-4">
                  {doc.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <div
                        className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                        style={{ backgroundColor: doc.color }}
                      />
                      {feature}
                    </div>
                  ))}
                </div>

                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FaLeaf className="mr-2 text-green-600" />
                  Beneficios
                </h4>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {doc.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full text-center"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>

             
<div className="flex items-center justify-between">
  <div className="flex items-center text-sm text-gray-500">
    <FaFileDownload className="mr-1" />
    {downloadCounts[doc.id].toLocaleString()} descargas
  </div>

  <div className="flex items-center gap-2">
    {/* Botón copiar enlace */}
    <motion.button
      onClick={() => copyToClipboard(doc.downloadUrl, doc.title)}
      className="text-gray-600 hover:text-gray-800 p-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Copiar enlace"
    >
      <FaShare className="text-sm" />
    </motion.button>

    {/* Botón descargar */}
    <motion.button
      onClick={() => handleDownload(doc.id, doc.downloadUrl)}
      className="text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center"
      style={{ backgroundColor: doc.color }}
      whileHover={{ scale: 1.05, backgroundColor: `${doc.color}dd` }}
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
