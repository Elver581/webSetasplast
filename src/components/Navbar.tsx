import { useEffect, useState } from 'react';
import logo1 from '../../public/setas.png';
import logo2 from '../../public/bic.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  // Transparente solo en el inicio y mientras no se hace scroll
  const transparent = isHome && !scrolled && !isMenuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLink = `px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
    transparent ? 'text-white hover:text-green-200' : 'text-gray-700 hover:text-setasplast'
  }`;

  const underline = `absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
    transparent ? 'bg-white' : 'bg-setasplast'
  }`;

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        transparent ? 'bg-transparent' : 'bg-white shadow-lg'
      }`}
    >
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
            <div
              className={`hidden sm:block h-8 w-px ${transparent ? 'bg-white/40' : 'bg-gray-300'}`}
            ></div>

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
              <Link to="/" className={navLink}>
                Inicio
                <span className={underline}></span>
              </Link>
              <Link to="/productos" className={navLink}>
                Productos
                <span className={underline}></span>
              </Link>
              <Link to="/pqr" className={navLink}>
                PQR
                <span className={underline}></span>
              </Link>
              <Link to="/about" className={navLink}>
                Nosotros
                <span className={underline}></span>
              </Link>

              <Link to="/politica-privacidad" className={navLink}>
                Politica de privacidad
                <span className={underline}></span>
              </Link>
              <Link
                to="/contact"
                className={`px-6 py-2.5 rounded-full text-sm font-medium transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg ${
                  transparent
                    ? 'bg-white text-setasplast-dark hover:bg-green-50'
                    : 'bg-setasplast hover:bg-setasplast-dark text-white'
                }`}
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${
                transparent ? 'text-white hover:text-green-200' : 'text-gray-700 hover:text-setasplast'
              }`}
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
