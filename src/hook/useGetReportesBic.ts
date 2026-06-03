import { useEffect, useState } from "react";
import { fetchData } from "../api";

export interface ReporteBic {
  id: number;
  uuid: string;
  nombre: string;
  archivo_path: string;
  fecha_reporte: string;
  empresa_id: number;
  empresa: {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

interface UseGetReportesBicResult {
  reportes: ReporteBic[];
  loading: boolean;
  error: string | null;
}

export function useGetReportesBic(): UseGetReportesBicResult {
  const [reportes, setReportes] = useState<ReporteBic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData("api/obtener-reportes-bic")
      .then((res) => setReportes(res.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { reportes, loading, error };
}
