import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <p className="text-7xl font-extrabold text-setasplast">404</p>
    <h1 className="mt-4 text-2xl font-bold text-gray-900">Página no encontrada</h1>
    <p className="mt-2 max-w-md text-gray-600">
      La página que buscas no existe o fue movida. Vuelve al inicio para seguir navegando.
    </p>
    <Link
      to="/"
      className="mt-6 rounded-full bg-setasplast px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-setasplast-dark"
    >
      Ir al inicio
    </Link>
  </section>
);

export default NotFound;
