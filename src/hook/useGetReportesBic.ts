import { useEffect, useState } from "react";
import { getReportesBic, type ReporteBic } from "../service/api";

export type { ReporteBic };

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
    getReportesBic()
      .then((res) => setReportes(res.data.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { reportes, loading, error };
}
