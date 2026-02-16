import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface ErrorFields {
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
  [key: string]: string | undefined;
}

// ✅ Hook principal tipado y limpio
export const usePqr = () => {
  const nombreRef = useRef<HTMLInputElement | null>(null);
  const empresaRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const telefonoRef = useRef<HTMLInputElement | null>(null);
  const mensajeRef = useRef<HTMLTextAreaElement | null>(null);
  const archivoRef = useRef<HTMLInputElement | null>(null);
  const aceptarTerminosRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<ErrorFields>({});
  const [errorTerminos, setErrorTerminos] = useState(false);
  const [codigoRadicado, setCodigoRadicado] = useState<string | null>(null);

  // ✅ Limpieza correcta sin ESLint ni TypeScript warnings
  const limpiarFormulario = () => {
    if (nombreRef.current) nombreRef.current.value = "";
    if (empresaRef.current) empresaRef.current.value = "";
    if (emailRef.current) emailRef.current.value = "";
    if (telefonoRef.current) telefonoRef.current.value = "";
    if (mensajeRef.current) mensajeRef.current.value = "";
    if (archivoRef.current) archivoRef.current.value = "";
    if (aceptarTerminosRef.current) aceptarTerminosRef.current.checked = false;
  };

  // ✅ Envío de datos
  const enviarDatos = async (e: React.FormEvent<HTMLFormElement>, selectedFile: File | null) => {
    e.preventDefault();
    setError({});
    console.log("ARCHIVO FRONT:", archivoRef.current?.files);
    setCodigoRadicado(null);

    if (!aceptarTerminosRef.current?.checked) {
      setErrorTerminos(true);
      return;
    }
    setErrorTerminos(false);

    const formData = new FormData();
    formData.append("nombre", nombreRef.current?.value || "");
    formData.append("empresa", empresaRef.current?.value || "");
    formData.append("email", emailRef.current?.value || "");
    formData.append("telefono", telefonoRef.current?.value || "");
    formData.append("mensaje", mensajeRef.current?.value || "");

      if (selectedFile) {
      formData.append("archivo", selectedFile);
    }


    try {
      const response = await axios.post(
        "https://api.setas.etstechnolgy.com/api/pqr",
       
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      

      toast.success(" PQR enviada correctamente");
      setCodigoRadicado(response.data.codigo_radicado);
      limpiarFormulario();
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 422) {
        const errores: ErrorFields = {};
        Object.entries(error.response.data.errors).forEach(([campo, mensaje]) => {
          errores[campo] = (mensaje as string[])[0];
        });
        setError(errores);
      } else {
        toast.error("❌ Error en el servidor. Intente más tarde.");
      }
    }
  };

  return {
    nombreRef,
    empresaRef,
    emailRef,
    telefonoRef,
    mensajeRef,
    archivoRef,
    aceptarTerminosRef,
    error,
    errorTerminos,
    enviarDatos,
    codigoRadicado,
  };
};

export default usePqr;
