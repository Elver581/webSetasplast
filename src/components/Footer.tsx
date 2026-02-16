
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebookF, 
  FaYoutube, 
  FaInstagram, 
  FaTiktok,
 
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Footer Top - Información de contacto */}
      <div className="bg-setasplast-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-white">Ubicación</p>
                <Link 
                  to="https://www.google.com/maps/@4.6015924,-74.155779,3a,75y,267.91h,90t/data=!3m7!1e1!3m5!1s-Y9D2w3aouhBoZeKRrWkgQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3D-Y9D2w3aouhBoZeKRrWkgQ%26yaw%3D267.91!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MDIxMC4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-200 transition-colors duration-300 text-sm"
                >
                  Calle 55A Sur No 64-14, Bogotá
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full flex items-center justify-center">
                <FaPhone className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-white">Teléfono</p>
                <Link 
                  to="tel:+573112890067"
                  className="text-white hover:text-gray-200 transition-colors duration-300 text-sm"
                >
                  +57 311 289 0067
                </Link>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-full flex items-center justify-center">
                <FaEnvelope className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="font-semibold text-white">Email</p>
                <Link 
                  to="mailto:comercialsetasplast@gmail.com?subject=Consulta%20desde%20la%20web&body=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20productos"
                  className="text-white hover:text-gray-200 transition-colors duration-300 text-sm"
                >
                  comercialsetasplast@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Middle - Información de la empresa */}
      <div className="bg-neutral-800
 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">SETASPLAST SAS BIC</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empresa especializada en la fabricación y comercialización de productos plásticos de alta calidad. 
                Comprometidos con la innovación, sostenibilidad y excelencia en el servicio al cliente.
              </p>
              <div className="flex space-x-4">
                <Link 
                  to="https://www.facebook.com/SetasPlastBic?mibextid=ZbWKwL&_rdc=2&_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-blue-600 p-3 rounded-full transition-colors duration-300 flex items-center justify-center group"
                >
                  <FaFacebookF className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </Link>
                
                <Link 
                  to="https://www.youtube.com/@setasplast1807"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-red-600 p-3 rounded-full transition-colors duration-300 flex items-center justify-center group"
                >
                  <FaYoutube className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </Link>
                
                <Link 
                  to="https://www.instagram.com/setasplast1/?igshid=NTc4MTIwNjQ2YQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-pink-600 p-3 rounded-full transition-colors duration-300 flex items-center justify-center group"
                >
                  <FaInstagram className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </Link>
                
                <Link 
                  to="https://www.tiktok.com/@setasplast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-black p-3 rounded-full transition-colors duration-300 flex items-center justify-center group"
                >
                  <FaTiktok className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#inicio" className="text-gray-300 hover:text-setasplast transition-colors duration-300">Inicio</a></li>
                <li><a href="#productos" className="text-gray-300 hover:text-setasplast transition-colors duration-300">Productos</a></li>
                <li><a href="#servicios" className="text-gray-300 hover:text-setasplast transition-colors duration-300">Servicios</a></li>
                <li><a href="#nosotros" className="text-gray-300 hover:text-setasplast transition-colors duration-300">Acerca de Nosotros</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Servicios</h4>
              <ul className="space-y-3">
                <li><span className="text-gray-300">Fabricación de plásticos</span></li>
                <li><span className="text-gray-300">Inyección de plástico</span></li>
                <li><span className="text-gray-300">Diseño personalizado</span></li>
                <li><span className="text-gray-300">Asesoría técnica</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 SETASPLAST SAS BIC · 
                <Link to="/contacto" className="text-setasplast hover:text-white mx-1 transition-colors duration-300">
                  TRABAJE CON NOSOTROS
                </Link> · 
                <Link to="/politicas" className="text-setasplast hover:text-white mx-1 transition-colors duration-300">
                  TRATAMIENTO DE DATOS PERSONALES
                </Link>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                TODOS LOS DERECHOS RESERVADOS · BY: <a href="#" className="text-setasplast hover:text-white transition-colors duration-300">ETS</a>
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Síguenos:</span>
              <div className="flex space-x-2">
                <Link 
                  to="https://www.facebook.com/SetasPlastBic" 
                  className="text-gray-400 hover:text-setasplast transition-colors hover:scale-110 transform duration-200"
                >
                  <FaFacebookF className="h-4 w-4" />
                </Link>
                <Link 
                  to="https://www.instagram.com/setasplast1" 
                  className="text-gray-400 hover:text-setasplast transition-colors hover:scale-110 transform duration-200"
                >
                  <FaInstagram className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;