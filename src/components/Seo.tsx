import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://setasplast.com';
const NAME = 'SetasPlast SAS BIC';

const PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'SetasPlast SAS BIC | Productos Plásticos Sostenibles en Colombia',
    description: 'Fabricamos productos plásticos sostenibles en Colombia. Empresa BIC comprometida con el medio ambiente y la reforestación.',
  },
  '/about': { title: `Nosotros | ${NAME}`, description: 'Conoce la historia, misión y compromiso ambiental de SetasPlast SAS BIC.' },
  '/productos': { title: `Productos | ${NAME}`, description: 'Catálogo de productos plásticos sostenibles fabricados por SetasPlast.' },
  '/reforestacion': { title: `Reforestación | ${NAME}`, description: 'Nuestro programa de reforestación y compromiso con el planeta.' },
  '/contact': { title: `Contacto | ${NAME}`, description: 'Contáctanos para cotizaciones y consultas sobre productos SetasPlast.' },
  '/pqr': { title: `PQR | ${NAME}`, description: 'Radica peticiones, quejas y reclamos en SetasPlast SAS BIC.' },
  '/politica-privacidad': { title: `Política de privacidad | ${NAME}`, description: 'Política de privacidad y tratamiento de datos de SetasPlast SAS BIC.' },
  '/eliminacion-datos': { title: `Eliminación de datos | ${NAME}`, description: 'Cómo solicitar la eliminación de tus datos personales en SetasPlast SAS BIC.' },
};

const setMeta = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

/** Actualiza title, description, canonical y robots según la ruta (SPA). */
const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const page = PAGES[path];
    const known = Boolean(page);

    document.title = page ? page.title : `Página no encontrada | ${NAME}`;

    if (page) {
      setMeta('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', page.description);
    }

    setMeta('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', known ? `${SITE}${path === '/' ? '/' : path}` : `${SITE}/`);

    setMeta(
      'meta[name="robots"]',
      () => Object.assign(document.createElement('meta'), { name: 'robots' }),
      'content',
      known
        ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        : 'noindex, follow',
    );
  }, [pathname]);

  return null;
};

export default Seo;
