import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'setasplast-cookie-consent';
const COOKIE_SETTINGS_EVENT = 'setasplast:open-cookie-settings';
const GA_MEASUREMENT_ID = 'G-EXXZ5TGTGE';

type Consent = 'accepted' | 'rejected';

type AnalyticsWindow = typeof window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const setAnalyticsDisabled = (disabled: boolean) => {
  const analyticsWindow = window as AnalyticsWindow;
  const analyticsFlags = window as unknown as Record<string, boolean>;

  analyticsFlags[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;

  if (!disabled) {
    return;
  }

  analyticsWindow.gtag?.('consent', 'update', { analytics_storage: 'denied' });

  document.cookie.split(';').forEach((cookie) => {
    const cookieName = cookie.split('=')[0].trim();

    if (cookieName.startsWith('_ga')) {
      document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
    }
  });
};

const loadGoogleAnalytics = () => {
  if (document.querySelector(`script[data-ga-id="${GA_MEASUREMENT_ID}"]`)) {
    return;
  }

  const analyticsWindow = window as AnalyticsWindow;

  setAnalyticsDisabled(false);
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = (...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args);
  };
  analyticsWindow.gtag('js', new Date());
  analyticsWindow.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.dataset.gaId = GA_MEASUREMENT_ID;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY) as Consent | null;

    if (savedConsent === 'accepted') {
      loadGoogleAnalytics();
    } else if (!savedConsent) {
      setIsVisible(true);
    }

    const openSettings = () => setIsVisible(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);

    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const saveConsent = (consent: Consent) => {
    localStorage.setItem(CONSENT_KEY, consent);
    setIsVisible(false);

    if (consent === 'accepted') {
      loadGoogleAnalytics();
    } else {
      setAnalyticsDisabled(true);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-label="Preferencias de cookies"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl sm:p-6"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="mb-2 text-lg font-bold text-gray-900">Tu privacidad es importante</h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Usamos cookies necesarias para el funcionamiento del sitio y, con tu permiso,
            cookies de medición para entender cómo se utiliza. Puedes aceptar o rechazar
            las cookies de medición. Consulta nuestra{' '}
            <Link className="font-semibold text-setasplast hover:underline" to="/politica-privacidad">
              política de privacidad
            </Link>.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-shrink-0">
          <button
            className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            onClick={() => saveConsent('rejected')}
            type="button"
          >
            Rechazar
          </button>
          <button
            className="rounded-full bg-setasplast px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-setasplast-dark"
            onClick={() => saveConsent('accepted')}
            type="button"
          >
            Aceptar cookies
          </button>
        </div>
      </div>
    </section>
  );
};

export default CookieConsent;
