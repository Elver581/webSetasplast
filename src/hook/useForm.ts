import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// ✅ Tipado para los posibles errores
interface ErrorFields {
  nombre?: string;
  empresa?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
  name?: string;
  company?: string;
  phone?: string;
  [key: string]: string | undefined;
}

// ✅ Tipado de datos de evento
interface EventData {
  name: string;
  company: string;
  phone: string;
  email: string;
}

// ✅ Tipado del hook completo
interface UseFormReturn {
  error: ErrorFields;
  nombreRef: React.RefObject<HTMLInputElement | null>;
  empresaRef: React.RefObject<HTMLInputElement | null>;
  emailRef: React.RefObject<HTMLInputElement | null>;
  telefonoRef: React.RefObject<HTMLInputElement | null>;
  mensajeRef: React.RefObject<HTMLTextAreaElement | null>;
  aceptarTerminosRef: React.RefObject<HTMLInputElement | null>;
  errorTerminos: boolean;
  enviarDatos: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  registrarEvento: (data: EventData) => Promise<void>;
}

export const useForm = (): UseFormReturn => {
  const [error, setError] = useState<ErrorFields>({});
  const nombreRef = useRef<HTMLInputElement | null>(null);
  const empresaRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  const mensajeRef = useRef<HTMLTextAreaElement | null>(null);
  const aceptarTerminosRef = useRef<HTMLInputElement | null>(null);
  const [errorTerminos, setErrorTerminos] = useState<boolean>(false);

  // ✅ Enviar formulario de contacto
  const enviarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("📤 Enviando datos...");

    setError({});

    if (!aceptarTerminosRef.current?.checked) {
      setErrorTerminos(true);
      toast.warning("Debes aceptar los términos y condiciones.");
      return;
    } else {
      setErrorTerminos(false);
    }

    try {
      const payload = {
        nombre: nombreRef.current?.value || "",
        empresa: empresaRef.current?.value || "",
        email: emailRef.current?.value || "",
        telefono: telefonoRef.current?.value || "",
        mensaje: mensajeRef.current?.value || "",
      };

      const response = await axios.post(
        "https://api.setas.etstechnolgy.com/api/contacto",
        payload
      );

      toast.success(response.data.message || "Formulario enviado correctamente ✅");
      // Limpiar formulario
      nombreRef.current!.value = "";
      empresaRef.current!.value = "";
      emailRef.current!.value = "";
      telefonoRef.current!.value = "";
      mensajeRef.current!.value = "";

      setError({});
    } catch (err: any) {
      console.error("Error en el envío:", err);

      if (err.response?.status === 422) {
        const erroresPorCampo: ErrorFields = {};
        Object.entries(err.response.data.errors).forEach(([campo, mensaje]) => {
          erroresPorCampo[campo] = (mensaje as string[])[0];
        });
        setError(erroresPorCampo);
      } else {
        toast.error("⚠️ Error en el servidor. Inténtalo nuevamente.");
      }
    }
  };

  // ✅ Registrar evento (por ejemplo: POST /api/eventos)
const registrarEvento = async (data: EventData): Promise<void> => {
  try {
    const payload = {
      name: data.name,
      company: data.company,
      phone: data.phone,
      email: data.email,
    };

    const response = await axios.post(
      "https://api.setas.etstechnolgy.com/api/eventos",
      payload
    );

    toast.success(response.data.message || "Registro de evento exitoso ");

//Redirigir a una url

    window.location.href = "https://setasplast.com.co";
    setError({});


  } catch (err: any) {
    if (err.response?.status === 422) {
      const erroresPorCampo: ErrorFields = {};
      Object.entries(err.response.data.errors).forEach(([campo, mensaje]) => {
        erroresPorCampo[campo] = (mensaje as string[])[0];
      });
      setError(erroresPorCampo);
    } else {
      toast.error("⚠️ Error en el servidor. Inténtalo nuevamente.");
    }
    console.error("Error al registrar el evento:", err);
  }
};


  return {
    error,
    nombreRef,
    empresaRef,
    emailRef,
    telefonoRef,
    mensajeRef,
    aceptarTerminosRef,
    errorTerminos,
    enviarDatos,
    registrarEvento, // ✅ ahora sí retornado correctamente
  };
};

export default useForm;
