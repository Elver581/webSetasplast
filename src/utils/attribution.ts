/**
 * Fuente del visitante (UTM, gclid, fbclid): se guarda al entrar para poder decir de qué campaña vino quien después
 * escribe por WhatsApp. Se conserva 30 días; si llega una visita con parámetros nuevos, esos reemplazan a los anteriores.
 */
const CLAVE = 'nxs_atribucion';
const VIGENCIA_MS = 30 * 24 * 60 * 60 * 1000;
const PARAMETROS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'] as const;

export type Atribucion = Partial<Record<(typeof PARAMETROS)[number], string>> & {
  landing_url?: string;
  referrer?: string;
  guardado_en?: number;
};

const leer = (): Atribucion | null => {
  try {
    const dato = JSON.parse(localStorage.getItem(CLAVE) || 'null') as Atribucion | null;
    return dato && dato.guardado_en && Date.now() - dato.guardado_en < VIGENCIA_MS ? dato : null;
  } catch {
    return null;
  }
};

/** Llamar una vez al iniciar la aplicación. */
export const capturarAtribucion = (): void => {
  try {
    const url = new URL(window.location.href);
    const nuevos: Atribucion = {};
    PARAMETROS.forEach((p) => {
      const valor = url.searchParams.get(p);
      if (valor) nuevos[p] = valor.slice(0, 250);
    });

    const hayParametros = Object.keys(nuevos).length > 0;
    if (!hayParametros && leer()) return; // ya hay una fuente vigente

    localStorage.setItem(
      CLAVE,
      JSON.stringify({
        ...nuevos,
        landing_url: window.location.href.slice(0, 500),
        referrer: document.referrer ? document.referrer.slice(0, 500) : undefined,
        guardado_en: Date.now(),
      } satisfies Atribucion)
    );
  } catch {
    // Sin localStorage (modo privado estricto): simplemente no hay atribución.
  }
};

export const obtenerAtribucion = (): Atribucion => {
  const { guardado_en: _omitido, ...resto } = leer() ?? {};
  void _omitido;
  return resto;
};
