import { API_BASE_URL } from '../service/api';
import { obtenerAtribucion } from './attribution';
import { trackWhatsAppClick } from './tracking';

/** Único número de WhatsApp de la web (formato internacional, sin «+»). Cambiarlo aquí lo cambia en todos los botones. */
export const WHATSAPP_NUMERO = '573105083525';

// Sin letras ni números que se confunden (0/O, 1/I): el código lo puede ver el cliente en su mensaje.
const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const generarRef = (): string => {
  const bytes = new Uint32Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALFABETO[b % ALFABETO.length]).join('');
};

/**
 * Abre WhatsApp con el mensaje y un código «Ref: XXXXXX». El código se genera aquí y se avisa a Nexus sin esperar su
 * respuesta (así la pestaña se abre al instante y el navegador no la bloquea). Si Nexus no responde, el cliente
 * igual llega a WhatsApp: solo se pierde la fuente de ese contacto.
 */
export const abrirWhatsApp = (boton: string, mensaje: string): void => {
  const ref = generarRef();

  try {
    void fetch(`${API_BASE_URL}/api/chatbot/web-click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ref_code: ref, boton, ...obtenerAtribucion() }),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    // no bloquear el contacto por un fallo de la medición
  }

  trackWhatsAppClick(boton);

  const texto = encodeURIComponent(`${mensaje}\n\nRef: ${ref}`);
  window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`, '_blank', 'noopener,noreferrer');
};
