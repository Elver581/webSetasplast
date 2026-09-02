import { useEffect, useState } from "react";
import {
  getVentanaWebPublica,
  registrarVentanaWeb,
  type VentanaWeb,
  type VentanaWebRegistroPayload,
} from "../service/api";

export type { VentanaWeb };

interface ErrorFields {
  nombre?: string;
  correo?: string;
  telefono?: string;
  [key: string]: string | undefined;
}

interface UseVentanaWebResult {
  ventana: VentanaWeb | null;
  loading: boolean;
  enviando: boolean;
  registrado: boolean;
  errores: ErrorFields;
  registrar: (payload: VentanaWebRegistroPayload) => Promise<boolean>;
}

export function useVentanaWeb(): UseVentanaWebResult {
  const [ventana, setVentana] = useState<VentanaWeb | null>(null);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  const [errores, setErrores] = useState<ErrorFields>({});

  useEffect(() => {
    let cancelled = false;

    getVentanaWebPublica()
      .then((res) => {
        if (!cancelled) setVentana(res.data);
      })
      .catch(() => {
        if (!cancelled) setVentana(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const registrar = async (
    payload: VentanaWebRegistroPayload
  ): Promise<boolean> => {
    setEnviando(true);
    setErrores({});
    try {
      await registrarVentanaWeb(payload);
      setRegistrado(true);
      return true;
    } catch (err) {
      const resp = (
        err as {
          response?: { status?: number; data?: { errors?: Record<string, string[]> } };
        }
      ).response;
      if (resp?.status === 422 && resp.data?.errors) {
        const nuevos: ErrorFields = {};
        Object.entries(resp.data.errors).forEach(([campo, mensaje]) => {
          nuevos[campo] = mensaje[0];
        });
        setErrores(nuevos);
      } else {
        setErrores({ nombre: "Ocurrió un error. Intenta nuevamente." });
      }
      return false;
    } finally {
      setEnviando(false);
    }
  };

  return { ventana, loading, enviando, registrado, errores, registrar };
}

export default useVentanaWeb;
