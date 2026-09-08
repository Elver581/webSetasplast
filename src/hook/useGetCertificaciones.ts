import { useEffect, useState } from "react";
import { getCertificaciones, type ApiCertificacion } from "../service/api";

// -------------------------------------------------------
// Tipo normalizado para el componente
// -------------------------------------------------------

export interface Certificacion {
  id: string;
  uuid: string;
  title: string;
  subtitle: string;
  description: string;
  logo: string;
  color: string;
  bgColor: string;
  activo: boolean;
}

// Paleta de la sección de certificaciones (se asigna por posición)
const COLOR_PALETTE = ["#198754", "#22c55e", "#146c43", "#20c997"];

const HEX_RE = /^#?[0-9a-fA-F]{6}$/;

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function mapCertificacion(
  cert: ApiCertificacion,
  index: number
): Certificacion {
  // El color del título viene del backend (titulo_color); si no es un hex
  // válido se usa la paleta por posición como respaldo.
  const apiColor = cert.titulo_color?.trim() ?? "";
  const color = HEX_RE.test(apiColor)
    ? apiColor.startsWith("#")
      ? apiColor
      : `#${apiColor}`
    : COLOR_PALETTE[index % COLOR_PALETTE.length];
  return {
    id: String(cert.id),
    uuid: cert.uuid,
    title: cert.titulo,
    subtitle: cert.subtitulo,
    description: cert.descripcion,
    logo: cert.logo_url,
    color,
    bgColor: hexToRgba(color, 0.1),
    activo: cert.activo,
  };
}

// -------------------------------------------------------
// Hook
// -------------------------------------------------------

interface UseGetCertificacionesResult {
  certificaciones: Certificacion[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGetCertificaciones(): UseGetCertificacionesResult {
  const [certificaciones, setCertificaciones] = useState<Certificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    getCertificaciones()
      .then((res) => {
        if (!cancelled) setCertificaciones(res.data.map(mapCertificacion));
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tick]);

  const refetch = () => setTick((t) => t + 1);

  return { certificaciones, loading, error, refetch };
}

export default useGetCertificaciones;
