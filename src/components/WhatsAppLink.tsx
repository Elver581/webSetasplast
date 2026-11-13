import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { abrirWhatsApp, WHATSAPP_NUMERO } from '../utils/whatsapp';

interface Props {
  /** Dónde está el botón (para medir cuál trae más contactos): products_cta, contact_section, product_card... */
  boton: string;
  mensaje?: string;
  className?: string;
  title?: string;
  children: ReactNode;
}

const MENSAJE_POR_DEFECTO = 'Hola SetasPlast 👋, me interesa conocer más sobre sus productos y soluciones.';

/** Botón de WhatsApp único de la web: mismo número, código de referencia y fuente de la visita en todos los casos. */
export default function WhatsAppLink({ boton, mensaje = MENSAJE_POR_DEFECTO, className, title, children }: Props) {
  return (
    <motion.a
      // href real para clic derecho / abrir en otra pestaña; el clic normal pasa por abrirWhatsApp (con código Ref)
      href={`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        abrirWhatsApp(boton, mensaje);
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}
