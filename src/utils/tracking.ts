type TrackingWindow = typeof window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

/** Registra un clic hacia WhatsApp en Meta Pixel (Contact) y GA4 (click_whatsapp). */
export const trackWhatsAppClick = (location = 'unknown') => {
  const w = window as TrackingWindow;
  const params = { contact_method: 'whatsapp', button_location: location };

  if (typeof w.fbq === 'function') {
    w.fbq('track', 'Contact', params);
  }

  // gtag solo existe si el visitante aceptó las cookies de medición
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'click_whatsapp', params);
  }
};
