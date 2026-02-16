import { useState } from 'react';
import logo1 from '../../public/setas.png';
import logo2 from '../../public/bic.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logos Container */}
          <div className="flex items-center space-x-3">
            {/* Logo Principal SetasPlast */}
            <div className="flex-shrink-0">
              <img 
                className="h-20 w-auto transition-transform duration-200 hover:scale-105" 
                src={logo1} 
                alt="SetasPlast" 
              />
            </div>
            
            {/* Separador */}
            <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
            
            {/* Logo BIC */}
            <div className="flex-shrink-0">
              <img 
                className="h-8 w-auto transition-transform duration-200 hover:scale-105" 
                src={logo2} 
                alt="BIC Empresa" 
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-setasplast px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-setasplast group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/productos"
                className="text-gray-700 hover:text-setasplast px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Productos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-setasplast group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/pqr"
                className="text-gray-700 hover:text-setasplast px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                PQR
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-setasplast group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-setasplast px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Nosotros
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-setasplast group-hover:w-full transition-all duration-300"></span>
              </Link>
     
              <Link
                to="/politica-privacidad"
                className="text-gray-700 hover:text-setasplast px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
              >
                Politica de privacidad
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-setasplast group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/contact"
                className="bg-setasplast hover:bg-setasplast-dark text-white px-6 py-2.5 rounded-full text-sm font-medium transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-setasplast p-2 rounded-md transition-colors duration-200"
              aria-label="Menú de navegación"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white">
           
              
              <Link
                to="/"
                className="block text-gray-700 hover:text-setasplast hover:bg-green-50 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/productos"
                className="block text-gray-700 hover:text-setasplast hover:bg-green-50 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </Link>
              <Link
                to="/pqr"
                className="block text-gray-700 hover:text-setasplast hover:bg-green-50 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                PQR
              </Link>
              <Link
                to="/about"
                className="block text-gray-700 hover:text-setasplast hover:bg-green-50 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                to="/politica-privacidad"
                className="block text-gray-700 hover:text-setasplast hover:bg-green-50 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Politica de privacidad
              </Link>

              <Link
                to="/contact"
                 className="block text-gray-700 hover:text-setasplast hover:bg-green-50 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
               
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}  
      </div>
    </nav>
  );
};

export default Navbar;