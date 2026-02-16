import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaExclamationTriangle,
  FaQuestion,
  FaCommentDots,
  FaThumbsUp,
  FaFileAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
  FaExclamationCircle,
  FaInfoCircle,
  FaClock,
  FaUpload,        // 🆕 Para el icono de subida
  FaFile,          // 🆕 Para archivo genérico
  FaFilePdf,       // 🆕 Para PDF
  FaFileImage,     // 🆕 Para imágenes
  FaFileWord,      // 🆕 Para Word
  FaTimes,         // 🆕 Para eliminar archivo
  FaCheck          // 🆕 Para archivo válido
} from 'react-icons/fa';
import usePqr from '../hook/usePqr';
import type { IconType } from 'react-icons';

interface TipoPQR {
  id: string;
  titulo: string;
  descripcion: string;
  icon: IconType;
  color: string;
  tiempo: string;
}

const PQRSection = () => {
  const {
    nombreRef,
    empresaRef,
    emailRef,
    telefonoRef,
    mensajeRef,
    archivoRef,
    aceptarTerminosRef,
    error,
    errorTerminos,
    enviarDatos,
    codigoRadicado
  } = usePqr();

  const [selectedType, setSelectedType] = useState<string>('peticion');
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 🆕 Estado para archivo
  const [isDragging, setIsDragging] = useState<boolean>(false); // 🆕 Estado para drag & drop

  // 🆕 Función para obtener el icono según el tipo de archivo
  const getFileIcon = (fileName: string): IconType => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return FaFilePdf;
      case 'doc':
      case 'docx':
        return FaFileWord;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return FaFileImage;
      default:
        return FaFile;
    }
  };

  // 🆕 Función para formatear el tamaño del archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 🆕 Función para validar el archivo
  const validateFile = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png', 'image/gif'];
    
    if (file.size > maxSize) {
      alert('El archivo no puede ser mayor a 10MB');
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert('Tipo de archivo no permitido. Solo se aceptan PDF, Word, JPG, PNG y GIF');
      return false;
    }
    
    return true;
  };

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  
  if (file && validateFile(file)) {
    setSelectedFile(file);

    const dt = new DataTransfer();
    dt.items.add(file);
    archivoRef.current!.files = dt.files;

    console.log("ARCHIVO REF FILES:", archivoRef.current?.files);
  }
};


  // 🆕 Manejar drag & drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      // Actualizar el input file
      if (archivoRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        archivoRef.current.files = dataTransfer.files;
      }
    }
  };

  // 🆕 Manejar drag over
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // 🆕 Manejar drag leave
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // 🆕 Eliminar archivo seleccionado
  const removeFile = () => {
    setSelectedFile(null);
    if (archivoRef.current) {
      archivoRef.current.value = '';
    }
  };

  // Tipos de PQR
  const tiposPQR: TipoPQR[] = [
    {
      id: 'peticion',
      titulo: 'Petición',
      descripcion: 'Solicitud de información, documentos o actuaciones',
      icon: FaQuestion,
      color: '#22c55e',
      tiempo: '15 días hábiles'
    },
    {
      id: 'queja',
      titulo: 'Queja',
      descripcion: 'Expresión de insatisfacción por un servicio o producto',
      icon: FaExclamationTriangle,
      color: '#f59e0b',
      tiempo: '15 días hábiles'
    },
    {
      id: 'reclamo',
      titulo: 'Reclamo',
      descripcion: 'Solicitud de solución a un problema específico',
      icon: FaExclamationCircle,
      color: '#ef4444',
      tiempo: '15 días hábiles'
    },
    {
      id: 'sugerencia',
      titulo: 'Sugerencia',
      descripcion: 'Propuesta de mejora para nuestros productos o servicios',
      icon: FaThumbsUp,
      color: '#3b82f6',
      tiempo: '30 días hábiles'
    },
    {
      id: 'felicitacion',
      titulo: 'Felicitación',
      descripcion: 'Reconocimiento por un buen servicio o experiencia',
      icon: FaCommentDots,
      color: '#8b5cf6',
      tiempo: '5 días hábiles'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 -right-20 w-60 h-60 bg-blue-500/5 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-40 h-40 bg-setasplast/5 rounded-full"
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
            className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-blue-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <FaFileAlt className="text-blue-600 mr-2" />
            <span className="text-blue-900 font-semibold text-sm">Sistema PQR</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-setasplast-dark mb-6">
            Peticiones, Quejas y <span className="text-blue-600">Reclamos</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tu opinión es importante para nosotros. Utiliza este canal oficial para 
            <span className="text-setasplast font-semibold"> presentar solicitudes</span>, 
            <span className="text-blue-600 font-semibold"> reportar inconvenientes</span> o 
            <span className="text-purple-600 font-semibold"> compartir sugerencias</span>.
          </p>
        </motion.div>

        {/* Tipos de PQR */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {tiposPQR.map((tipo) => (
            <motion.div
              key={tipo.id}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                selectedType === tipo.id
                  ? 'border-current shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 shadow-md'
              }`}
              style={{ 
                borderColor: selectedType === tipo.id ? tipo.color : undefined,
                backgroundColor: selectedType === tipo.id ? `${tipo.color}10` : 'white'
              }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedType(tipo.id)}
            >
              <input
                type="radio"
                name="tipo-pqr"
                id={tipo.id}
                className="sr-only"
                checked={selectedType === tipo.id}
                onChange={() => setSelectedType(tipo.id)}
              />
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ backgroundColor: `${tipo.color}20`, color: tipo.color }}
                >
                  <tipo.icon className="text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{tipo.titulo}</h3>
                <p className="text-sm text-gray-600 mb-3">{tipo.descripcion}</p>
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <FaClock className="mr-1" />
                  {tipo.tiempo}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Información adicional */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Información del tipo seleccionado */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              {(() => {
                const tipo = tiposPQR.find(t => t.id === selectedType);
                if (!tipo) return null;
                const Icon = tipo.icon;
                return (
                  <div>
                    <div className="flex items-center mb-4">
                      <div 
                        className="p-3 rounded-xl mr-4"
                        style={{ backgroundColor: `${tipo.color}20`, color: tipo.color }}
                      >
                        <Icon className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{tipo.titulo}</h3>
                        <p className="text-sm text-gray-600">{tipo.descripcion}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <FaClock className="text-gray-500 mr-2" />
                        <span className="text-sm font-semibold text-gray-700">
                          Tiempo de respuesta: {tipo.tiempo}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Marco legal */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <FaInfoCircle className="text-blue-600 mr-2" />
                Marco Legal
              </h4>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Ley 1755 de 2015:</strong> Derecho fundamental de petición
                </p>
                <p>
                  <strong>Código de Procedimiento Administrativo:</strong> Artículo 14
                </p>
                <p>
                  <strong>Ley 1581 de 2012:</strong> Protección de datos personales
                </p>
              </div>
            </div>

            {/* Canales adicionales */}
            <div className="bg-gradient-to-br from-setasplast/10 to-blue-50 rounded-2xl p-6 border border-setasplast/20">
              <h4 className="font-bold text-setasplast-dark mb-4">
                Otros Canales de Atención
              </h4>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <FaPhone className="text-setasplast mr-2" />
                  <span>3112890067</span>
                </div>
                <div className="flex items-center text-sm">
                  <FaEnvelope className="text-setasplast mr-2" />
                  <span>pqr@setasplast.com</span>
                </div>
                <div className="text-xs text-gray-600 mt-3">
                  Horario: Lunes a Viernes 8:00 AM - 6:00 PM
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario principal */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaClipboardList className="text-setasplast mr-3" />
                Formulario de {tiposPQR.find(t => t.id === selectedType)?.titulo}
              </h3>

              <form onSubmit={(e) => enviarDatos(e, selectedFile)} className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FaUser className="text-setasplast mr-2" /> Datos Personales
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        ref={nombreRef}
                        type="text"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-setasplast focus:border-setasplast transition-all ${
                          error.nombre ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="Ej. Juan Pérez"
                      />
                      {error.nombre && <p className="text-red-600 text-sm mt-1">{error.nombre}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa
                      </label>
                      <input
                        ref={empresaRef}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-setasplast focus:border-setasplast transition-all"
                        placeholder="Ej. SetasPlast"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FaEnvelope className="text-blue-600 mr-2" /> Información de contacto
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correo electrónico *
                      </label>
                      <input
                        ref={emailRef}
                        type="email"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          error.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="tu@email.com"
                      />
                      {error.email && <p className="text-red-600 text-sm mt-1">{error.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        ref={telefonoRef}
                        type="tel"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          error.telefono ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="+57 300 123 4567"
                      />
                      {error.telefono && <p className="text-red-600 text-sm mt-1">{error.telefono}</p>}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FaFileAlt className="text-yellow-600 mr-2" /> Descripción de la solicitud
                  </h4>

                  <textarea
                    ref={mensajeRef}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all resize-none ${
                      error.mensaje ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Describe tu solicitud o comentario de manera detallada..."
                  />
                  {error.mensaje && <p className="text-red-600 text-sm mt-1">{error.mensaje}</p>}
                </div>

                {/* 🆕 ARCHIVO ADJUNTO MEJORADO */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <FaUpload className="text-green-600 mr-2" /> Archivo adjunto (opcional)
                  </h4>

                  {!selectedFile ? (
                    // Zona de subida
                    <motion.div
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                        isDragging 
                          ? 'border-green-500 bg-green-100' 
                          : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => archivoRef.current?.click()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                     ¡<input
  ref={archivoRef}
  type="file"
  name="archivo"
  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
  onChange={handleFileChange}
  className="hidden opacity-0 absolute pointer-events-none"
/>

                      
                      <motion.div
                        className="space-y-4"
                        animate={{ y: isDragging ? -5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                          isDragging ? 'bg-green-200' : 'bg-gray-100'
                        }`}>
                          <FaUpload className={`text-2xl ${
                            isDragging ? 'text-green-600' : 'text-gray-400'
                          }`} />

                          
                        </div>
                        
                        <div>
                          <p className="text-lg font-medium text-gray-700">
                            {isDragging ? 'Suelta el archivo aquí' : 'Arrastra tu archivo aquí'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            o <span className="text-green-600 font-semibold">haz clic para seleccionar</span>
                          </p>
                        </div>
                        
                        <div className="text-xs text-gray-400 space-y-1">
                          <p>Formatos aceptados: PDF, Word, JPG, PNG, GIF</p>
                          <p>Tamaño máximo: 10MB</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    // Archivo seleccionado
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-green-200 rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            {(() => {
                              const FileIcon = getFileIcon(selectedFile.name);
                              return <FileIcon className="text-green-600 text-xl" />;
                            })()}
                          </div>
                          
                          <div>
                            <p className="font-medium text-gray-900 truncate max-w-xs">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatFileSize(selectedFile.size)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center text-green-600">
                            <FaCheck className="mr-1" />
                            <span className="text-sm font-medium">Listo</span>
                          </div>
                          
                          <motion.button
                            type="button"
                            onClick={removeFile}
                            className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center text-red-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaTimes className="text-sm" />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => {
                            removeFile();
                            archivoRef.current?.click();
                          }}
                          className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                        >
                          Cambiar archivo
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <input
                      ref={aceptarTerminosRef}
                      type="checkbox"
                      className="mt-1 w-5 h-5 text-purple-600 bg-white border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label className="text-sm text-gray-700 leading-relaxed">
                      Acepto los términos de la{' '}
                      <a href="#" className="text-purple-600 font-semibold hover:underline">
                        Política de Privacidad
                      </a>{' '}
                      y autorizo el tratamiento de mis datos personales conforme a la normativa vigente.
                    </label>
                  </div>
                  {errorTerminos && (
                    <p className="text-red-600 text-sm mt-2 flex items-center">
                      <FaExclamationCircle className="mr-1" />
                      Debes aceptar los términos antes de enviar.
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-setasplast from-setasplast to-green-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:from-setasplast-dark hover:to-green-700 focus:ring-4 focus:ring-setasplast focus:ring-opacity-50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <FaFileAlt className="mr-2" />
                    Enviar solicitud
                  </span>
                </motion.button>

                {codigoRadicado && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-green-100 border border-green-300 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <FaCheck className="text-green-600 text-2xl mr-2" />
                      <span className="text-lg font-bold text-green-800">¡Solicitud enviada!</span>
                    </div>
                    <p className="text-green-700 font-semibold">
                      Tu número de radicado es: <span className="bg-green-200 px-3 py-1 rounded-lg">{codigoRadicado}</span>
                    </p>
                    <p className="text-sm text-green-600 mt-2">
                      Guarda este número para hacer seguimiento a tu solicitud
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PQRSection;