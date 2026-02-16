import  { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gaia from '../../src/assets/gaia.png'
import catalogo from '../assets/pdf/Catalogo.pdf'

import { 

  FaPaperPlane,
  FaTimes,
  FaUser,

  FaPhone,
  FaEnvelope,

  FaSpinner,

  FaMicrophone,
  FaStop
} from 'react-icons/fa';



// -------------------------------------------------------------
// 🧩 Tipos
// -------------------------------------------------------------
interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  list?: string[];
  contact?: {
    phone: string;
    email: string;
    address?: string;
    hours?: string;
  };
  options?: string[];
  quickActions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action:
    | "download-catalog"
    | "quote"
    | "certificates"
    | "call"
    | "email"
    | "pqr-form"
    | "pqr-status"
    | "human-agent"
    | "faq";
}

interface KnowledgeResponse {
  text: string;
  list?: string[];
  contact?: Message["contact"];
  options?: string[];
  quickActions?: QuickAction[];
}

interface KnowledgeEntry {
  keywords: string[];
  response: KnowledgeResponse;
}
// -------------------------------------------------------------
// 🗣️ Tipos para la Web Speech API (compatibilidad Chrome)
// -------------------------------------------------------------
interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onaudiostart?: (event: Event) => void;
  onsoundstart?: (event: Event) => void;
  onspeechstart?: (event: Event) => void;
  onspeechend?: (event: Event) => void;
  onsoundend?: (event: Event) => void;
  onresult?: (event: SpeechRecognitionEvent) => void;
  onerror?: (event: Event) => void;
  onend?: (event: Event) => void;
  onstart?: (event: Event) => void;
}

// Extiende el objeto global `window` para que TypeScript reconozca webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
    };
    SpeechRecognition?: {
      new (): SpeechRecognition;
    };
  }
}

type KnowledgeBase = Record<string, KnowledgeEntry>;


const ChatBot = () => {
const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy GAIA 🤖, tu asistente virtual en la plataforma NEXUS de SetasPlast. ¿Cómo puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
      options: ["Productos", "Certificaciones", "Contacto", "PQR"],
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // -------------------------------------------------------------
  // 📚 Base de conocimiento simulada
  // -------------------------------------------------------------
  const knowledgeBase: KnowledgeBase = {
    productos: {
      keywords: [
        "producto",
        "bolsa",
        "empaque",
        "plástico",
        "catálogo",
        "precio",
      ],
      response: {
        text: "Ofrecemos una amplia gama de productos plásticos sostenibles:",
        options: [
          "Bolsas Biodegradables",
          "Empaques Industriales",
          "Productos Personalizados",
          "Ver Catálogo",
        ],
        quickActions: [
          { label: "Descargar Catálogo", action: "download-catalog" },
          { label: "Solicitar Cotización", action: "quote" },
        ],
      },
    },
    certificaciones: {
      keywords: ["certificación", "iso", "calidad", "bic", "ambiental"],
      response: {
        text: "Contamos con las siguientes certificaciones internacionales:",
        list: [
          "ISO 9001:2015 - Gestión de Calidad",
          "ISO 14001:2015 - Gestión Ambiental",
          "ISO 45001:2018 - Seguridad Ocupacional",
          "Huella de Carbono Neutral - 1000 árboles",
        ],
        quickActions: [{ label: "Ver Certificados", action: "certificates" }],
      },
    },
    contacto: {
      keywords: ["contacto", "teléfono", "email", "dirección", "ubicación"],
      response: {
        text: "Puedes contactarnos a través de:",
        contact: {
          phone: "+573112890067",
          email: "comercialsetasplast@gmail.com",
          address: "Calle 64 N° 113 a – 32, Bogotá D.C.",
          hours: "Lunes a Viernes 8:00 AM - 6:00 PM",
        },
        quickActions: [
          { label: "Llamar Ahora", action: "call" },
          { label: "Enviar Email", action: "email" },
        ],
      },
    },
    pqr: {
      keywords: ["pqr", "queja", "reclamo", "petición", "sugerencia"],
      response: {
        text: "Nuestro sistema PQR te permite presentar:",
        list: [
          "Peticiones de información",
          "Quejas por servicios",
          "Reclamos específicos",
          "Sugerencias de mejora",
          "Felicitaciones",
        ],
        quickActions: [
          { label: "Ir a PQR", action: "pqr-form" },
          { label: "Consultar Estado", action: "pqr-status" },
        ],
      },
    },
    sostenibilidad: {
      keywords: ["sostenible", "ambiental", "árboles", "carbono", "eco"],
      response: {
        text: "Como Empresa BIC, nuestro compromiso ambiental incluye:",
        list: [
          "1000 árboles sembrados en 2024",
          "Procesos de producción sostenibles",
          "Productos biodegradables",
          "Reducción de huella de carbono",
          "Gestión responsable de residuos",
        ],
      },
    },
  };

  const fallbackResponses = [
    "Interesante pregunta. Permíteme conectarte con uno de nuestros especialistas para una respuesta más detallada.",
    "No tengo información específica sobre eso, pero puedo ayudarte con productos, certificaciones, contacto o PQR.",
    "Para consultas específicas, te recomiendo contactar directamente a nuestro equipo comercial.",
  ];

  const quickSuggestions: string[] = [
    "¿Qué productos fabrican?",
    "¿Tienen certificaciones ISO?",
    "¿Cómo puedo contactarlos?",
    "¿Son una empresa sostenible?",
    "¿Cómo presento una PQR?",
    "¿Hacen productos personalizados?",
  ];

  // -------------------------------------------------------------
  // 💬 Procesar mensajes
  // -------------------------------------------------------------
const processMessage = async (message: string): Promise<KnowledgeResponse> => {
  const lowerMessage = message.toLowerCase().trim();

  // 🕒 Detectar la hora local y definir saludo
  const hour = new Date().getHours();
  let greetingTime: string;

  if (hour >= 5 && hour < 12) greetingTime = "¡Muy buenos días! 🌞";
  else if (hour >= 12 && hour < 19) greetingTime = "¡Muy buenas tardes! 🌇";
  else greetingTime = "¡Muy buenas noches! 🌙";

  // 👋 Detección de saludos formales
  const greetings = [
    "hola",
    "buenos días",
    "buenas tardes",
    "buenas noches",
    "saludos",
    "qué tal",
    "como estás",
    "buen día",
  ];

  if (greetings.some((greet) => lowerMessage.startsWith(greet))) {
    return {
      text: `${greetingTime} Soy **GAIA**, asistente virtual de *SetasPlast BIC*.  
Estoy aquí para brindarte atención personalizada sobre nuestros **productos sostenibles, certificaciones, contacto o sistema PQR**.  
¿En qué tema deseas que te asista hoy?`,
      options: ["Productos", "Certificaciones", "Contacto", "PQR"],
      quickActions: [
        { label: "Ver Catálogo", action: "download-catalog" },
        { label: "Hablar con un Especialista", action: "human-agent" },
      ],
    };
  }

  // 🔍 Búsqueda en la base de conocimiento
  for (const [, data] of Object.entries(knowledgeBase)) {
    if (data.keywords.some((keyword) => lowerMessage.includes(keyword))) {
      return data.response;
    }
  }

  // 💬 Respuesta genérica
  return {
    text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
    quickActions: [
      { label: "Hablar con Especialista", action: "human-agent" },
      { label: "Ver FAQ", action: "faq" },
    ],
  };
};



  // -------------------------------------------------------------
  // 🚀 Enviar mensaje
  // -------------------------------------------------------------
  const sendMessage = async (messageText = inputMessage, isQuickReply = false) => {
    if (!messageText.trim() && !isQuickReply) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(async () => {
      const response = await processMessage(messageText);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        list: response.list,
        contact: response.contact,
        options: response.options,
        quickActions: response.quickActions,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 500);
  };

  // -------------------------------------------------------------
  // ⚡ Acciones rápidas
  // -------------------------------------------------------------
  const handleQuickAction = (action: QuickAction["action"]) => {
    const section = document.getElementById("certifications");

    switch (action) {
      case "download-catalog":
        window.open(catalogo, "_blank");
        break;
      case "quote":
        window.open("/contact", "_blank");
        break;
      case "certificates":
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.location.href = "/#certifications";
        }
        break;
      case "call":
        window.open("tel:+573112890067");
        break;
      case "email":
        window.open("mailto:comercialsetasplast@gmail.com");
        break;
      case "pqr-form":
        window.open("/pqr", "_blank");
        break;
      case "human-agent":
        window.open(
          "https://api.whatsapp.com/send/?phone=573105083525&text=Hola%20SetasPlast%20👋%2C%20quiero%20hablar%20con%20un%20especialista%20sobre%20sus%20productos.&type=phone_number&app_absent=0",
          "_blank"
        );
        break;
      default:
        console.warn("Acción no reconocida:", action);
    }
  };

  // -------------------------------------------------------------
  // 🎤 Reconocimiento de voz
  // -------------------------------------------------------------
const startVoiceRecognition = () => {
  const SpeechRecognitionClass =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    console.warn("El reconocimiento de voz no está disponible en este navegador.");
    return;
  }

  const recognition = new SpeechRecognitionClass();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "es-CO";

  recognition.onstart = () => setIsListening(true);
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    setInputMessage(transcript);
    setIsListening(false);
  };
  recognition.onerror = () => setIsListening(false);
  recognition.onend = () => setIsListening(false);

  recognition.start();
};


  // -------------------------------------------------------------
  // 🧭 Efectos secundarios
  // -------------------------------------------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);
  return (
    <>
      {/* Botón flotante */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-setasplast to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaTimes className="text-2xl" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
             <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 mr-3">
  <img src={gaia} alt="GAIA" className="w-full h-full object-cover" />
</div>

                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full ml-2"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Indicador de mensajes no leídos */}
        {!isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3, type: "spring" }}
          >
            1
          </motion.div>
        )}
      </motion.div>

      {/* Ventana del chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-40 flex flex-col"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-to-r from-[#198754] to-[#0F3F2A] text-white p-4 flex items-center justify-between"
              layoutId="chat-header"
            >
              <div className="flex items-center">
                <motion.div
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 mr-3">
  <img src={gaia} alt="GAIA" className="w-full h-full object-cover" />
</div>

                </motion.div>
                <div>
                  <h3 className="font-bold">SetasBot</h3>
                  <motion.p 
                    className="text-sm text-green-100"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    En línea • IA Activada
                  </motion.p>
                </div>
              </div>
              
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            </motion.div>

            {/* Área de mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      
                      {/* Avatar */}
                      <div className={`flex items-end space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                            message.sender === 'user' ? 'bg-blue-500' : 'bg-setasplast'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {message.sender === 'user' ? <FaUser /> : <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20 mr-3">
  <img src={gaia} alt="GAIA" className="w-full h-full object-cover" />
</div>}
                        </motion.div>

                        {/* Burbuja de mensaje */}
                        <motion.div
                          className={`rounded-2xl p-3 max-w-xs ${
                            message.sender === 'user'
                              ? 'bg-blue-500 text-white rounded-br-md'
                              : 'bg-white text-gray-800 rounded-bl-md shadow-md border'
                          }`}
                          whileHover={{ scale: 1.02 }}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>

                          {/* Lista de elementos */}
                          {message.list && (
                            <div className="mt-2 space-y-1">
                              {message.list.map((item, idx) => (
                                <div key={idx} className="text-xs text-gray-600 flex items-center">
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Información de contacto */}
                          {message.contact && (
                            <div className="mt-2 space-y-1 text-xs">
                              <div className="flex items-center"><FaPhone className="mr-2" />{message.contact.phone}</div>
                              <div className="flex items-center"><FaEnvelope className="mr-2" />{message.contact.email}</div>
                              <div className="text-gray-500">{message.contact.hours}</div>
                            </div>
                          )}

                          {/* Opciones rápidas */}
                          {message.options && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {message.options.map((option, idx) => (
                                <motion.button
                                  key={idx}
                                  onClick={() => sendMessage(option, true)}
                                  className="bg-setasplast/10 text-setasplast text-xs px-2 py-1 rounded-full hover:bg-setasplast hover:text-white transition-colors duration-200"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {option}
                                </motion.button>
                              ))}
                            </div>
                          )}

                          {/* Acciones rápidas */}
                          {message.quickActions && (
                            <div className="mt-3 space-y-1">
                              {message.quickActions.map((action, idx) => (
                                <motion.button
                                  key={idx}
                                  onClick={() => handleQuickAction(action.action)}
                                  className="block w-full text-left bg-setasplast text-white text-xs px-3 py-2 rounded-lg hover:bg-setasplast-dark transition-colors duration-200"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {action.label}
                                </motion.button>
                              ))}
                            </div>
                          )}

                          <div className="text-xs text-gray-400 mt-1">
                            {message.timestamp.toLocaleTimeString('es-CO', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Indicador de escritura */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-end space-x-2">
             <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 mr-3">
  <img src={gaia} alt="GAIA" className="w-full h-full object-cover" />
</div>

                    <div className="bg-white rounded-2xl rounded-bl-md p-3 shadow-md">
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-setasplast rounded-full"
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Sugerencias rápidas */}
            <div className="p-3 bg-white border-t border-gray-200">
              <div className="flex flex-wrap gap-1 mb-2">
                {quickSuggestions.slice(0, 3).map((suggestion, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => sendMessage(suggestion, true)}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-setasplast hover:text-white transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Escribe tu mensaje..."
                    className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-setasplast focus:border-transparent text-sm"
                  />
                  
                  {/* Botón de voz */}
                  <motion.button
                    onClick={startVoiceRecognition}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
         isListening ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-setasplast-dark'

                    } transition-colors duration-200`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isListening}
                  >
                    {isListening ? <FaStop /> : <FaMicrophone />}
                  </motion.button>
                </div>

                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-setasplast text-white p-2 rounded-full hover:bg-setasplast-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isTyping ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                </motion.button>
              </div>

              {/* Powered by */}
              <div className="text-center mt-2">
                <span className="text-xs text-gray-400">
          Powered by NEXUS • SetasPlast BIC

                  <button className="text-setasplast hover:underline ml-1">
                    Más info
                  </button>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;